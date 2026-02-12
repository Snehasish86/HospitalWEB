import { Link } from 'react-router-dom';

import { FaHeartbeat, FaBrain, FaBone, FaDiagnoses, FaBaby, FaFemale, FaTint, FaStar } from 'react-icons/fa';


const Departments = () => {
    const specialities = [
        "Obstetrics & Gynaecology",
        "Orthopaedics",
        "Pulmonology",
        "General & Laparoscopic Surgery",
        "ENT (Ear, Nose, Throat)",
        "Internal Medicine",
        "Critical Care Medicine",
        "Pediatrics",
        "Dermatology",
        "Dentistry",
        "Psychiatry",
        "Ophthalmology"
    ];

    const superSpecialities = [
        "Pediatric Surgery",
        "Neurology",
        "Cardiology",
        "Neurosurgery",
        "Surgical Oncology",
        "Urology",
        "Nephrology",
        "Gastroenterology",
        "Medical Oncology",
        "Cardiothoracic & Vascular Surgery",
        "Plastic & Reconstructive Surgery"
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[300px] flex items-center"
                style={{ backgroundImage: "url('/assets/images/hero/hospital_exterior.png')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Clinical Departments</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive care across a wide range of medical specialties
                    </p>
                </div>
            </div>

            {/* Super Specialties */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 px-4 border-l-4 border-blue-600">Super Specialties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {superSpecialities.map((dept, index) => (
                        <div key={index} className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-700">{dept}</h3>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-sm btn-ghost text-blue-600">Learn More &rarr;</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specialties */}
            <div className="container mx-auto px-4 py-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 px-4 border-l-4 border-green-600">General Specialties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specialities.map((dept, index) => (
                        <div key={index} className="card bg-white shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-green-500">
                            <div className="card-body p-6">
                                <h3 className="font-bold text-lg text-gray-700">{dept}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency CTA */}
            <div className="bg-red-50 py-12 border-t border-red-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">Need Emergency Care?</h2>
                    <p className="text-red-600 mb-6">Our Emergency Department is open 24/7 with trauma care experts ready to assist.</p>
                    <div className="flexjustify-center gap-4">
                        <a href="tel:7477783934" className="btn btn-error text-white btn-lg gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Ambulance: +91 74777 83934
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Departments;
