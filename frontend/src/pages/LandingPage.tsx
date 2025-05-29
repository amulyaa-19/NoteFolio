import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-purple-600">NoteFolio</div>
        <div className="space-x-4">
          <Link
            to="/signin"
            className="px-4 py-2 text-purple-600 hover:underline"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">
          Organize and Share Your Learning Brain
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-xl">
          Save, tag, and share links from YouTube and Twitter that enhance your
          understanding. All in one place.
        </p>
        <Link
          to="/signup"
          className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg"
        >
          Get Started
        </Link>
      </header>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">
              Save Links
            </h3>
            <p className="text-gray-600">
              Store valuable resources from Twitter and YouTube effortlessly.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Built with modern authentication and secure data handling to keep
              your brain yours.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">
              Share Your Brain
            </h3>
            <p className="text-gray-600">
              Generate a shareable link to let others explore your curated
              knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t mt-12 ">
        © {new Date().getFullYear()} NoteFolio. All rights reserved.
      </footer>
    </div>
  );
}
