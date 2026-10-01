import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useState,useEffect } from "react";
import api from "../api/axios.js";
import { FaArrowRight } from "react-icons/fa";
import {motion} from "motion/react";

const Dashboard = () => {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get("/notes");
                setNotes(response.data.notes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNotes();
    }, []);

    const categoryCount = new Set(notes.map(note => note.category)).size;
        
    const recentNotes = notes.filter((note) => {
        const noteDate = new Date(note.createdAt);
        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        return noteDate >= sevenDaysAgo;
    });



    return (

        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <div className="flex-1">
            <div className="flex flex-col items-center justify-center mt-25 mx-5 sm:mx-20 p-3 bg-blue-50 rounded-lg">
                <h2 className="text-2xl font-bold m-3 p-3 text-gray-900">Keep Building, Keep Learning, {user?.name}</h2>
                <p className="text-lg m-3 text-gray-900">
                    Capture what you learn today. Build the knowledge you'll rely on tomorrow.
                </p>

                <div className="flex flex-row items-center justify-center m-3">
                    <div className="mx-2 sm:mx-6 p-2 text-gray-600 bg-blue-100 rounded-md">Total Notes {notes.length}</div>
                    <div className="mx-2 sm:mx-6 p-2 text-gray-600 bg-blue-100 rounded-md">Categories {categoryCount}</div>
                    <div className="mx-2 sm:mx-6 p-2 text-gray-600 bg-blue-100 rounded-md">Recent Notes {recentNotes.length}</div>
                </div>

                <Link
                    to="/notes/new"
                    className="rounded-lg bg-blue-600 px-4 py-2 m-4 font-medium text-white transition hover:bg-blue-700"
                >
                    + Create New Note
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center mx-20 p-3">
                <h2 className="text-2xl font-bold m-3 p-3 text-gray-900">Recent Notes</h2>
            </div>
            
            {notes.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-lg text-gray-600">
                    You haven't created any notes yet.
                </div>
            ) : recentNotes.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-lg text-gray-600">
                    No notes created in the last 7 days.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mx-5 sm:mx-20 bg-white">
                
                {recentNotes.map((note,idx)=>(
                    <motion.div key={note._id} 
                    initial={{opacity:0,y:30}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration: 0.5 ,delay: idx *0.1}}
                    whileHover={{scale: 1.02}}
                    className="w-full max-w-sm rounded-xl border border-gray-200 bg-white my-4 p-5 shadow-sm transition hover:shadow-md">

                        {/* Title */}
                        <h2 className="text-lg font-bold text-gray-900">
                            {note.title}
                        </h2>

                        {/* Content */}
                        <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-4">
                            {note.content}
                        </p>

                        {/* Category */}
                        <div className="mt-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                {note.category}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {note.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                            <span className="text-xs text-gray-400">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </span>

                                <Link to={`/notes/${note._id}`}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Read More
                                </Link>
                            
                        </div>

                    </motion.div>
                ))}
                
            </div>
            )}


            <Link
                to="/mynotes"
                className="flex w-fit items-center justify-center my-5 mx-auto p-3 rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700"
            >
                Explore MyNotes <FaArrowRight />
            </Link>
            
            </div>

            <Footer/>
        </div>
        
    );
};

export default Dashboard;