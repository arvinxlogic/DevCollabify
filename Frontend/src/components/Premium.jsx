// src/components/Premium.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Error verifying premium status:", error);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Connect",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#06b6d4",
        },
        handler: async function (response) {
          try {
            const paymentVerification = await axios.post(
              BASE_URL + "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            if (paymentVerification.data.success) {
              alert("Payment Successful! You are now a premium member.");
              setIsUserPremium(true);
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="relative text-9xl mb-4">⭐</div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
            Premium Member
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            You're already enjoying all premium features!
          </p>

          {/* Premium Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-yellow-500/20 p-6">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-white font-semibold mb-2">Unlimited Swipes</h3>
              <p className="text-gray-400 text-sm">Connect with unlimited developers</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-yellow-500/20 p-6">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-white font-semibold mb-2">Priority Chat</h3>
              <p className="text-gray-400 text-sm">Get noticed faster</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-yellow-500/20 p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">Advanced Filters</h3>
              <p className="text-gray-400 text-sm">Find your perfect match</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-yellow-500/20 p-6">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="text-white font-semibold mb-2">Premium Badge</h3>
              <p className="text-gray-400 text-sm">Stand out from the crowd</p>
            </div>
          </div>

          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Back to Feed
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-sm font-semibold">
            ⭐ PREMIUM MEMBERSHIP
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
          Unlock Premium Features
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Get unlimited access and connect with developers faster
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 6 Month Plan */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-cyan-500/20 p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">6 Month Plan</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ₹699
              </span>
              <span className="text-gray-400">/6 months</span>
            </div>
            <p className="text-cyan-400 text-sm mt-2">≈ ₹116 per month</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Unlimited swipes & connections</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Priority messaging</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Advanced search filters</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Premium badge on profile</span>
            </li>
          </ul>

          <button
            onClick={() => handleBuyClick("6-month")}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Get 6 Months
          </button>
        </div>

        {/* 12 Month Plan - Popular */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-yellow-500/50 p-8 shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300">
          {/* Popular Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full text-sm shadow-lg">
              MOST POPULAR
            </span>
          </div>

          <div className="mb-6 mt-4">
            <h3 className="text-2xl font-bold text-white mb-2">12 Month Plan</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                ₹1199
              </span>
              <span className="text-gray-400">/year</span>
            </div>
            <p className="text-yellow-400 text-sm mt-2">≈ ₹100 per month • Save 14%</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Everything in 6-month plan</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Best value for money</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Early access to new features</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Priority customer support</span>
            </li>
          </ul>

          <button
            onClick={() => handleBuyClick("12-month")}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/50"
          >
            Get 12 Months - Best Deal
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-cyan-500/20 p-8">
          <h3 className="text-xl font-bold text-white mb-6">Trusted by Developers Worldwide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-cyan-400 mb-2">10K+</p>
              <p className="text-gray-400 text-sm">Premium Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400 mb-2">50K+</p>
              <p className="text-gray-400 text-sm">Connections Made</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400 mb-2">4.8★</p>
              <p className="text-gray-400 text-sm">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
