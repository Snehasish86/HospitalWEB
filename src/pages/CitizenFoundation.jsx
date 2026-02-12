
import { FaHospital, FaAppleAlt, FaFemale } from 'react-icons/fa';

const CitizenFoundation = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Citizen Hospital Foundation</h1>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        Serving the community with heart, hope, and healing.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Corporate Social Responsibility (CSR)</h2>
                        <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                            Corporate social responsibility is a concept where a company does not consider their profits and growth only, but also the interest of society and environment by taking responsibility for the impact of their activities.
                        </p>
                        <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                            Corporate social responsibility (CSR) is an area of focus for The Citizen Hospital. We are committed to giving back to the community and making a positive difference in the lives of those around us.
                        </p>
                    </div>
                    <div>
                        <img
                            src="/assets/images/hero/hero_main.png"
                            alt="CSR Activities"
                            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Initiatives Grid */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Initiatives</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-gray-50 hover:shadow-xl transition-shadow border border-gray-100">
                            <figure className="px-6 pt-6">
                                <div className="text-6xl text-green-600">🌱</div>
                            </figure>
                            <div className="card-body text-center">
                                <h3 className="card-title justify-center text-xl mb-2">Environmental Sustainability</h3>
                                <p className="text-gray-600">Implement eco-friendly practices to reduce our carbon footprint.</p>
                            </div>
                        </div>
                        <div className="card bg-gray-50 hover:shadow-xl transition-shadow border border-gray-100">
                            <figure className="px-6 pt-6">
                                <div className="text-6xl text-blue-600">🤝</div>
                            </figure>
                            <div className="card-body text-center">
                                <h3 className="card-title justify-center text-xl mb-2">Community Health Camps</h3>
                                <p className="text-gray-600">Providing free health checkups and medicines to underserved areas.</p>
                            </div>
                        </div>
                        <div className="card bg-gray-50 hover:shadow-xl transition-shadow border border-gray-100">
                            <figure className="px-6 pt-6">
                                <div className="text-6xl text-red-600">❤️</div>
                            </figure>
                            <div className="card-body text-center">
                                <h3 className="card-title justify-center text-xl mb-2">Patient Welfare</h3>
                                <p className="text-gray-600">Supporting economically weaker patients with subsidized treatments.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitizenFoundation;
