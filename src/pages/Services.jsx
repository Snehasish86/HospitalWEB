import { FaHospitalUser, FaHeartbeat, FaBone, FaBaby, FaBrain, FaMicroscope, FaTrophy, FaBolt, FaHandHoldingUsd, FaUserShield } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            id: 1,
            icon: <FaHospitalUser />,
            title: 'General Consultation',
            description: 'Expert medical advice from qualified doctors for all your health concerns.',
            features: ['24/7 Availability', 'Video Consultation', 'Quick Diagnosis', 'E-Prescription']
        },
        {
            id: 2,
            icon: <FaHeartbeat />,
            title: 'Cardiology',
            description: 'Comprehensive heart care services including diagnosis and treatment.',
            features: ['ECG Services', 'Heart Monitoring', 'Cardiac Surgery', 'Preventive Care']
        },
        {
            id: 3,
            icon: <FaBone />,
            title: 'Orthopedics',
            description: 'Treatment for bone, joint, and muscle conditions by expert orthopedists.',
            features: ['Joint Replacement', 'Sports Medicine', 'Arthritis Care', 'Physiotherapy']
        },
        {
            id: 4,
            icon: <FaBaby />,
            title: 'Pediatrics',
            description: 'Caring for children\'s health from infancy through adolescence.',
            features: ['Child Vaccination', 'Growth Monitoring', 'Nutrition Counseling', 'Emergency Care']
        },
        {
            id: 5,
            icon: <FaBrain />,
            title: 'Neurology',
            description: 'Advanced diagnosis and treatment for brain and nervous system disorders.',
            features: ['Brain Imaging', 'Stroke Treatment', 'Migraine Care', 'Epilepsy Management']
        },
        {
            id: 6,
            icon: <FaMicroscope />,
            title: 'Pathology & Lab',
            description: 'State-of-the-art diagnostic tests and accurate laboratory services.',
            features: ['Blood Tests', 'X-Ray & Scans', 'Biopsy Services', 'Home Collection']
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Our Medical Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive healthcare services delivered with excellence and compassion
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                        >
                            <div className="card-body">
                                <div className="text-6xl mb-4 text-blue-600">{service.icon}</div>
                                <h2 className="card-title text-2xl text-gray-800 mb-3">{service.title}</h2>
                                <p className="text-gray-600 mb-4">{service.description}</p>

                                <div className="divider my-2"></div>

                                <ul className="space-y-2">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="card-actions justify-end mt-6">
                                    <button className="btn btn-primary btn-sm">Learn More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Citizen Hospital?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4 text-yellow-500 flex justify-center"><FaTrophy /></div>
                            <h3 className="font-bold text-xl mb-2">Expert Doctors</h3>
                            <p className="text-gray-600">Highly qualified and experienced medical professionals</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4 text-blue-500 flex justify-center"><FaBolt /></div>
                            <h3 className="font-bold text-xl mb-2">Quick Service</h3>
                            <p className="text-gray-600">Fast appointments and minimal waiting time</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4 text-green-500 flex justify-center"><FaHandHoldingUsd /></div>
                            <h3 className="font-bold text-xl mb-2">Affordable Care</h3>
                            <p className="text-gray-600">Quality healthcare at reasonable prices</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4 text-purple-500 flex justify-center"><FaUserShield /></div>
                            <h3 className="font-bold text-xl mb-2">Secure & Private</h3>
                            <p className="text-gray-600">Your health data is encrypted and protected</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-blue-100 mb-8">Book an appointment with our expert doctors today</p>
                    <button className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-none shadow-xl">
                        Book Appointment Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;
