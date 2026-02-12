
import { Link } from 'react-router-dom';

const Blogs = () => {
    const pressReleases = [
        {
            id: 1,
            title: 'Citizen Hospital Launches New Advanced Diagnostic Center',
            date: 'March 15, 2026',
            category: 'Infrastructure',
            content: 'Citizen Hospital is proud to announce the inauguration of its state-of-the-art diagnostic wing, featuring 3 Tesla MRI and 128-slice CT scanner...',
            image: "/assets/images/hero/hospital_exterior.png"
        },
        {
            id: 2,
            title: 'Free Heart Check-up Camp Success',
            date: 'February 20, 2026',
            category: 'CSR',
            content: 'Over 500 residents of Durgapur benefited from the free cardiac screening camp organized by Citizen Hospital Foundation last weekend...',
            image: "/assets/images/hero/hero_main.png"
        },
        {
            id: 3,
            title: 'Citizen Hospital Accredited with NABH Certification',
            date: 'January 10, 2026',
            category: 'Awards',
            content: 'We are honored to receive the prestigious NABH accreditation, a testament to our commitment to quality patient care and safety standards...',
            image: "/assets/images/hero/hospital_exterior.png"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[300px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Press Releases</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Latest news, updates, and announcements from Citizen Hospital
                    </p>
                </div>
            </div>

            {/* Press Releases List */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-8">
                    {pressReleases.map((release) => (
                        <div key={release.id} className="card lg:card-side bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                            <figure className="lg:w-1/3 h-64 lg:h-auto relative">
                                <img src={release.image} alt={release.title} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 badge badge-primary">{release.category}</div>
                            </figure>
                            <div className="card-body lg:w-2/3 p-8">
                                <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                                <h2 className="card-title text-2xl font-bold text-gray-800 mb-4">{release.title}</h2>
                                <p className="text-gray-600 mb-6">{release.content}</p>
                                <div className="card-actions justify-start">
                                    <button className="btn btn-outline btn-primary btn-sm">Read Full Release</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Media Contact */}
            <div className="bg-blue-900 text-white py-16 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
                    <p className="mb-8 max-w-2xl mx-auto text-blue-200">
                        For press inquiries, interviews, or official statements, please contact our media relations team.
                    </p>
                    <a href="mailto:hrcitizenhospital@gmail.com" className="btn btn-warning px-8">Contact Media Team</a>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
