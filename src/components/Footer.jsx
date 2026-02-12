import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <aside>
                {/* Use PNG format as requested */}
                <img src="/assets/images/branding/logo_main.png" alt="Citizen Hospital Logo" className="w-12 h-12 mb-2 brightness-0 invert object-contain" />
                <p className="font-bold text-lg">Citizen Hospital<br />Excellence in Medical Care since 2020</p>
                <p className="text-sm opacity-75">HIPAA Compliant • 24/7 Support • Trusted</p>
                <p className="font-bold text-warning mt-2">Emergency: +91 74777 83934</p>
            </aside>
            <nav>
                <header className="footer-title">Services</header>
                <Link to="/services" className="link link-hover">All Services</Link>
                <Link to="/departments" className="link link-hover">Departments</Link>
                <Link to="/health-packages" className="link link-hover">Health Packages</Link>
                <Link to="/book-appointment" className="link link-hover">Book Appointment</Link>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <Link to="/about-us" className="link link-hover">About Us</Link>
                <Link to="/doctors" className="link link-hover">Our Doctors</Link>
                <Link to="/careers" className="link link-hover">Careers</Link>
                <Link to="/foundation" className="link link-hover">Foundation</Link>
                <Link to="/contact" className="link link-hover">Contact</Link>
            </nav>
            <nav>
                <header className="footer-title">Resources</header>
                <Link to="/blogs" className="link link-hover">Health Blog</Link>
                <Link to="/academic" className="link link-hover">Academics</Link>
                <a className="link link-hover">Privacy Policy</a>
                <a className="link link-hover">Terms of Service</a>
            </nav>
        </footer>
    )
}

export default Footer
