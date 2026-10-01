import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import {FaSearch,FaUser,FaArrowRight} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { motion } from "motion/react";

export default function Home(){

    const {user}=useAuth();

    return(
        <div className="w-full bg-gray-50">
            <Navbar/>

            <div className="flex-1">
            <div className="grid grid-cols-1 p-10 mx-5 sm:mx-10 lg:mx-20 mt-25 mb-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg">
                    <h1 className="text-xl text-gray-900 font-bold m-4 p-4 text-center">
                        Your <span className="text-blue-600">Code</span>. Your <span className="text-blue-600">Notes</span>. Your <span className="text-blue-600">Knowledge</span>.
                    </h1>

                    <div className="flex flex-col items-center justify-center m-5 bg-white rounded-lg shadow-sm transition hover:shadow-md">
                        <p className="m-3 p-2">
                            <FaArrowRight className="inline"/>Write, organize, and manage your programming
                            notes in one place.
                        </p>
                        <p className="m-3 p-2">
                            <FaArrowRight className="inline"/>Keep your knowledge structured and easy to find whenever you need it.
                        </p>
                    </div>
                    <p>Start writing your first note today.</p>
                    <Link
                        to={user?"/dashboard" :"/signup"}
                        className="rounded-lg bg-blue-600 px-4 py-2 m-4 font-medium text-white transition hover:bg-blue-700"
                    >
                        Get Started
                    </Link>

                </div>


                <div className="flex flex-col items-center justify-center bg-blue-50 lg:col-span-2 rounded-lg">
                    <p>DevNotes Preview</p>
                    <div className="grid w-full p-2 sm:p-4">
                        <div className="flex w-full items-center justify-between rounded-lg bg-white mb-3 p-3 sm:p-4">
                            <span className="text-base font-medium text-gray-900 sm:text-lg">
                                Dev<span className="text-blue-600">Notes</span>
                            </span>
                            <div className="flex items-center gap-4 sm:gap-6">
                                <FaSearch className="text-base sm:text-lg" />
                                <FaUser className="text-base sm:text-lg" />
                            </div>

                        </div>


                        <div className="grid grid-cols-2 gap-2 bg-white">
                            <div className="flex col-span-2 w-full items-center justify-around rounded-lg bg-white p-3 sm:p-4">
            
                                <p className="text-sm sm:text-base">
                                    MyNotes
                                </p>

                                <p className="text-sm sm:text-base">
                                    + NewNotes
                                </p>

                            </div>

                            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white mx-7 my-4 p-5 shadow-sm transition hover:shadow-md">

                                {/* Title */}
                                <h2 className="text-lg font-bold text-gray-900">
                                    Java Multithreading
                                </h2>

                                {/* Content */}
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    Learn about threads, concurrency, and how multiple tasks
                                    can execute at the same time.
                                </p>

                                {/* Category */}
                                <div className="mt-4">
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                        Java
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                        #thread
                                    </span>

                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                        #concurrency
                                    </span>
                                </div>

                                {/* Footer */}
                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                                    <span className="text-xs text-gray-400">
                                        Sep 4, 2026
                                    </span>

                                </div>

                            </div>

                            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white m-5 p-5 shadow-sm">

                                <h2 className="text-lg font-bold text-gray-900">
                                    JavaScript Promises
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    Promises handle asynchronous operations in JavaScript
                                    and make it easier to work with API requests.
                                </p>

                                <div className="mt-4">
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                        JavaScript
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                        #javascript
                                    </span>

                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                        #async
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                                    <span className="text-xs text-gray-400">
                                        Sep 3, 2026
                                    </span>

                                </div>

                            </div>     
                                               
                        </div>
                    </div>  

                </div >
                
            </div>


            <div className="grid grid-cols-1 p-10 mt-5 mb-20 mx-20 bg-slate-50 md:grid-cols-2 lg:grid-cols-3 gap-15 rounded-lg">
                <h1 className="col-span-full text-center text-3xl font-bold text-blue-600">
                    Features
                </h1>
                
                <motion.div 
                initial={{opacity:0,y:30}}
                whileInView={{opacity:1, y:0}}
                transition={{duration: 0.5 ,delay: 0}}
                whileHover={{scale: 1.02}}
                className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm transition hover:shadow-md">
                    <h1 className="text-xl text-gray-900 font-bold m-4 p-4 justify-content-center">
                        Smart Note Taking
                    </h1>

                    <p className="text-gray-600 m-3 p-3 bg-blue-100 rounded-lg">
                       Create and manage programming notes with titles, content,
                        categories, and tags. Keep everything you learn in one place.
                    </p>

                </motion.div>

                <motion.div 
                 initial={{opacity:0,y:30}}
                 whileInView={{opacity:1, y:0}}
                 transition={{duration: 0.5 ,delay:0.1}}
                 whileHover={{scale: 1.02}}
                 className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm transition hover:shadow-md">
                    <h1 className="text-xl text-gray-900 font-bold m-4 p-4 justify-content-center">
                        Organize & Find
                    </h1>

                    <p className="text-gray-600 m-3 p-3 bg-blue-100 rounded-lg">
                        Organize your knowledge with categories and tags, 
                        then quickly search and find the notes you need whenever you need them.
                    </p>

                </motion.div>

                <motion.div 
                 initial={{opacity:0,y:30}}
                 whileInView={{opacity:1, y:0}}
                 transition={{duration: 0.5 ,delay:0.2}}
                 whileHover={{scale: 1.02}}
                 className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm transition hover:shadow-md">
                    <h1 className="text-xl text-gray-900 font-bold m-4 p-4 justify-content-center">
                        AI-Powered Learning
                    </h1>

                    <p className="text-gray-600 m-3 p-3 bg-blue-100 rounded-lg">
                       Use AI to understand concepts, summarize your notes, 
                       and turn your stored knowledge into a more powerful learning resource.
                    </p>

                </motion.div>

                
            </div>
            </div>
            <Footer/>
        </div>
        
    )
}
