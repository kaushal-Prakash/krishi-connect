"use client";
import Image from "next/image";
import { MdForum } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaPersonChalkboard } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".landing-feature__card");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            const element = entry.target as HTMLElement;
            const scrollProgress = Math.min(1, entry.intersectionRatio * 1.5); // Smooth effect
            element.style.opacity = `${scrollProgress}`;
            element.style.transform = `translateY(${(1 - scrollProgress) * 40}px)`;
          }
        });
      },
      { threshold: Array.from({ length: 10 }, (_, i) => i / 10) }
    );
  
    cards.forEach((card) => observer.observe(card));
  
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);
  

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
        <button
          className="warm-btn mt-6 px-6 py-3 bg-custom-warm text-white text-lg transition-all duration-300"
          onClick={handleClick}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center bg-green-100 -mt-64 min-h-screen landing-features">
        <h1 className="font-primary pt-[30rem]">Key Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-10 pt-9 pb-[32rem] mx-auto max-w-[100rem]">
          <div className="card landing-feature__card">
            <MdForum className="card__img" />
            <h3>Farmer Forums</h3>
            <p>Discuss agricultural topics with fellow farmers.</p>
          </div>
          <div className="card landing-feature__card">
            <GoGraph className="card__img" />
            <h3>Market Access</h3>
            <p>Buy and sell produce directly from the platform.</p>
          </div>
          <div className="card landing-feature__card">
            <FaPersonChalkboard className="card__img" />
            <h3>Expert Guidance</h3>
            <p>Get advice from agricultural experts.</p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 px-6 bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background with Low Opacity */}
        <div className="absolute inset-0 w-full h-full opacity-20 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero/landing-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center max-w-4xl w-full px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-custom-brown">
            What Our Farmers Say
          </h2>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review Card 1 */}
            <div className="landing-review--card transform skew-x-6 bg-white p-8 shadow-2xl rounded-lg transition-all duration-300 hover:skew-x-0 hover:scale-105">
              <h2 className="landing-review--card-name text-3xl font-bold mb-4 text-green-600 text-">
                Ram Singh
              </h2>
              <p className="landing-review--card-para text-gray-700 leading-relaxed text-xl">
                "Krishi Connect has transformed the way I manage my farm. The
                expert guidance and market access have helped me increase my
                yield and profits significantly. Highly recommended!"
              </p>
            </div>

            <div className="landing-review--card transform -skew-x-6 bg-white p-8 shadow-2xl rounded-lg transition-all duration-300 hover:skew-x-0 hover:scale-105">
              <h2 className="landing-review--card-name text-3xl font-bold mb-4 text-green-600">
                Ashok Kumar
              </h2>
              <p className="landing-review--card-para text-gray-700 leading-relaxed text-xl">
                "The farmer forums are a game-changer! I’ve learned so much from
                fellow farmers and experts. This platform truly connects and
                empowers the farming community."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
