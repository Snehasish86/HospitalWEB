
const Home = () => {
    // Specialty Data with Image Paths
    const specialties = [
        { name: "Cardiology", icon: "/assets/images/doctors/specialties/cardio_icon.png", desc: "Heart & Vascular Care" },
        { name: "Neurology", icon: "/assets/images/doctors/specialties/neuro_icon.png", desc: "Brain & Spine" },
        { name: "Orthopedics", icon: "/assets/images/doctors/specialties/ortho_icon.png", desc: "Bone & Joint" },
        { name: "Pediatrics", icon: "/assets/images/doctors/specialties/pedia_icon.png", desc: "Child Care" },
        { name: "Ophthalmology", icon: "/assets/images/doctors/specialties/eye_icon.png", desc: "Eye Care" },
        { name: "Dentistry", icon: "/assets/images/doctors/specialties/dental_icon.png", desc: "Dental Health" },
        { name: "General Med", icon: "/assets/images/doctors/specialties/gen_med_icon.png", desc: "Primary Care" },
    ];

    return (
        <div className="bg-base-100">
            {/* HERO SECTION */}
            <div className="hero min-h-screen relative overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src="/assets/images/hero/hero_main.png" alt="Hospital Team" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
                </div>

                <div className="hero-content flex-col lg:flex-row-reverse z-10 w-full justify-between px-6 lg:px-20 text-white">
                    <div className="hidden lg:block w-1/3">
                        {/* Empty right side for spacing */}
                    </div>
                    <div className="text-left lg:w-2/3">
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                            Best Super Speciality Hospital in East India
                        </h1>
                        <p className="py-6 text-xl text-gray-100 max-w-2xl drop-shadow-md">
                            Citizen Hospital begins its journey on 2020 with 188 bedded with an objective to provide the best medical treatment to all classes of people in the local and adjoining Districts and States.
                        </p>
                        <div className="flex gap-4">
                            <button className="btn btn-primary btn-lg shadow-lg border-none hover:scale-105 transition-transform">
                                Book Appointment
                            </button>
                            <button className="btn btn-outline btn-lg text-white hover:bg-white hover:text-blue-900 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH & FILTER BAR - Floating Card */}
            <div className="container mx-auto px-4 -mt-16 z-20 relative">
                <div className="card w-full bg-base-100 shadow-2xl p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center border border-gray-100">
                    <input type="text" placeholder="Search for doctors, specialties..." className="input input-bordered w-full md:w-1/2" />
                    <select className="select select-bordered w-full md:w-1/4">
                        <option disabled selected>Select Specialty</option>
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Pediatrics</option>
                        <option>Dermatology</option>
                    </select>
                    <button className="btn btn-secondary w-full md:w-1/4 font-bold text-white">
                        Find Care
                    </button>
                </div>
            </div>

            {/* SPECIALTIES GRID */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Specialties</h2>
                    <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                        Top-tier medical professionals available across a wide range of departments including Super Speciality services.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                        {specialties.map((spec, idx) => (
                            <div key={idx} className="card bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer border border-transparent hover:border-primary/20">
                                <figure className="px-6 pt-6">
                                    <img src={spec.icon} alt={spec.name} className="w-16 h-16 object-contain" />
                                </figure>
                                <div className="card-body items-center text-center p-4">
                                    <h3 className="card-title text-sm lg:text-base font-bold text-gray-700">{spec.name}</h3>
                                    <p className="text-xs text-gray-400">{spec.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMERGENCY BANNER */}
            <section className="bg-red-50 py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-red-500 transform skew-x-12"></div>
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="md:w-1/2">
                        <img src="/assets/images/hero/ambulance_emergency.png" alt="Emergency" className="rounded-3xl shadow-2xl border-4 border-white/50" />
                    </div>
                    <div className="md:w-1/2 text-left">
                        <div className="badge badge-error gap-2 text-white font-bold p-3 mb-4">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                            24/7 EMERGENCY
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Create Immediate Impact.</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Our advanced trauma center works round the clock. With GPS-enabled ambulance tracking, help reaches you faster.
                        </p>
                        <a href="tel:7477783934" className="btn btn-error btn-lg text-white shadow-lg shadow-red-200">
                            Call +91 74777 83934
                        </a>
                    </div>
                </div>
            </section>

            {/* TELE-CONSULTATION TEASER */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                        <img src="/assets/images/hero/teleconsultation_teaser.png" alt="Tele-Consultation" className="relative rounded-3xl shadow-2xl z-10" />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Consult from Home.</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Skip the waiting room. Access specialist doctors via secure, high-quality video calls from the comfort of your home.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="badge badge-primary badge-xs"></div>
                                <span className="font-medium text-gray-700">Encrypted & Private</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="badge badge-primary badge-xs"></div>
                                <span className="font-medium text-gray-700">Instant Digital Prescriptions</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="badge badge-primary badge-xs"></div>
                                <span className="font-medium text-gray-700">Follow-up Reminders</span>
                            </li>
                        </ul>
                        <button className="btn btn-primary text-white">Start Video Consult</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home

