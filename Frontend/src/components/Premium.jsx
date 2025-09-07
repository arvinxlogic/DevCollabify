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
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-900 border-2 border-green-500 rounded-lg p-8">
            <h1 className="text-4xl font-bold text-green-300 mb-4">🎉 Premium Member</h1>
            <p className="text-xl text-green-200">
              You're already a premium user! Enjoy all the exclusive features.
            </p>
            <div className="mt-6">
              <span className="bg-green-600 text-white px-6 py-2 rounded-full text-lg font-semibold">
                ✓ Active Premium Account
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock premium features and expand your professional network with our subscription plans
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {/* Silver Plan */}
          <div className="bg-gray-900 rounded-lg border-2 border-blue-500 p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                POPULAR
              </span>
            </div>
            <h3 className="text-3xl font-bold text-blue-400 mb-6">Silver Membership</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">₹349</span>
              <span className="text-gray-400">/3 months</span>
            </div>
            <ul className="text-gray-300 space-y-3 mb-8 text-left">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Chat with other developers
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                100 connection requests per day
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Verified blue tick badge
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Priority profile visibility
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                3 months access
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Email support
              </li>
            </ul>
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              onClick={() => handleBuyClick('silver')}
            >
              Buy Silver Membership
            </button>
            <p className="text-gray-400 text-sm mt-3">≈ ₹116 per month</p>
          </div>

          {/* Gold Plan */}
          <div className="bg-gray-900 rounded-lg border-2 border-yellow-500 p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                BEST VALUE
              </span>
            </div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-6">Gold Membership</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">₹599</span>
              <span className="text-gray-400">/6 months</span>
            </div>
            <ul className="text-gray-300 space-y-3 mb-8 text-left">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Chat with other developers
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Unlimited connection requests per day
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Premium verification badge
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Featured profile placement
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                6 months access
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Priority customer support
              </li>
            </ul>
            <button 
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              onClick={() => handleBuyClick('gold')}
            >
              Buy Gold Membership
            </button>
            <p className="text-gray-400 text-sm mt-3">≈ ₹100 per month</p>
          </div>
        </div>

        {/* NO REFUNDS POLICY */}
        <div className="bg-gray-900 border-2 border-red-300 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-300 mb-3 text-center flex items-center justify-center">
            <span className="mr-3">⚠️</span>
            No Refunds Policy
          </h2>
          <div className="text-center">
            <p className="text-red-200 font-semibold mb-2">
              All payments are final and non-refundable
            </p>
            <p className="text-red-100 text-sm">
              Please choose your plan carefully before making the payment.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 inline-block">
            <p className="text-gray-300 text-sm flex items-center">
              <span className="mr-2">🔒</span>
              Secure payments powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;