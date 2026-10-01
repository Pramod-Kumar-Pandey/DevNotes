
const Footer = () => {
    return (
        <footer className="bg-slate-900 px-6 py-10 text-white">
            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">

                {/* Brand */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold">
                        Dev<span className="text-blue-500">Notes</span>
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                        Your developer knowledge, organized. Write, organize,
                        and manage your programming knowledge in one place.
                    </p>
                </div>

                {/* Product */}
                <div>
                    <h3 className="mb-4 font-semibold">Product</h3>

                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Home</li>
                        <li>Features</li>
                        <li>My Notes</li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="mb-4 font-semibold">Resources</h3>

                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Documentation</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-gray-700 pt-6 text-sm text-gray-400 md:flex-row">
                <p>© 2026 DevNotes. All rights reserved.</p>

                <p>Built for developers, by developers.</p>
            </div>
        </footer>
    );
};

export default Footer;