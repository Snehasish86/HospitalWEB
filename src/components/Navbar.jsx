import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Handle <details> elements (Desktop menus)
            const details = document.querySelectorAll('details[open]');
            details.forEach((detail) => {
                if (!detail.contains(event.target)) {
                    detail.removeAttribute('open');
                }
            });

            // Handle DaisyUI dropdowns (Mobile & Account)
            // They rely on focus, so if we click outside, we should blur the active element
            // ONLY if the click target is not within a dropdown
            if (!event.target.closest('.dropdown')) {
                const elem = document.activeElement;
                if (elem && elem.classList.contains('btn')) { // rudimentary check
                    elem.blur();
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
        const details = document.querySelectorAll('details[open]');
        details.forEach(detail => {
            detail.removeAttribute('open');
        });
    }

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" onClick={handleLinkClick}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/services">Services & Depts</Link></li>
                        <li><Link to="/health-packages">Checkup Packages</Link></li>
                        <li><Link to="/doctors">Doctors</Link></li>
                        <li><Link to="/academic">Academics</Link></li>
                        <li><Link to="/blogs">Press Releases</Link></li>
                        <li><Link to="/foundation">Foundation</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold text-primary flex items-center gap-2" onClick={handleLinkClick}>
                    {/* Use PNG format as requested */}
                    <img src="/assets/images/branding/logo_main.png" alt="Logo" className="h-8 w-8 object-contain" />
                    Citizen Hospital
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium z-50" onClick={handleLinkClick}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li>
                        <details>
                            <summary>Medical Services</summary>
                            <ul className="p-2 w-52 bg-base-100 shadow-lg">
                                <li><Link to="/services">All Services</Link></li>
                                <li><Link to="/departments">Departments</Link></li>
                                <li><Link to="/health-packages">Health Packages</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link to="/doctors">Doctors</Link></li>
                    <li>
                        <details>
                            <summary>Academics & Info</summary>
                            <ul className="p-2 w-52 bg-base-100 shadow-lg">
                                <li><Link to="/academic">Academic Courses</Link></li>
                                <li><Link to="/blogs">Press Releases</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>More</summary>
                            <ul className="p-2 w-52 bg-base-100 shadow-lg">
                                <li><Link to="/foundation">Foundation</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
            <div className="navbar-end flex gap-2">
                <a href="tel:7477783934" className="btn btn-circle btn-error btn-sm text-white animate-pulse" title="Emergency: +91 74777 83934"><FaPhoneAlt /></a>
                <a href="https://wa.me/917477783934" className="btn btn-circle btn-success btn-sm text-white" title="WhatsApp"><FaWhatsapp /></a>
                {isAuthenticated ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-primary btn-sm px-4 m-1">Account</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" onClick={handleLinkClick}>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm px-6">Login</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
