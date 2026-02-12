
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();
    // Mock Data for Appointments
    const appointments = [
        {
            id: 'APT-1023',
            doctor: 'Dr. Rajesh Sharma',
            specialty: 'Cardiology',
            date: '2026-02-15',
            time: '10:30 AM',
            status: 'Confirmed',
            type: 'Video Consult'
        },
        {
            id: 'APT-1004',
            doctor: 'Dr. Priya Desai',
            specialty: 'Pediatrics',
            date: '2026-01-20',
            time: '02:00 PM',
            status: 'Completed',
            type: 'In-Person'
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Health Dashboard</h1>
                        <p className="text-gray-500">Welcome back, {user?.fullName || 'Guest'}</p>
                    </div>
                    <Link to="/book-appointment" className="btn btn-primary shadow-lg">
                        + Book New Appointment
                    </Link>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content: Appointments */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Upcoming Appointments Card */}
                        <div className="card bg-white shadow-md border border-gray-100">
                            <div className="card-body">
                                <h2 className="card-title text-xl text-primary mb-4">Upcoming Appointments</h2>
                                {appointments.filter(a => a.status === 'Confirmed').map(appt => (
                                    <div key={appt.id} className="flex flex-col md:flex-row justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <div className="flex gap-4 items-center mb-4 md:mb-0">
                                            <div className="bg-white p-3 rounded-full shadow-sm">
                                                <span className="text-2xl">📅</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{appt.doctor}</p>
                                                <p className="text-sm text-gray-500">{appt.specialty} • {appt.type}</p>
                                                <p className="text-sm font-semibold text-primary">{appt.date} at {appt.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm btn-outline btn-primary">Reschedule</button>
                                            <button className="btn btn-sm btn-primary">Join Video</button>
                                        </div>
                                    </div>
                                ))}
                                {appointments.filter(a => a.status === 'Confirmed').length === 0 && (
                                    <div className="text-center py-8">
                                        <img src="/assets/images/states/empty_appointments.png" alt="No Appointments" className="w-32 mx-auto mb-2 opacity-50" />
                                        <p className="text-gray-400">No upcoming appointments.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Past Appointments History */}
                        <div className="card bg-white shadow-md border border-gray-100">
                            <div className="card-body">
                                <h2 className="card-title text-lg text-gray-700 mb-4">Past Visits</h2>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Doctor</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled').map(appt => (
                                                <tr key={appt.id}>
                                                    <td>{appt.date}</td>
                                                    <td>
                                                        <div className="font-bold">{appt.doctor}</div>
                                                        <div className="text-sm opacity-50">{appt.specialty}</div>
                                                    </td>
                                                    <td>{appt.type}</td>
                                                    <td><div className="badge badge-success badge-outline">{appt.status}</div></td>
                                                    <td><button className="btn btn-xs btn-ghost text-primary">View Report</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Quick Actions & Profile */}
                    <div className="space-y-6">
                        {/* Profile Summary */}
                        <div className="card bg-white shadow-md border border-gray-100">
                            <div className="card-body items-center text-center">
                                <div className="avatar placeholder mb-2">
                                    <div className="bg-neutral text-neutral-content rounded-full w-16">
                                        <span className="text-xl">{user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">{user?.fullName || 'Guest User'}</h3>
                                <p className="text-sm text-gray-500">UHID: {user?.uhid || 'N/A'}</p>
                                <div className="divider my-2"></div>
                                <div className="w-full text-left space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Phone:</span>
                                        <span className="font-medium">+91 {user?.phoneNumber || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Age:</span>
                                        <span className="font-medium">32 Years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Blood Group:</span>
                                        <span className="font-medium text-red-500">O+</span>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm w-full mt-4">Edit Profile</button>
                            </div>
                        </div>

                        {/* Medical Reports Vault */}
                        <div className="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title"><span className="text-2xl">🔒</span> Secure Vault</h2>
                                <p className="text-indigo-100 text-sm">Access your encrypted medical records and prescriptions securely.</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-sm bg-white text-indigo-600 hover:bg-gray-100 border-none">Open Vault</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PatientDashboard
