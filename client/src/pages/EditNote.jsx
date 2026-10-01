import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: []
    });

    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch existing note
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${id}`);

                const note = response.data.note;

                setFormData({
                    title: note.title || "",
                    content: note.content || "",
                    category: note.category || "",
                    tags: note.tags || []
                });

            } catch (error) {
                console.log(error);
                toast.error(
                    error.response?.data?.message || "Failed to fetch note"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Add tag
    const handleAddTag = () => {
        const tag = tagInput.trim();

        if (!tag) return;

        if (formData.tags.includes(tag)) {
            toast.error("Tag already exists");
            return;
        }

        setFormData({
            ...formData,
            tags: [...formData.tags, tag]
        });

        setTagInput("");
    };

    // Remove tag
    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove)
        });
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.category) {
            toast.error("Title, content and category are required");
            return;
        }

        try {
            setSaving(true);

            await api.put(`/notes/${id}`, formData);

            toast.success("Note updated successfully!");

            navigate(`/notes/${id}`);

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to update note"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />

                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-600">
                        Loading note...
                    </p>
                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="flex-1">

                <div className="mx-5 sm:mx-20 mt-25 mb-10">

                    <div className="mx-auto max-w-3xl rounded-xl bg-blue-50 p-6 sm:p-10 shadow-sm">

                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Note
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Update your note and save your changes.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>

                                <div className="mt-2 flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleAddTag();
                                            }
                                        }}
                                        placeholder="Enter a tag"
                                        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm text-gray-600"
                                        >
                                            #{tag}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveTag(tag)
                                                }
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Content
                                </label>

                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows="12"
                                    className="mt-2 w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-3">

                                <Link
                                    to={`/notes/${id}`}
                                    className="rounded-lg bg-gray-200 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <Footer />
        </div>
    );
};

export default EditNote;