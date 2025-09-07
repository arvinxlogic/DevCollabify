// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">About DevConnect</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Who We Are</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                DevConnect is a professional networking platform built specifically for developers, 
                by developers. We understand the unique challenges and opportunities in the tech 
                industry and have created a space where developers can connect, collaborate, and 
                grow their careers.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Founded with the mission to bridge the gap between talented developers worldwide, 
                DevConnect serves as a hub for professional networking, skill showcasing, and 
                meaningful connections in the tech community.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                To empower developers by providing a platform where they can showcase their skills, 
                connect with like-minded professionals, and discover new opportunities that advance 
                their careers in technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">Professional Networking</h3>
                  <p className="text-gray-300">Connect with developers worldwide, build meaningful relationships, and expand your professional circle.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">Skill Showcase</h3>
                  <p className="text-gray-300">Create detailed profiles that highlight your technical expertise, projects, and achievements.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">Premium Features</h3>
                  <p className="text-gray-300">Unlock advanced networking capabilities with our Silver and Gold subscription plans.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">Verified Profiles</h3>
                  <p className="text-gray-300">Get verified with our blue tick badge to establish credibility in the developer community.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Why Choose DevConnect?</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Built specifically for the developer community</li>
                <li>User-friendly interface with modern design</li>
                <li>Secure and privacy-focused platform</li>
                <li>Affordable premium plans with valuable features</li>
                <li>Active community of tech professionals</li>
                <li>Regular updates and new features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <h3 className="text-white font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-400 text-sm">Continuously improving to serve our community better</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <h3 className="text-white font-semibold mb-2">Community</h3>
                  <p className="text-gray-400 text-sm">Fostering meaningful connections and collaboration</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="text-white font-semibold mb-2">Privacy</h3>
                  <p className="text-gray-400 text-sm">Protecting user data with highest security standards</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Contact Information</h2>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-blue-400 font-semibold">Website:</span> https://connectdev.online</p>
                  <p><span className="text-blue-400 font-semibold">Email:</span> support@connectdev.online</p>
                  <p><span className="text-blue-400 font-semibold">Platform:</span> Web-based professional networking</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;