
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup=()=>{
    
    const [formData,setFormData]=useState({
        name:"",
        email :"",
        password:""
    });

    const {setUser} =useAuth();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name, value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", formData);

            setUser(response.data.user);

            toast.success("Account created successfully!", {
                duration: 3000
            });
            navigate("/dashboard");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
          
            <div className="w-2/3 h-2/3 bg-blue-50 rounded-xl grid items-center justify-items-center sm:w-1/3">
                <div className="grid items-center justify-items-center">
                    <h2 className="text-gray-900 text-xl font-medium">
                        Create Your Account
                    </h2>
                    <h3 className="text-gray-900 text-lg font-medium">
                         Start organizing your developer knowledge with 
                          <span className="text-blue-600"> DevNotes</span>
                    </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div >
                        <label htmlFor="name" 
                        className="mb-2 block text-lg font-medium text-gray-700">
                            Name
                            <input type="text" id="name" name="name" value={formData.name}
                            onChange={handleChange}  placeholder="Enter your name"
                            className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
                        </label>
                        
                    </div>

                    <div >
                        <label htmlFor="email" 
                        className="mb-2 block text-lg font-medium text-gray-700">
                            Email
                            <input type="email" id="email" name="email" value={formData.email}
                            onChange={handleChange}  placeholder="Enter your email"
                            className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
                        </label>
                        
                    </div>

                    <div >
                        <label htmlFor="password" 
                        className="mb-2 block text-lg font-medium text-gray-700">
                            Password
                            <input type="password" id="password" name="password" value={formData.password}
                            onChange={handleChange}  placeholder="Enter your password"
                            className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
                        </label>
                        
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>


                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                        Login
                    </Link>
                </p>
                
            </div>
            
        </div>
        </>
    )
}

export default Signup;