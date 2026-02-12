-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN', 'STAFF', 'RECEPTIONIST');
CREATE TYPE appointment_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');
CREATE TYPE appointment_type AS ENUM ('IN_PERSON', 'VIDEO', 'PHONE');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');
CREATE TYPE audit_action AS ENUM (
    'CREATE', 'READ', 'UPDATE', 'DELETE',
    'LOGIN', 'LOGOUT', 'PASSWORD_CHANGE',
    'VIEW_REPORT', 'DOWNLOAD_REPORT', 'UPLOAD_REPORT'
);

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Specialties (Medical departments)
CREATE TABLE specialties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_specialties_active ON specialties(is_active, display_order) WHERE is_active = TRUE;

-- Departments (Hospital organizational units)
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    floor_number INTEGER,
    head_doctor_id UUID,  
    is_operational BOOLEAN DEFAULT TRUE,
    contact_phone VARCHAR(15),
    contact_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_operational ON departments(is_operational) WHERE is_operational = TRUE;

-- Users (Unified table for all user types)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uhid VARCHAR(20) UNIQUE NOT NULL,  -- Format: MLD-YYYYMMDD-NNNN
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email_encrypted BYTEA,  -- AES-256-GCM encrypted
    password_hash VARCHAR(255) NOT NULL,  -- Argon2id
    role user_role NOT NULL,
    
    -- MFA fields
    mfa_secret VARCHAR(255),  -- TOTP secret (encrypted)
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_backup_codes TEXT[],  -- Array of encrypted backup codes
    
    -- Security fields
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_password_change_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Compliance fields
    terms_accepted_at TIMESTAMP WITH TIME ZONE,
    privacy_policy_accepted_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,  -- Soft delete
    
    CONSTRAINT chk_phone_format CHECK (phone_number ~ '^\+?[1-9]\d{1,14}$'),
    CONSTRAINT chk_uhid_format CHECK (uhid ~ '^MLD-\d{8}-\d{4}$')
);

CREATE UNIQUE INDEX idx_users_phone ON users(phone_number) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX idx_users_uhid ON users(uhid) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL AND is_active = TRUE;
CREATE INDEX idx_users_last_login ON users(last_login_at DESC NULLS LAST) WHERE deleted_at IS NULL;

-- Doctors
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    license_number_encrypted BYTEA NOT NULL,  -- AES-256-GCM encrypted
    specialty_id UUID NOT NULL REFERENCES specialties(id),
    department_id UUID REFERENCES departments(id),
    
    -- Profile information
    experience_years INTEGER CHECK (experience_years >= 0),
    bio_text TEXT,  -- Plain text only (sanitized)
    education TEXT,  -- JSON array of qualifications
    languages_spoken VARCHAR(255)[],  -- Array of languages
    consultation_fee DECIMAL(10,2) CHECK (consultation_fee >= 0),
    
    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    max_patients_per_day INTEGER DEFAULT 30,
    
    -- Media
    profile_img_url VARCHAR(512),  -- S3 pre-signed URL
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP WITH TIME ZONE,
    verification_doc_url VARCHAR(512),  -- S3 key for verification documents
    verified_by_id UUID REFERENCES users(id),
    
    -- Rating
    average_rating DECIMAL(3,2) CHECK (average_rating BETWEEN 0 AND 5),
    total_ratings INTEGER DEFAULT 0,
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT uq_doctor_user UNIQUE (user_id)
);

CREATE INDEX idx_doctors_specialty ON doctors(specialty_id) WHERE is_verified = TRUE;
CREATE INDEX idx_doctors_department ON doctors(department_id) WHERE is_verified = TRUE;
CREATE INDEX idx_doctors_available ON doctors(is_available) WHERE is_verified = TRUE AND is_available = TRUE;
CREATE INDEX idx_doctors_rating ON doctors(average_rating DESC NULLS LAST) WHERE is_verified = TRUE;

-- Add foreign key for department head
ALTER TABLE departments ADD CONSTRAINT fk_departments_head_doctor 
    FOREIGN KEY (head_doctor_id) REFERENCES doctors(id);

-- Doctor Schedules
CREATE TABLE doctor_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0=Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration_minutes INTEGER DEFAULT 15 CHECK (slot_duration_minutes > 0),
    max_patients_per_slot INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_schedule_times CHECK (end_time > start_time),
    CONSTRAINT uq_doctor_schedule UNIQUE (doctor_id, day_of_week, start_time, end_time)
);

CREATE INDEX idx_schedules_doctor ON doctor_schedules(doctor_id, day_of_week) WHERE is_active = TRUE;

-- Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES users(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    
    -- Appointment details
    status appointment_status NOT NULL DEFAULT 'PENDING',
    type appointment_type NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 15,
    
    -- Payment
    payment_status payment_status DEFAULT 'PENDING',
    payment_amount DECIMAL(10,2),
    payment_transaction_id VARCHAR(255),
    
    -- Cancellation
    cancellation_reason TEXT,
    cancelled_by_id UUID REFERENCES users(id),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    -- Confirmation
    confirmation_token VARCHAR(64) UNIQUE,  -- One-time use token
    confirmed_at TIMESTAMP WITH TIME ZONE,
    
    -- Security tracking
    patient_ip_address INET,
    user_agent TEXT,
    
    -- Notes
    patient_notes TEXT,  -- Reason for visit
    doctor_notes TEXT,  -- Post-consultation notes
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_scheduled_future CHECK (scheduled_at > created_at)
);

CREATE INDEX idx_appt_patient ON appointments(patient_id, scheduled_at DESC);
CREATE INDEX idx_appt_doctor ON appointments(doctor_id, scheduled_at) WHERE status IN ('PENDING', 'CONFIRMED');
CREATE INDEX idx_appt_scheduled ON appointments(scheduled_at) WHERE status IN ('PENDING', 'CONFIRMED');
CREATE INDEX idx_appt_status ON appointments(status, scheduled_at DESC);
CREATE INDEX idx_appt_confirmation ON appointments(confirmation_token) WHERE confirmation_token IS NOT NULL;

-- Test Types (Lab tests, radiology, etc.)
CREATE TABLE test_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,  -- 'LAB', 'RADIOLOGY', 'PATHOLOGY'
    description TEXT,
    typical_turnaround_hours INTEGER,
    price DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_types_category ON test_types(category) WHERE is_active = TRUE;

-- Medical Reports
CREATE TABLE medical_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES users(id),
    doctor_id UUID REFERENCES doctors(id),
    appointment_id UUID REFERENCES appointments(id),
    
    -- File storage (S3)
    s3_bucket VARCHAR(255) NOT NULL,
    s3_object_key VARCHAR(512) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,  -- SHA-256 checksum
    file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes > 0),
    mime_type VARCHAR(100) NOT NULL,
    original_filename VARCHAR(255),
    
    -- Classification
    test_type_id UUID REFERENCES test_types(id),
    report_date DATE NOT NULL,
    
    -- Encryption
    is_encrypted BOOLEAN DEFAULT TRUE,
    encryption_key_id VARCHAR(255),  -- AWS KMS key ID
    
    -- Access control
    expiry_date TIMESTAMP WITH TIME ZONE,
    access_count INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit fields
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    uploaded_by_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_mime_type CHECK (mime_type IN ('application/pdf', 'image/jpeg', 'image/png', 'application/dicom'))
);

CREATE INDEX idx_reports_patient ON medical_reports(patient_id, report_date DESC);
CREATE INDEX idx_reports_doctor ON medical_reports(doctor_id, report_date DESC);
CREATE INDEX idx_reports_expiry ON medical_reports(expiry_date) WHERE expiry_date IS NOT NULL;
CREATE INDEX idx_reports_hash ON medical_reports(file_hash);  -- For integrity verification

-- ============================================================================
-- SECURITY TABLES
-- ============================================================================

-- User Sessions (JWT token tracking)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE,
    
    -- Device information
    device_fingerprint VARCHAR(255),
    ip_address INET NOT NULL,
    user_agent TEXT,
    
    -- Validity
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_revoked BOOLEAN DEFAULT FALSE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoked_reason VARCHAR(255)
);

CREATE INDEX idx_sessions_token ON user_sessions(session_token) WHERE is_revoked = FALSE;
CREATE INDEX idx_sessions_user ON user_sessions(user_id, created_at DESC) WHERE is_revoked = FALSE;
CREATE INDEX idx_sessions_expiry ON user_sessions(expires_at) WHERE is_revoked = FALSE;

-- OTP (One-Time Passwords) for email/phone verification and password reset
CREATE TABLE otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    otp_code VARCHAR(10) NOT NULL,  -- Encrypted
    purpose VARCHAR(50) NOT NULL,  -- 'EMAIL_VERIFICATION', 'PHONE_VERIFICATION', 'PASSWORD_RESET'
    delivery_method VARCHAR(20) NOT NULL,  -- 'SMS', 'EMAIL'
    
    -- Contact info (for verification before user exists)
    phone_number VARCHAR(15),
    email VARCHAR(255),
    
    -- Validity
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    attempts INTEGER DEFAULT 0,
    
    CONSTRAINT chk_otp_contact CHECK (
        (user_id IS NOT NULL) OR 
        (phone_number IS NOT NULL OR email IS NOT NULL)
    )
);

CREATE INDEX idx_otps_user ON otps(user_id, created_at DESC) WHERE is_used = FALSE;
CREATE INDEX idx_otps_expiry ON otps(expires_at) WHERE is_used = FALSE;

-- Rate Limiting
CREATE TABLE rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier VARCHAR(255) NOT NULL,  -- IP address or user_id
    endpoint VARCHAR(255) NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    window_end TIMESTAMP WITH TIME ZONE NOT NULL,
    is_blocked BOOLEAN DEFAULT FALSE,
    blocked_until TIMESTAMP WITH TIME ZONE
);

CREATE UNIQUE INDEX idx_ratelimit_identifier ON rate_limits(identifier, endpoint, window_start);
-- CLEANUP JOB should handle this, not a partial index
-- CREATE INDEX idx_ratelimit_cleanup ON rate_limits(window_end) WHERE window_end < CURRENT_TIMESTAMP;

-- Audit Logs (Immutable)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id),  -- Who performed the action
    action audit_action NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    
    -- State tracking (JSONB for flexible structure)
    before_state JSONB,
    after_state JSONB,
    
    -- Context
    ip_address INET NOT NULL,
    user_agent TEXT,
    session_id UUID REFERENCES user_sessions(id),
    
    -- Compliance
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    retention_until TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 years')
);

CREATE INDEX idx_audit_actor ON audit_logs(actor_id, timestamp DESC);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id, timestamp DESC);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);
-- CLEANUP JOB should handle this
-- CREATE INDEX idx_audit_retention ON audit_logs(retention_until) WHERE retention_until < CURRENT_TIMESTAMP;
CREATE INDEX idx_audit_action ON audit_logs(action, timestamp DESC);

-- Make audit_logs append-only (prevent updates/deletes)
CREATE OR REPLACE FUNCTION prevent_audit_modification()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit logs are immutable and cannot be modified or deleted';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_audit_update
    BEFORE UPDATE ON audit_logs
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_modification();

CREATE TRIGGER prevent_audit_delete
    BEFORE DELETE ON audit_logs
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_modification();

-- ============================================================================
-- ADDITIONAL TABLES
-- ============================================================================

-- Patient Reviews
CREATE TABLE patient_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES users(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    appointment_id UUID REFERENCES appointments(id),
    
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    
    is_verified BOOLEAN DEFAULT FALSE,  -- Only verified if appointment happened
    is_published BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT uq_review_appointment UNIQUE (appointment_id)
);

CREATE INDEX idx_reviews_doctor ON patient_reviews(doctor_id, created_at DESC) WHERE is_published = TRUE;
CREATE INDEX idx_reviews_patient ON patient_reviews(patient_id, created_at DESC);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    type VARCHAR(50) NOT NULL,  -- 'APPOINTMENT_REMINDER', 'REPORT_READY', 'PAYMENT_DUE'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Delivery
    delivery_method VARCHAR(20) NOT NULL,  -- 'EMAIL', 'SMS', 'PUSH', 'IN_APP'
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE,
    
    -- Read status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Link to action
    action_url VARCHAR(512),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_pending ON notifications(is_sent, created_at) WHERE is_sent = FALSE;

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_specialties_updated_at BEFORE UPDATE ON specialties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON doctor_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate UHID
CREATE OR REPLACE FUNCTION generate_uhid()
RETURNS VARCHAR(20) AS $$
DECLARE
    date_part VARCHAR(8);
    sequence_part VARCHAR(4);
    new_uhid VARCHAR(20);
    max_seq INTEGER;
BEGIN
    date_part := TO_CHAR(CURRENT_DATE, 'YYYYMMDD');
    
    -- Get max sequence for today
    SELECT COALESCE(MAX(CAST(SUBSTRING(uhid FROM 14 FOR 4) AS INTEGER)), 0)
    INTO max_seq
    FROM users
    WHERE uhid LIKE 'MLD-' || date_part || '-%';
    
    sequence_part := LPAD((max_seq + 1)::TEXT, 4, '0');
    new_uhid := 'MLD-' || date_part || '-' || sequence_part;
    
    RETURN new_uhid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DATA (Essential records)
-- ============================================================================

-- Specialties
INSERT INTO specialties (name, slug, description, display_order) VALUES
    ('General Medicine', 'general-medicine', 'Primary care and general health concerns', 1),
    ('Cardiology', 'cardiology', 'Heart and cardiovascular system', 2),
    ('Orthopedics', 'orthopedics', 'Bones, joints, and musculoskeletal system', 3),
    ('Pediatrics', 'pediatrics', 'Healthcare for infants, children, and adolescents', 4),
    ('Gynecology', 'gynecology', 'Women''s reproductive health', 5),
    ('Dermatology', 'dermatology', 'Skin, hair, and nail conditions', 6),
    ('Neurology', 'neurology', 'Brain and nervous system disorders', 7),
    ('Ophthalmology', 'ophthalmology', 'Eye and vision care', 8),
    ('ENT', 'ent', 'Ear, nose, and throat specialists', 9),
    ('Psychiatry', 'psychiatry', 'Mental health and behavioral disorders', 10);

-- Test Types
INSERT INTO test_types (name, category, description, typical_turnaround_hours, price) VALUES
    ('Complete Blood Count (CBC)', 'LAB', 'Comprehensive blood analysis', 24, 500.00),
    ('Lipid Profile', 'LAB', 'Cholesterol and triglycerides test', 24, 800.00),
    ('X-Ray Chest', 'RADIOLOGY', 'Chest radiography', 2, 600.00),
    ('ECG', 'RADIOLOGY', 'Electrocardiogram', 1, 400.00),
    ('Ultrasound Abdomen', 'RADIOLOGY', 'Abdominal sonography', 24, 1200.00);

-- Admin user (password: Admin@12345 - MUST BE CHANGED IN PRODUCTION)
INSERT INTO users (
    uhid, full_name, phone_number, password_hash, role, 
    email_verified_at, is_active
) VALUES (
    'MLD-20260212-0001',
    'System Administrator',
    '+919876543210',
    '$argon2id$v=19$m=65536,t=3,p=1$somesalt$hash',  -- PLACEHOLDER
    'ADMIN',
    CURRENT_TIMESTAMP,
    TRUE
);
