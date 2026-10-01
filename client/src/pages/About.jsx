import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="flex-1">

                {/* Hero */}
                <section className="mx-5 sm:mx-20 mt-25 rounded-xl bg-blue-50 px-6 py-12 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        About DevNotes
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-gray-600">
                        DevNotes is a simple knowledge management platform built
                        for developers to write, organize, and revisit what they
                        learn while coding.
                    </p>
                </section>

                {/* Why DevNotes */}
                <section className="mx-5 sm:mx-20 mt-10 rounded-xl bg-white p-6 sm:p-10 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Why DevNotes?
                    </h2>

                    <p className="mt-4 leading-7 text-gray-600">
                        Developers learn many new concepts every day, but
                        important information can easily get lost in notebooks,
                        files, bookmarks, and different applications. DevNotes
                        provides one organized place to store and manage your
                        technical knowledge.
                    </p>
                </section>

                {/* What You Can Do */}
                <section className="mx-5 sm:mx-20 mt-10">
                    <h2 className="text-2xl font-bold text-center text-gray-900">
                        What You Can Do
                    </h2>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Create Notes
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Write and save notes about programming,
                                projects, interview preparation, and more.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Organize Knowledge
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Use categories and tags to keep your technical
                                knowledge organized.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Easy to Revisit
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Quickly find and revisit concepts whenever you
                                need them.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="mx-5 sm:mx-20 mt-10 mb-12 rounded-xl bg-white p-6 sm:p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Built By
                    </h2>

                    <h3 className="mt-4 text-xl font-semibold text-blue-600">
                        Pramod Kumar Pandey
                    </h3>

                    <p className="mt-2 text-gray-600">
                        B.Tech Computer Science & Engineering
                    </p>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        Passionate about software development, backend technologies,
                        and building practical applications.
                    </p>
                </section>

                {/* Technology */}
                <section className="mx-5 sm:mx-20 mt-10 mb-12 rounded-xl bg-blue-50 p-6 sm:p-10 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Built With
                    </h2>

                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                        {[
                            "React.js",
                            "Tailwind CSS",
                            "Node.js",
                            "Express.js",
                            "MongoDB",
                            "Mongoose",
                            "JWT"
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default About;