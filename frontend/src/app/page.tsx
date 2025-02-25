import Image from "next/image";
import { MdForum } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaPersonChalkboard } from "react-icons/fa6";

export default function home() {
  return (
    <div className="bg-green-50 text-gray-900 min-h-screen relative">
      {/* Hero Section */}
      <div className="logo z-10">
        <Image src="/logo.png" alt="logo" height={80} width={80} />
      </div>
      <section className="hero-section h-screen flex flex-col items-center justify-center text-center z-10">
        <h1 className="hero-text-main text-4xl md:text-6xl font-bold text-white">
          Welcome to Krishi Connect
        </h1>
        <p className="hero-text-sub mt-4 text-lg md:text-xl text-white font-poppins tracking-widest">
          Empowering Farmers, Connecting Communities
        </p>
        <button className="warm-btn mt-6 px-6 py-3 bg-custom-warm text-white text-lg transition-all duration-300">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center bg-green-100 -mt-64 min-h-screen">
        <h1 className="font-primary pt-[30rem]">Key Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-10 pt-9 mx-auto max-w-[100rem]">

          <div className="card">
            <MdForum className="card__img"/>
            <h3>Farmer Forums</h3>
            <p>Discuss agricultural topics with fellow farmers.</p>
          </div>
          <div className="card">
            <GoGraph className="card__img"/>
            <h3>Market Access</h3>
            <p>Buy and sell produce directly from the platform.</p>
          </div>
          <div className="card">
            <FaPersonChalkboard className="card__img"/>
            <h3>Expert Guidance</h3>
            <p>Get advice from agricultural experts.</p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 px-6 bg-white m-full text-center about row min-h-screen landing-about">
        
      </section>

    </div>
  );
}
