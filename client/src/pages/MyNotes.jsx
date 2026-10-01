import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useState,useEffect } from "react";
import api from "../api/axios.js";
import {motion} from "motion/react";

const MyNotes = () => {
    
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

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

    const filteredNotes = notes.filter((note) => {
        const matchesSearch =
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase()) ||
            note.tags?.some(tag =>
                tag.toLowerCase().includes(search.toLowerCase())
            );

        const matchesFilter =
            filter === "" || note.category === filter;

        return matchesSearch && matchesFilter;
    });
    


    return (

        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className="flex-1">
            <div className="flex flex-col items-center justify-center mt-20 mx-5 sm:mx-20 bg-blue-50 rounded-lg">
                <div className="flex flex-col items-center gap-3 w-full sm:flex-row sm:items-center sm:justify-between">
                   <div >
                    <select className="rounded-lg border border-gray-300 bg-white ml-4 px-4 py-2 outline-none 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    onChange={(e)=>setFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>

                        <option value="Java">
                                    Java
                                </option>

                                <option value="JavaScript">
                                    JavaScript
                                </option>

                                <option value="React">
                                    React
                                </option>

                                <option value="Node.js">
                                    Node.js
                                </option>

                                <option value="MongoDB">
                                    MongoDB
                                </option>

                                <option value="Spring Boot">
                                    Spring Boot
                                </option>

                                <option value="DSA">
                                    DSA
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                    </select>
                   </div>
                    <div>
                        <input type="text" placeholder="Search notes..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                         className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"></input>
                        
                    </div>
                    
                    
                    <Link
                        to="/notes/new"
                        className="rounded-lg bg-blue-600 px-3 py-2 my-2 mx-4 font-medium text-white transition hover:bg-blue-700"
                    >
                        + Create New Note
                    </Link>
                </div>

            </div>


            <div className="flex flex-col items-center justify-center mx-20 p-3">
                <h2 className="text-2xl font-bold m-3 p-3 text-gray-900">Explore My Notes</h2>
            </div>

            {notes.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-lg text-gray-600">
                    You haven't created any notes yet.
                </div>
            ) : filteredNotes.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-lg text-gray-600">
                    No notes found.<br/>
                    Try changing your search or category filter.
                </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-5 mb-5 sm:mx-20 bg-white">
             
                {filteredNotes.map((note,idx)=>(
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
            </div>
            
            <Footer/>
        </div>
        
    );
};

export default MyNotes;