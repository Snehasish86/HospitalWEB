
const Academic = () => {
    const courses = [
        {
            id: 1,
            title: 'Diploma in Medical Laboratory Technology (DMLT)',
            duration: '2 Years',
            eligibility: '10+2 with Science',
            description: 'Learn to perform laboratory tests, analyze body fluids, and assist in disease diagnosis.'
        },
        {
            id: 2,
            title: 'Diploma in Operation Theatre Technology (DOTT)',
            duration: '2 Years',
            eligibility: '10+2 with Science',
            description: 'Train to manage operation theatres, handle surgical equipment, and assist surgeons.'
        },
        {
            id: 3,
            title: 'General Nursing & Midwifery (GNM)',
            duration: '3 Years',
            eligibility: '10+2 (Any Stream)',
            description: 'Comprehensive nursing program preparing students for patient care in hospitals and clinics.'
        },
        {
            id: 4,
            title: 'Hospital Management & Administration',
            duration: '1 Year',
            eligibility: 'Any Graduate',
            description: 'Develop skills in healthcare administration, hospital operations, and patient management.'
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Academic & Training</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">
                        Empowering the next generation of healthcare professionals through quality education
                    </p>
                </div>
            </div>

            {/* Courses Overview */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Programs</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Citizen Hospital Institute offers a range of diploma and certificate courses
                        designed to provide practical skills and theoretical knowledge for a successful career in healthcare.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                            <div className="card-body">
                                <h3 className="card-title text-2xl text-gray-800 mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4">{course.description}</p>

                                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>{course.eligibility}</span>
                                    </div>
                                </div>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm btn-outline">Apply Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Admission Process */}
                <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admission Process</h2>
                    <div className="steps steps-vertical lg:steps-horizontal w-full">
                        <li className="step step-primary">Fill Application Form</li>
                        <li className="step step-primary">Entrance Test / Interview</li>
                        <li className="step">Document Verification</li>
                        <li className="step">Fee Payment</li>
                        <li className="step">Admission Confirmation</li>
                    </div>
                    <div className="text-center mt-8">
                        <button className="btn btn-wide btn-primary">Download Prospectus</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Academic;
