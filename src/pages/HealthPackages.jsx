
const HealthPackages = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Preventive Health Packages</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        Invest in your health today for a better tomorrow.
                    </p>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Basic Wellness Check',
                            price: '₹1,500',
                            desc: 'Essential tests for monitoring general health.',
                            tests: ['CBC', 'Blood Sugar (F/PP)', 'Lipid Profile', 'Urine R/M', 'Doctor Consultation'],
                            color: 'bg-blue-50 border-blue-200'
                        },
                        {
                            title: 'Executive Health Check',
                            price: '₹3,500',
                            desc: 'Comprehensive screening for working professionals.',
                            tests: ['Basic Wellness +', 'Liver & Kidney Function', 'Thyroid Profile', 'ECG', 'Chest X-Ray', 'USG Abdomen'],
                            color: 'bg-indigo-50 border-indigo-200'
                        },
                        {
                            title: 'Comprehensive Cardiac Care',
                            price: '₹5,000',
                            desc: 'Specialized package assessing heart health.',
                            tests: ['Executive Health +', 'Echocardiography', 'TMT', 'Cardiologist Consultation', 'Diet Counseling'],
                            color: 'bg-red-50 border-red-200'
                        },
                        {
                            title: 'Senior Citizen Package',
                            price: '₹4,000',
                            desc: 'Designed for the unique health needs of elderly.',
                            tests: ['Complete Body Profile', 'Bone Density Test', 'Vision & Hearing Test', 'Geriatric Consultation'],
                            color: 'bg-yellow-50 border-yellow-200'
                        },
                        {
                            title: 'Women\'s Wellness',
                            price: '₹2,800',
                            desc: 'Tailored specifically for women\'s health.',
                            tests: ['Executive Health - Men Only Tests', 'Pap Smear', 'Mammography (Optional)', 'Gynecologist Consult'],
                            color: 'bg-pink-50 border-pink-200'
                        },
                        {
                            title: 'Diabetic Care Package',
                            price: '₹2,200',
                            desc: 'Monitoring and management for diabetic patients.',
                            tests: ['HbA1c', 'Fasting & PP Blood Sugar', 'Kidney Function Test', 'Eye Checkup', 'Podiatry Review'],
                            color: 'bg-green-50 border-green-200'
                        }
                    ].map((pkg, idx) => (
                        <div key={idx} className={`card shadow-lg hover:shadow-2xl transition-all duration-300 border ${pkg.color} flex flex-col`}>
                            <div className="card-body">
                                <h2 className="card-title text-2xl text-gray-800 mb-2">{pkg.title}</h2>
                                <div className="text-3xl font-bold text-primary mb-4">{pkg.price}</div>
                                <p className="text-gray-600 mb-4 text-sm">{pkg.desc}</p>
                                <ul className="list-disc list-inside space-y-2 mb-6 text-sm text-gray-700">
                                    {pkg.tests.map((test, i) => (
                                        <li key={i}>{test}</li>
                                    ))}
                                </ul>
                                <div className="card-actions justify-end mt-auto">
                                    <button className="btn btn-primary w-full">Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Package CTA */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need a Customized Plan?</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Speak with our health experts to create a package that suits your specific needs and medical history.
                    </p>
                    <button className="btn btn-outline btn-info text-white border-white hover:bg-white hover:text-gray-900">Contact Us</button>
                </div>
            </div>
        </div>
    );
};

export default HealthPackages;
