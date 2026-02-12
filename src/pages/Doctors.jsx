import { useState } from 'react';

const Doctors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    const doctors = [
        { name: "Dr. Bashar Imam Ahmad", qualification: "M.B.B.S., M.D.", dept: "Internal Medicine", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Arindam Chatterjee", qualification: "M.B.B.S., M.D.", dept: "Medicine", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Praveen Kumar Yadav", qualification: "M.B.B.S., M.D., D.M. (Neurology)", dept: "Neurology", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Sukanta Das", qualification: "M.B.B.S., M.C.H. (Neuro Surgery - AIIMS)", dept: "Neuro Surgeon", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Joy Sanyal", qualification: "M.B.B.S., M.D., D.M. (Cardiology)", dept: "Cardiology", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Sudipto Bhattacharyya", qualification: "M.B.B.S., DrNB CTVS, MIACS, FIACS", dept: "C T V S", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Nabarun Bandyopadhyay", qualification: "M.B.B.S., D(Ortho), M.CH. (Ortho-USAIM)", dept: "Ortho", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Nilotpal Bhattacharjee", qualification: "M.B.B.S., D.T.C.D., D.N.B. Respiratory Medicine", dept: "Pulmonology", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Banku Bihari Dutta", qualification: "M.B.B.S., D.G.O., M.S.", dept: "Gynaecology", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Krishnendu Bhattacharya", qualification: "M.B.B.S., D.T.C.D., M.D.(Paed.)", dept: "Paediatric", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Manoj Hazra", qualification: "M.B.B.S., M.S.(OPHTHAL), PHACO Surgeon", dept: "Ophthal", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Indranil Mukherjee", qualification: "M.B.B.S., M.S.(ENT)", dept: "ENT", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Debsmita Roy", qualification: "M.B.B.S., M.D., D.M. (Gastro)", dept: "Gastroentrology", image: "/assets/images/doctors/avatars/dr_specialist_female.png" },
        { name: "Dr. Raju Ranjan", qualification: "M.B.B.S., M.S., M.CH.(Urology)", dept: "Urology", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Aniruddha Rudra", qualification: "M.B.B.S., M.D.(Medicine), D.M.(Nephrology)", dept: "Nephrology", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Premnath Dutta", qualification: "M.B.B.S., D.M.R.T., M.D. (Radio-Therapy)", dept: "Oncology", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Kaushal Priya Anand", qualification: "M.B.B.S., M.S., M.CH.(Reconstructive Surgery)", dept: "Plastic Surgery", image: "/assets/images/doctors/avatars/dr_surgeon_male.png" },
        { name: "Dr. Apurba Banerjee", qualification: "M.B.B.S., M.D., D.M. (Clinical Hematology)", dept: "Hematology", image: "/assets/images/doctors/avatars/dr_senior_male.png" },
        { name: "Dr. Rumpa Banerjee", qualification: "M.B.B.S., M.D.(Radio Diagnosis)", dept: "Radiology", image: "/assets/images/doctors/avatars/dr_general_female.png" },
        { name: "Dr. Sana Nora Ahmad", qualification: "M.B.B.S., M.D.(Microbiology)", dept: "Microbiology", image: "/assets/images/doctors/avatars/dr_specialist_female.png" },
        { name: "Dr. Utsha Senapati", qualification: "M.B.B.S., M.D.(Pathology)", dept: "Pathology", image: "/assets/images/doctors/avatars/dr_general_female.png" }
    ];

    const filteredDoctors = doctors.filter(doc =>
        (selectedDept === 'All' || doc.dept === selectedDept) &&
        (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.dept.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const uniqueDepts = ['All', ...new Set(doctors.map(d => d.dept))];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[300px] flex items-center"
                style={{ backgroundImage: "url('/assets/images/hero/hero_main.png')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <h1 className="text-5xl font-bold mb-4">Our Doctors</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Meet our team of experienced and dedicated medical professionals
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <input
                        type="text"
                        placeholder="Search doctor or specialty..."
                        className="input input-bordered w-full md:w-1/3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="select select-bordered w-full md:w-1/4"
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                    >
                        {uniqueDepts.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="container mx-auto px-4 py-8 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredDoctors.map((doc, index) => (
                        <div key={index} className="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <figure className="px-6 pt-6 bg-blue-50">
                                <img src={doc.image} alt={doc.name} className="h-48 w-48 object-cover rounded-full border-4 border-white shadow-lg" />
                            </figure>
                            <div className="card-body text-center items-center">
                                <h2 className="card-title text-xl text-gray-800">{doc.name}</h2>
                                <p className="text-blue-600 font-semibold text-sm">{doc.dept}</p>
                                <p className="text-gray-500 text-xs mt-1">{doc.qualification}</p>
                                <div className="card-actions mt-4">
                                    <button className="btn btn-primary btn-sm">Book Appointment</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Doctors
