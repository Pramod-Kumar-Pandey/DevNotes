
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {user,setUser}=useAuth();

    const navigate=useNavigate();

    const handleLogout=async()=>{
        try {
            await api.post("/auth/logout");
            setUser(null);
            toast.success("LoggedOut Successfully!", {
                duration: 3000
            });
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }

    }

    return (
        <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/assets/Logo.png"
                        alt="DevNotes Logo"
                        className="h-9 w-9 rounded-lg"
                    />

                    <span className="text-xl font-bold text-gray-900">
                        Dev<span className="text-blue-600">Notes</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <a
                        href={user?"/mynotes":"/login"}
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        MyNotes
                    </a>

                    <a
                        href="/about"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        About
                    </a>
                </div>

                {/* Desktop Buttons */}
                { user ?<div className="hidden items-center gap-3 md:flex">
                        <button
                            onClick={handleLogout}
                            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                    :<div className="hidden items-center gap-3 md:flex">
                        <Link
                            to="/login"
                            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                    </div>
                }

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute left-0 top-full z-50 w-full border-b border-gray-200 bg-white shadow-lg md:hidden">
                    
                    <div className="flex flex-col px-6 py-4">

                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Home
                        </Link>

                        <a
                            href="#features"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Features
                        </a>

                        <a
                            href="#about"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            About
                        </a>

                        <div className="my-3 border-t border-gray-200"></div>

                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
                        >
                            Get Started
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;