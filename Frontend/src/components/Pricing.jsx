// src/components/Pricing.jsx - Updated with New Pricing
import React from 'react';

const Pricing = () => {
  const handlePlanSelect = (planType) => {
    // This will be connected to your own payment integration
    alert(`Redirecting to payment for ${planType} plan...`);
    // Add your payment integration here
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock premium features and expand your professional network with our affordable subscription plans
          </p>
        </div>

        {/* Free vs Premium Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-400 mb-8 text-center">Free vs Premium Features</h2>
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Free Plan</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>✅ Create profile</li>
                  <li>✅ Browse developers</li>
                  <li>✅ Limited connections</li>
                  <li>❌ No chat feature</li>
                  <li>❌ Limited requests per day</li>
                  <li>❌ No verification badge</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Silver Plan</h3>
                <ul className="text-blue-300 space-y-2">
                  <li>✅ All Free features</li>
                  <li>✅ Chat with other users</li>
                  <li>✅ 100 requests per day</li>
                  <li>✅ Verified blue tick badge</li>
                  <li>✅ Priority profile visibility</li>
                  <li>✅ 3 months access</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Gold Plan</h3>
                <ul className="text-yellow-300 space-y-2">
                  <li>✅ All Silver features</li>
                  <li>✅ Unlimited chat</li>
                  <li>✅ Unlimited requests per day</li>
                  <li>✅ Premium blue tick badge</li>
                  <li>✅ Featured profile</li>
                  <li>✅ 6 months access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Free Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">₹0</span>
              <span className="text-gray-400">/forever</span>
            </div>
            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✅ Basic profile creation</li>
              <li>✅ Browse developer profiles</li>
              <li>✅ Send limited connection requests</li>
              <li>❌ No chat functionality</li>
              <li>❌ No verification badge</li>
            </ul>
            <button 
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              onClick={() => alert('You are already on the free plan!')}
            >
              Current Plan
            </button>
          </div>

          {/* Silver Plan */}
          <div className="bg-gray-900 rounded-lg border-2 border-blue-500 p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Silver Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">₹349</span>
              <span className="text-gray-400">/3 months</span>
            </div>
            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✅ All Free plan features</li>
              <li>✅ <span className="text-blue-400 font-semibold">Chat with other developers</span></li>
              <li>✅ <span className="text-blue-400 font-semibold">100 connection requests/day</span></li>
              <li>✅ <span className="text-blue-400 font-semibold">Verified blue tick badge</span></li>
              <li>✅ Priority profile visibility</li>
              <li>✅ Email support</li>
            </ul>
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              onClick={() => handlePlanSelect('Silver')}
            >
              Choose Silver Plan
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
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Gold Plan</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">₹599</span>
              <span className="text-gray-400">/6 months</span>
            </div>
            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✅ All Silver plan features</li>
              <li>✅ <span className="text-yellow-400 font-semibold">Unlimited chat messages</span></li>
              <li>✅ <span className="text-yellow-400 font-semibold">Unlimited connection requests</span></li>
              <li>✅ <span className="text-yellow-400 font-semibold">Premium verification badge</span></li>
              <li>✅ Featured profile placement</li>
              <li>✅ Priority customer support</li>
            </ul>
            <button 
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              onClick={() => handlePlanSelect('Gold')}
            >
              Choose Gold Plan
            </button>
            <p className="text-gray-400 text-sm mt-3">≈ ₹100 per month</p>
          </div>
        </div>

        {/* NO REFUNDS POLICY - CLEAR STATEMENT */}
        <div className="bg-red-900 border-2 border-red-600 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-red-300 mb-4 text-center flex items-center justify-center">
            <span className="mr-3">⚠️</span>
            No Refunds Policy
          </h2>
          <div className="text-center space-y-3">
            <p className="text-red-200 text-lg font-semibold">
              All payments are final and non-refundable
            </p>
            <p className="text-red-100">
              Once your subscription is activated, we do not provide refunds under any circumstances. 
              Please choose your plan carefully before making the payment.
            </p>
            <div className="bg-red-800 p-4 rounded-lg mt-4">
              <p className="text-red-100 text-sm">
                <strong>Why No Refunds?</strong> This policy helps us keep our subscription prices low 
                and maintain the quality of our platform. All premium features are immediately activated 
                upon payment and remain available for the full subscription period.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Pricing FAQ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">💳 What payment methods do you accept?</h3>
              <p className="text-gray-300 text-sm mb-4">We accept all major credit/debit cards, UPI, net banking, and digital wallets through Razorpay secure payment gateway.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">🔄 Can I upgrade my plan?</h3>
              <p className="text-gray-300 text-sm mb-4">Yes, you can upgrade from Silver to Gold anytime. The price difference will be calculated and charged accordingly.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">💰 Do you offer refunds?</h3>
              <p className="text-gray-300 text-sm mb-4"><strong className="text-red-400">No, we do not offer refunds.</strong> All sales are final once the subscription is activated.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">🔒 Is my payment information secure?</h3>
              <p className="text-gray-300 text-sm mb-4">Absolutely! We use Razorpay's secure payment processing. Your payment data is encrypted and we never store your card details.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">📧 What happens when my plan expires?</h3>
              <p className="text-gray-300 text-sm mb-4">Your account will revert to the free plan. You'll lose premium features but keep all your connections and profile data.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">🎯 Which plan should I choose?</h3>
              <p className="text-gray-300 text-sm mb-4">Silver is great for regular networking. Gold offers the best value for power users who want unlimited networking capabilities.</p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="text-center mt-12">
          <div className="bg-orange-900 border border-orange-600 rounded-lg p-6 inline-block max-w-2xl">
            <h3 className="text-orange-300 font-semibold mb-2 flex items-center justify-center">
              <span className="mr-2">📋</span>
              Important Notice
            </h3>
            <p className="text-orange-200 text-sm">
              Please review all plan features carefully before purchasing. 
              <strong> All sales are final</strong> and subscriptions cannot be cancelled for a refund. 
              Your premium features will remain active for the entire subscription period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;