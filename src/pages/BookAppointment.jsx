
import { useState } from 'react';

const BookAppointment = () => {
    // Stage 1: Doctor Select, 2: Slot Select, 3: Confirm
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    // Mock Doctor Data (In real app, fetch from API based on ID in URL)
    const doctor = {
        name: "Dr. Rajesh Sharma",
        specialty: "Cardiology",
        fee: "₹800",
        image: "/assets/images/doctors/avatars/dr_senior_male.png"
    };

    const slots = ["10:00 AM", "10:30 AM", "11:00 AM", "04:00 PM", "04:30 PM"];

    const handleConfirm = (e) => {
        e.preventDefault();
        // Here you would call the API to create the appointment
        alert("Appointment Request Sent! Check your email for confirmation.");
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-3xl">

                {/* Stepper */}
                <ul className="steps w-full mb-10">
                    <li className={`step step-primary`}>Select Doctor</li>
                    <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Choose Date & Time</li>
                    <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Confirm Details</li>
                </ul>

                <div className="card bg-white shadow-xl border border-gray-100">
                    <div className="card-body p-8">

                        {/* Header: Selected Doctor */}
                        <div className="flex items-center gap-4 mb-8 border-b pb-6">
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={doctor.image} alt={doctor.name} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                                <p className="text-gray-500">{doctor.specialty}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-sm text-gray-400">Consultation Fee</p>
                                <p className="text-lg font-bold text-gray-800">{doctor.fee}</p>
                            </div>
                        </div>

                        {/* Step 1: Date & Time Selection */}
                        <form onSubmit={handleConfirm}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-medium">Select Date</span></label>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                        onChange={(e) => { setSelectedDate(e.target.value); setStep(2); }}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-medium">Appointment Type</span></label>
                                    <select className="select select-bordered w-full">
                                        <option>In-Person Visit</option>
                                        <option>Video Consultation</option>
                                    </select>
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="mb-8 animate-fade-in">
                                    <label className="label"><span className="label-text font-medium">Available Slots for {selectedDate}</span></label>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                        {slots.map((slot) => (
                                            <div
                                                key={slot}
                                                onClick={() => { setSelectedSlot(slot); setStep(3); }}
                                                className={`btn btn-sm ${selectedSlot === slot ? 'btn-primary' : 'btn-outline border-gray-300 text-gray-600'} hover:btn-primary`}
                                            >
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Patient Details */}
                            {selectedSlot && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="divider">Patient Details</div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Reason for Visit</span></label>
                                        <textarea className="textarea textarea-bordered h-24" placeholder="Briefly describe your symptoms..."></textarea>
                                    </div>

                                    <div className="alert alert-info shadow-sm mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <div>
                                            <h3 className="font-bold">Note</h3>
                                            <div className="text-xs">You will pay the consultation fee at the clinic. Please arrive 15 mins early.</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="card-actions justify-end mt-8">
                                <button type="button" className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn btn-primary px-8" disabled={!selectedSlot}>
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookAppointment
