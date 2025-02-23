import Image from "next/image";
import "@/styles/pages/landing.css";

export default function home() {
  return (
    <div className="bg-green-50 text-gray-900 min-h-screen relative">
      {/* Hero Section */}
      <div className="logo z-10">
        <Image src="/logo.png" alt="logo" height={80} width={80} />
      </div>
      <section className="hero-section h-screen flex flex-col items-center justify-center text-center">
        <h1 className="hero-text-main text-4xl md:text-6xl font-bold text-white">Welcome to Krishi Connect</h1>
        <p className="hero-text-sub mt-4 text-lg md:text-xl text-white font-poppins tracking-widest">Empowering Farmers, Connecting Communities</p>
        <button className="hero-btn mt-6 px-6 py-3 bg-custom-warm text-white text-lg transition-all duration-300">Get Started</button>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-700">About Krishi Connect</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Krishi Connect is a platform designed to help farmers connect, share knowledge, and access resources effortlessly.
        </p>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 text-center bg-green-100">
        <h2 className="text-3xl font-bold text-green-700">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Farmer Forums</h3>
            <p className="text-gray-600 mt-2">Discuss agricultural topics with fellow farmers.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Market Access</h3>
            <p className="text-gray-600 mt-2">Buy and sell produce directly from the platform.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Expert Guidance</h3>
            <p className="text-gray-600 mt-2">Get advice from agricultural experts.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
