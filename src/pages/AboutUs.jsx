import { FaHandHoldingHeart, FaBullseye, FaHandshake, FaLightbulb, FaEye, FaUserMd, FaUserNurse } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center"
                style={{ backgroundImage: "url('/assets/images/hero/hospital_exterior.png')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">About Citizen Hospital</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Compassion. Respect. Excellence.
                    </p>
                </div>
            </div>

            {/* Who We Are Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            CITIZEN HOSPITAL, located at the prime place of Durgapur Steel City (Bidhannagar, West Bengal) connected to NH-2(1KM). It is easily approachable from all the neighbouring Districts by rail and road.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Citizen Hospital begins its journey on 2020 with 188 bedded with an objective to provide the best medical treatment to all classes of people in the local and adjoining Districts and States in an atmosphere where ailing patient can feel homely with the help of the efficient and qualified Medical Professionals and qualified trained Nurses, Paramedical Staff and Technicians supported by the competent Managerial skills. We are destination of choice for all communities we serve.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We also provide ongoing training and support to our staff to ensure that they are up-to-date with the latest developments in healthcare and are equipped to provide the best possible care to the patients.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <img
                                src="/assets/images/hero/patient_room_interior.png"
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50"></div>
                            <div className="relative z-10 grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">2020</div>
                                    <div className="text-blue-100">Established</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">188+</div>
                                    <div className="text-blue-100">Beds</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">24/7</div>
                                    <div className="text-blue-100">Emergency</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">Multi</div>
                                    <div className="text-blue-100">Specialty</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section (Merged for better flow) */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-8 rounded-2xl border-l-4 border-blue-500">
                            <div className="flex items-center mb-4">
                                <FaBullseye className="text-4xl text-blue-600 mr-4" />
                                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                            </div>
                            <p className="text-gray-700 text-lg">
                                Our mission is to create a compassionate environment for each person entrusted to our care and to inspire hope and healing by helping those individuals achieve their highest level of well beings.
                            </p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-2xl border-l-4 border-green-500">
                            <div className="flex items-center mb-4">
                                <FaEye className="text-4xl text-green-600 mr-4" />
                                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
                            </div>
                            <p className="text-gray-700 text-lg">
                                Our vision is to become the preferred healthcare provider to each individual we serve. We commit to improving the lives of all people entrusted to our care through clinical excellence and extra ordinary offered in an atmosphere of compassion hospitality and respect for the dignity for the each person.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leadership Messages */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Leadership Messages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Managing Director */}
                    <div className="card bg-base-100 shadow-xl border border-gray-100">
                        <div className="card-body">
                            <h3 className="card-title text-2xl text-blue-800 mb-2">Message from Managing Director Desk</h3>
                            <div className="divider my-0"></div>
                            <p className="text-gray-600 italic leading-relaxed">
                                "Citizen Hospital, the Divinity in Healthcare has been planned as per Global norms with an aim of providing highest quality of clinical Services, Paraclinical, diagnostics & support services. We strive to provide the best of clinical outcomes in the most friendly and safe environment through highly efficient and credentialed Medical, Paramedical and nursing staff supported by high end and modern equipment in multi super-specialty scenario. We wish you a healthy life, however if you need any healthcare support, we will provide you the best!"
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <div className="badge badge-outline p-3">Managing Director</div>
                            </div>
                        </div>
                    </div>

                    {/* Director */}
                    <div className="card bg-base-100 shadow-xl border border-gray-100">
                        <div className="card-body">
                            <h3 className="card-title text-2xl text-blue-800 mb-2">Message from Director Desk</h3>
                            <div className="divider my-0"></div>
                            <p className="text-gray-600 italic leading-relaxed">
                                "Citizen Hospital is 188 bed tertiary care hospital with state-of-the-art facilities that strive to serve with compassion. With an experienced, well qualified Doctors and a passionate workforce of Citizen hospital is committed to provide ethical quality compassionate care using high end technology and medical advance in vogue. Looking forward to serving you in tune with the vision of Compassion and Respect for the dignity for each person."
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <div className="badge badge-outline p-3">Director</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
