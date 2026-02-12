import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Departments from './pages/Departments'
import Doctors from './pages/Doctors'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import Academic from './pages/Academic'
import CitizenFoundation from './pages/CitizenFoundation'
import Careers from './pages/Careers'
import HealthPackages from './pages/HealthPackages'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/PatientDashboard'
import BookAppointment from './pages/BookAppointment'
import Footer from './components/Footer'

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/departments" element={<Departments />} />
                            <Route path="/doctors" element={<Doctors />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/academic" element={<Academic />} />
                            <Route path="/foundation" element={<CitizenFoundation />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/health-packages" element={<HealthPackages />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={<PatientDashboard />} />
                            <Route path="/book-appointment" element={<BookAppointment />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
