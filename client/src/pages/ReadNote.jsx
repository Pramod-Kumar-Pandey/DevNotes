import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useState, useEffect } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const ReadNote = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [note, setNote] = useState(null);
    const navigate=useNavigate();
    const [aiResponse, setAiResponse] = useState({
        type: "",
        content: ""
    });

    const [aiLoading, setAiLoading] = useState(false);
    const [aiAction, setAiAction] = useState("");
    const [quiz,setQuiz]=useState([]);
    const [quizIdx,setQuizIdx]=useState(0);
    const [selectedAnswer,setSelectedAnswer]=useState("");
    const [quizFinished,setQuizFinished]=useState(false);
    const currentQuestion = quiz[quizIdx];
    
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [askedQuestion, setAskedQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [chatLoading, setChatLoading] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${id}`);
                setNote(response.data.note);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNote();
    }, [id]);


    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/notes/${id}`);

            toast.success("Note deleted successfully!");

            navigate("/mynotes");
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to delete note"
            );
        }
    };


    const handleSummarize=async()=>{
        try {
            setAiAction("Summarizing");
            setAiLoading(true);
            const response= await api.post("/ai/summarize",{
                "noteId":id
            });
            
            if(!response){
                toast.error("Failed to summarize note");
                return;
            }

            setAiResponse({
                type: "summary",
                content: response.data.result
            });

        } catch (error) {
            setAiResponse({ type: "", content: "" });
            toast.error(
                error.response?.data?.message || "Failed to summarize note"
            );
        }finally{
            setAiLoading(false);
            setAiAction("");
        }
    }

    const handleExplain=async()=>{
         try {
            setAiAction("Explaining");
            setAiLoading(true);
            const response= await api.post("/ai/explain",{
                "noteId":id
            });

            setAiResponse({
                type: "explanation",
                content: response.data.result
            });

        } catch (error) {
            setAiResponse({ type: "", content: "" });
            toast.error(
                error.response?.data?.message || "Failed to explain note"
            );
        }finally{
            setAiLoading(false);
            setAiAction("");
        }
    }

    const handleKeyPoints=async()=>{
         try {
            setAiAction("Extracting key points");
            setAiLoading(true);
            const response= await api.post("/ai/keyPoints",{
                "noteId":id
            });
            
            setAiResponse({
                type: "keyPoints",
                content: response.data.result
            });

        } catch (error) {
            setAiResponse({ type: "", content: "" });
            toast.error(
                error.response?.data?.message || "Failed to provide key points note"
            );
        }finally{
            setAiLoading(false);
            setAiAction("");
        }
    }

    const handleInterviewQuestions=async()=>{
         try {
            setAiAction("Generating Important Questions");
            setAiLoading(true);
            const response= await api.post("/ai/impQuestions",{
                "noteId":id
            });
            
            setAiResponse({
                type: "impQuestions",
                content: response.data.result
            });

        } catch (error) {
            setAiResponse({ type: "", content: "" });
            toast.error(
                error.response?.data?.message || "Failed to generate Imp. Questions"
            );
        }finally{
            setAiLoading(false);
            setAiAction("");
        }
    }

    const handleQuiz = async () => {
        try {
            setAiAction("Generating Quiz");
            setAiLoading(true);

            const response = await api.post("/ai/quiz", {
                noteId: id
            });

            try {
                const quizData = JSON.parse(response.data.result);
                setQuiz(quizData);
            } catch (error) {
                toast.error("Failed to load quiz");
            }

        } catch (error) {
            setQuiz([]);
            toast.error(
                error.response?.data?.message || "Failed to generate Quiz"
            );
        } finally {
            setAiLoading(false);
            setAiAction("");
        }
    };
    

    const handleAskFromAi = async () => {
        if (!question.trim()) {
            return;
        }

        try {
            setChatLoading(true);

            setAskedQuestion(question);
            setQuestion("");
            setAnswer("");
            
            const response = await api.post("/ai/askFromAi", {
                noteId: id,
                question: question
            });

            setAnswer(response.data.result);

        } catch (error) {
            setAskedQuestion("");
            setQuestion("");

            toast.error(
                error.response?.data?.message || "Failed to give answer"
            );
        } finally {
            setChatLoading(false);
        }
    };


    if (!note) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />

                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-600">Loading note...</p>
                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="flex-1">
                <div className="mx-5 sm:mx-20 mt-20 mb-10">


                    {aiLoading && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
                            <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
                                
                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>

                                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                                    {aiAction}...
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Please wait while we process your note.
                                </p>

                            </div>
                        </div>
                    )}


                    {aiResponse.content && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
                            <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">

                                <button
                                    onClick={() => setAiResponse({ type: "", content: "" })}
                                    className="absolute right-4 top-4"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-semibold text-gray-800">
                                    {aiResponse.type === "summary" && "AI Summary"}
                                    {aiResponse.type === "explanation" && "AI Explanation"}
                                    {aiResponse.type === "keyPoints" && "Key Points"}
                                </h2>

                                <div className="mt-4 rounded-lg bg-blue-50 p-4">
                                    <p className="whitespace-pre-wrap text-gray-700">
                                        {aiResponse.content}
                                    </p>
                                </div>

                            </div>
                        </div>
                    )}


                    
                    {quiz.length > 0 && !quizFinished && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
                            <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">

                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setQuiz([]);
                                        setQuizIdx(0);
                                        setSelectedAnswer("");
                                        setQuizFinished(false);
                                    }}
                                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                                >
                                    ✕
                                </button>

                                {/* Header */}
                                <div className="pr-8">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        AI Quiz
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Question {quizIdx + 1} of {quiz.length}
                                    </p>
                                </div>

                                {/* Question */}
                                <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-800">
                                    {currentQuestion.question}
                                </h3>

                                {/* Options */}
                                <div className="mt-5 space-y-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <button
                                            key={index}
                                            disabled={selectedAnswer !== ""}
                                            onClick={() => setSelectedAnswer(option)}
                                            className={`w-full rounded-lg border p-3 text-left transition
                                                ${
                                                    selectedAnswer === ""
                                                        ? "border-gray-300 hover:bg-gray-50"
                                                        : option === currentQuestion.answer
                                                        ? "border-green-500 bg-green-50 text-green-700"
                                                        : option === selectedAnswer
                                                        ? "border-red-500 bg-red-50 text-red-700"
                                                        : "border-gray-300 text-gray-500"
                                                }
                                            `}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                {/* Answer Feedback */}
                                {selectedAnswer && (
                                    <div className="mt-5">
                                        {selectedAnswer === currentQuestion.answer ? (
                                            <p className="font-medium text-green-600">
                                                ✓ Correct answer!
                                            </p>
                                        ) : (
                                            <p className="font-medium text-red-600">
                                                ✕ Wrong answer
                                            </p>
                                        )}

                                        {selectedAnswer !== currentQuestion.answer && (
                                            <p className="mt-2 text-sm text-gray-600">
                                                Correct answer:{" "}
                                                <span className="font-semibold text-green-600">
                                                    {currentQuestion.answer}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Next Button */}
                                {selectedAnswer && (
                                    <button
                                        onClick={() => {
                                            if (quizIdx < quiz.length - 1) {
                                                setQuizIdx(quizIdx + 1);
                                                setSelectedAnswer("");
                                            } else {
                                                setQuizFinished(true);
                                            }
                                        }}
                                        className="mt-6 w-full rounded-lg bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
                                    >
                                        {quizIdx < quiz.length - 1
                                            ? "Next Question"
                                            : "Finish Quiz"}
                                    </button>
                                )}

                            </div>
                        </div>
                    )}



                    {isChatOpen && (
                        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">

                            {/* Header */}
                            <div className="flex items-center justify-between bg-violet-600 px-5 py-4 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                                        <BsChatDots size={24} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold">Ask AI</h2>
                                        <p className="text-xs text-violet-100">
                                            Ask anything about this note
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsChatOpen(false);
                                        setAskedQuestion("");
                                        setAnswer("");
                                    }}
                                    className="rounded-full p-1.5 transition hover:bg-white/20"
                                >
                                    <IoClose size={22} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">

                                {/* AI message */}
                                <div className="flex items-start gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                        <FaRobot size={20} />
                                    </div>

                                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                                        <p className="text-sm text-gray-700">
                                            Hi! I'm your AI assistant. Ask me anything
                                            about this note.
                                        </p>
                                    </div>
                                </div>

                                {/* Example user message */}
                                {askedQuestion && <div className="flex justify-end">
                                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-violet-600 px-4 py-3 text-white">
                                        <p className="text-sm">
                                            {askedQuestion}
                                        </p>
                                    </div>
                                </div>}

                                {/* Example AI response */}
                                {answer && <div className="flex items-start gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                        <FaRobot size={20} />
                                    </div>

                                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                                        <p className="text-sm leading-6 text-gray-700">
                                            {answer}
                                        </p>
                                    </div>
                                </div>}
                                
                                {chatLoading && (
                                    <p className="text-sm text-gray-500">
                                        AI is thinking...
                                    </p>
                                )}
                                
                            </div>

                            {/* Input */}
                            <div className="border-t bg-white p-3">
                                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-violet-400">

                                    <input
                                        value={question}
                                        onChange={(e)=>setQuestion(e.target.value)}
                                        type="text"
                                        placeholder="Ask something..."
                                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                                    />

                                    <button
                                        disabled={chatLoading}
                                        onClick={handleAskFromAi}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-700"
                                    >
                                        {chatLoading ? "..." : <IoSend />}
                                    </button>

                                </div>
                            </div>

                        </div>
                    )}



                    {/* Note Container */}
                    <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 sm:p-10">

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-900">
                            {note.title}
                        </h1>

                        {/* Category */}
                        <div className="mt-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                                {note.category}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {note.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="my-6 border-t border-gray-200"></div>

                        {/* Content */}
                        <div className="whitespace-pre-wrap text-base leading-7 text-gray-700">
                            {note.content}
                        </div>


                        {/* {AI Tools} */}
                        <div className="mt-4 flex flex-wrap gap-3">
                            <button onClick={handleSummarize}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium 
                            text-white transition hover:bg-violet-700">📝 Summarize</button>
                            
                            <button onClick={handleExplain}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium 
                            text-white transition hover:bg-violet-700">💡 Explain</button>
                            
                            <button onClick={handleKeyPoints}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium
                             text-white transition hover:bg-violet-700">☑️ Key Points</button>

                             <button onClick={handleInterviewQuestions}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium
                             text-white transition hover:bg-violet-700">❓ Imp. Questions</button>

                             <button onClick={handleQuiz}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium
                             text-white transition hover:bg-violet-700">🧠 Quiz</button>

                            <button
                                onClick={() => {
                                    setIsChatOpen(!isChatOpen);
                                    setAskedQuestion("");
                                    setAnswer("");
                                }}
                                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition hover:scale-105 hover:bg-violet-700"
                            >
                                {isChatOpen ? <IoClose size={26} /> :  <BsChatDots size={24} />}
                            </button>
                        </div>


                        {/* Date */}
                        <div className="mt-8 border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-400">
                                Created on{" "}
                                {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/mynotes"
                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                            >
                                ← Back to My Notes
                            </Link>

                            <Link
                                to={`/notes/${note._id}/edit`}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Edit Note
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Delete Note
                            </button>

                        </div>
                        
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ReadNote;