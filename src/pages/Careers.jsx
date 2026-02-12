
import { FaHandshake, FaChartLine, FaGift, FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa';

const Careers = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                        Be a part of a compassionate and dynamic healthcare community
                    </p>
                </div>
            </div>


            {/* Why Join Us */}
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Work With Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Inclusive Environment', desc: 'Collaborative and supportive team culture.', icon: <FaHandshake /> },
                        { title: 'Professional Growth', desc: 'Continuous learning and career development.', icon: <FaChartLine /> },
                        { title: 'Excellent Benefits', desc: 'Competitive salary and health perks.', icon: <FaGift /> }
                    ].map((perk, idx) => (
                        <div key={idx} className="card bg-white shadow-md p-6">
                            <div className="text-4xl mb-4 text-blue-600 flex justify-center">{perk.icon}</div>
                            <h3 className="font-bold text-xl mb-2">{perk.title}</h3>
                            <p className="text-gray-600">{perk.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Openings */}
            <div className="bg-white py-16 shadow-inner">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Current Openings</h2>
                    <p className="text-center text-gray-600 mb-12">
                        We are always looking for talented individuals to join our team in Durgapur. <br />
                        Send your CV to <a href="mailto:hrcitizenhospital@gmail.com" className="text-blue-600 font-bold hover:underline">hrcitizenhospital@gmail.com</a>
                    </p>
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {[
                            { role: 'Staff Nurse (ICU/OT)', exp: '1-5 Years', loc: 'Durgapur', type: 'Full Time' },
                            { role: 'Resident Medical Officer', exp: '1-3 Years', loc: 'Durgapur', type: 'Full Time/Rotational' },
                            { role: 'Pharmacist', exp: 'Freshers/Experienced', loc: 'Durgapur', type: 'Full Time' },
                            { role: 'Front Desk Executive', exp: '0-2 Years', loc: 'Durgapur', type: 'Full Time' },
                            { role: 'Marketing Executive', exp: '1-3 Years', loc: 'Durgapur', type: 'Full Time' },
                        ].map((job, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-800">{job.role}</h3>
                                    <div className="flex gap-4 text-sm text-gray-600 mt-2 items-center">
                                        <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-red-500" /> {job.loc}</span>
                                        <span className="flex items-center gap-1"><FaBriefcase className="text-gray-500" /> {job.exp}</span>
                                        <span className="flex items-center gap-1"><FaClock className="text-green-500" /> {job.type}</span>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm mt-4 md:mt-0">Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Application Form */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Drop Your CV</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Full Name</span></label>
                                <input type="text" placeholder="John Doe" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input type="email" placeholder="john@example.com" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Phone Number</span></label>
                            <input type="tel" placeholder="+91 98765 43210" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Position Applied For</span></label>
                            <select className="select select-bordered w-full">
                                <option disabled selected>Select Position</option>
                                <option>Nurse</option>
                                <option>Doctor</option>
                                <option>Administration</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Upload Resume (PDF/DOCX)</span></label>
                            <input type="file" className="file-input file-input-bordered w-full" accept=".pdf,.docx,.doc" />
                        </div>
                        <button className="btn btn-primary w-full mt-4">Submit Application</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Careers;
