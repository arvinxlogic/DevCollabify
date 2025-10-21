// src/components/Premium.jsx - WITH ERROR HANDLING
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    setIsLoading(true);
    setError("");

    try {
      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        setError("Payment gateway not loaded. Please refresh the page.");
        setIsLoading(false);
        return;
      }

      console.log("Creating order for:", type);
      
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      console.log("Order created:", order.data);

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevConnect",
        description: "Premium Membership",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#3B82F6",
        },
        handler: async function (response) {
          try {
            console.log("Payment response:", response);
            
            const paymentVerification = await axios.post(
              BASE_URL + "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            
            console.log("Verification response:", paymentVerification.data);
            
            if (paymentVerification.data.success) {
              alert("Payment Successful! You are now a premium member.");
              setIsUserPremium(true);
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            setError("Payment verification failed: " + error.message);
          }
        },
        modal: {
          ondismiss: function() {
            console.log("Payment cancelled by user");
            setError("Payment was cancelled");
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response){
        console.error("Payment failed:", response.error);
        setError("Payment failed: " + response.error.description);
        setIsLoading(false);
      });
      
      razorpay.open();
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Error: " + (error.response?.data?.message || error.message));
      setIsLoading(false);
    }
  };

  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="relative text-9xl mb-4">⭐</div>
          </div>

          <h1 className="text-5xl font-bold text-slate-200 mb-4">Premium Member</h1>
          <p className="text-slate-400 text-xl mb-8">You're already enjoying all premium features!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-white font-semibold mb-2">Unlimited Swipes</h3>
              <p className="text-slate-400 text-sm">Connect with unlimited developers</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-white font-semibold mb-2">Priority Chat</h3>
              <p className="text-slate-400 text-sm">Get noticed faster</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">Advanced Filters</h3>
              <p className="text-slate-400 text-sm">Find your perfect match</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="text-white font-semibold mb-2">Premium Badge</h3>
              <p className="text-slate-400 text-sm">Stand out from the crowd</p>
            </div>
          </div>

          <a
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Back to Feed
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-sm font-semibold">
            ⭐ PREMIUM MEMBERSHIP
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-200 mb-4">
          Unlock Premium Features
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Get unlimited access and connect with developers faster
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-red-400 font-semibold">Payment Error</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 6 Month Plan */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">6 Month Plan</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold text-blue-400">₹699</span>
              <span className="text-slate-400">/6 months</span>
            </div>
            <p className="text-teal-400 text-sm mt-2">≈ ₹116 per month</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Unlimited swipes & connections</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Priority messaging</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Advanced search filters</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Premium badge on profile</span>
            </li>
          </ul>

          <button
            onClick={() => handleBuyClick("6-month")}
            disabled={isLoading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {isLoading ? "Processing..." : "Get 6 Months"}
          </button>
        </div>

        {/* 12 Month Plan */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-amber-500/50 p-8 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="px-6 py-2 bg-amber-500 text-black font-bold rounded-full text-sm shadow-lg">
              MOST POPULAR
            </span>
          </div>

          <div className="mb-6 mt-4">
            <h3 className="text-2xl font-bold text-white mb-2">12 Month Plan</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold text-amber-400">₹1199</span>
              <span className="text-slate-400">/year</span>
            </div>
            <p className="text-amber-400 text-sm mt-2">≈ ₹100 per month • Save 14%</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Everything in 6-month plan</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Best value for money</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Early access to new features</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-300">Priority customer support</span>
            </li>
          </ul>

          <button
            onClick={() => handleBuyClick("12-month")}
            disabled={isLoading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {isLoading ? "Processing..." : "Get 12 Months - Best Deal"}
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8">
          <h3 className="text-xl font-bold text-white mb-6">Trusted by Developers Worldwide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-blue-400 mb-2">10K+</p>
              <p className="text-slate-400 text-sm">Premium Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400 mb-2">50K+</p>
              <p className="text-slate-400 text-sm">Connections Made</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400 mb-2">4.8★</p>
              <p className="text-slate-400 text-sm">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
