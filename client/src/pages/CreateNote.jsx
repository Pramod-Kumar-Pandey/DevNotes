import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const CreateNote = () => {

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: []
    });

    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addTag = () => {
        const tag = tagInput.trim();

        if (!tag) {
            return;
        }

        if (formData.tags.includes(tag)) {
            toast.error("Tag already added");
            return;
        }

        setFormData({
            ...formData,
            tags: [...formData.tags, tag]
        });

        setTagInput("");
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.category) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/notes", formData);

            toast.success(
                response.data.message || "Note created successfully!",
                {
                    duration: 3000
                }
            );

            navigate("/dashboard");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50">

            <Navbar />

            <div className="flex min-h-screen items-center justify-center px-5 py-28">

                <div className="w-full max-w-2xl rounded-xl bg-blue-50 p-6 sm:p-8">

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <h2 className="text-2xl font-semibold text-gray-900">
                            Create New Note
                        </h2>

                        <h3 className="mt-2 text-base font-medium text-gray-700">
                            Capture and organize your{" "}
                            <span className="text-blue-600">
                                developer knowledge
                            </span>
                        </h3>

                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="mb-2 block text-lg font-medium text-gray-700"
                            >
                                Title
                            </label>

                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter note title"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>


                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="mb-2 block text-lg font-medium text-gray-700"
                            >
                                Category
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">
                                    Select category
                                </option>

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


                        {/* Tags */}
                        <div>

                            <label
                                htmlFor="tags"
                                className="mb-2 block text-lg font-medium text-gray-700"
                            >
                                Tags
                            </label>

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    id="tags"
                                    value={tagInput}
                                    onChange={(e) =>
                                        setTagInput(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    placeholder="Enter a tag"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white transition hover:bg-gray-800"
                                >
                                    Add
                                </button>

                            </div>

                            {/* Display tags */}
                            {formData.tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">

                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-2 rounded-md bg-blue-100 px-3 py-1.5 text-sm text-blue-700"
                                        >
                                            #{tag}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTag(tag)
                                                }
                                                className="font-bold hover:text-red-500"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}

                                </div>
                            )}

                        </div>


                        {/* Content */}
                        <div>

                            <label
                                htmlFor="content"
                                className="mb-2 block text-lg font-medium text-gray-700"
                            >
                                Content
                            </label>

                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="10"
                                placeholder="Write your note here..."
                                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* Buttons */}
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Note"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateNote;