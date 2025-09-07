import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Privacy Policy</h1>
          
          <div className="text-gray-300 space-y-6">
            <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 mb-6">
              <p className="text-blue-300 text-sm">
                <strong>Last Updated:</strong> January 2025 • <strong>Effective Date:</strong> January 2025
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to DevConnect ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website 
                <span className="text-blue-400"> https://connectdev.online</span> and use our services.
              </p>
              <p>
                By using DevConnect, you consent to the data practices described in this policy. 
                If you do not agree with the practices described here, you should not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Information We Collect</h2>
              
              <div className="ml-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.1 Personal Information</h3>
                  <p className="mb-2">We collect information you provide directly to us, including:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Name, email address, and contact information</li>
                    <li>Profile information (skills, experience, bio, photos)</li>
                    <li>Account credentials and authentication data</li>
                    <li>Payment information (processed securely through Razorpay)</li>
                    <li>Communication data (messages, connection requests)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.2 Automatically Collected Information</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, features used)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Location data (general geographic location based on IP)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.3 Third-Party Information</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Information from social media platforms (if you connect accounts)</li>
                    <li>Payment processing data from Razorpay</li>
                    <li>Analytics data from service providers</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Provision:</strong> Create and maintain your account, provide networking features</li>
                <li><strong>Communication:</strong> Send notifications, updates, and respond to inquiries</li>
                <li><strong>Payment Processing:</strong> Process subscription payments and manage billing</li>
                <li><strong>Personalization:</strong> Customize your experience and show relevant connections</li>
                <li><strong>Security:</strong> Monitor for suspicious activity and prevent fraud</li>
                <li><strong>Analytics:</strong> Improve our services and understand user behavior</li>
                <li><strong>Legal Compliance:</strong> Meet legal obligations and enforce terms of service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information in the following circumstances:</p>
              
              <div className="ml-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">With Other Users</h3>
                  <p>Profile information you choose to make public is visible to other DevConnect users.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Service Providers</h3>
                  <p>We share data with trusted third parties who help us operate our services (payment processing, email services, analytics).</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Legal Requirements</h3>
                  <p>We may disclose information when required by law, court order, or government request.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Business Transfers</h3>
                  <p>In case of merger, acquisition, or sale of assets, user information may be transferred.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Data Security</h2>
              <p className="mb-4">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure payment processing through Razorpay</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p className="mt-4 text-yellow-300">
                <strong>Note:</strong> No method of internet transmission or electronic storage is 100% secure. 
                While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Remember your login status and preferences</li>
                <li>Analyze usage patterns and improve our services</li>
                <li>Provide personalized content and features</li>
                <li>Measure advertising effectiveness</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences. However, 
                disabling cookies may limit some functionality of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">7. Your Rights and Choices</h2>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Export your data in a readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <span className="text-blue-400">support@connectdev.online</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">8. Data Retention</h2>
              <p className="mb-2">We retain your information for as long as necessary to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide you with our services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="mt-4">
                When you delete your account, we will delete or anonymize your personal information 
                within 30 days, except where we're required to retain it by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">10. Children's Privacy</h2>
              <p>
                DevConnect is not intended for use by children under 18 years of age. We do not 
                knowingly collect personal information from children under 18. If we become aware 
                that we have collected such information, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. When we do, we will:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Post the updated policy on our website</li>
                <li>Update the "Last Updated" date</li>
                <li>Notify users of significant changes via email or platform notification</li>
              </ul>
              <p className="mt-4">
                Your continued use of DevConnect after changes become effective constitutes 
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">12. Contact Information</h2>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p className="mb-4">If you have questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <span className="text-blue-400">support@connectdev.online</span></p>
                  <p><strong>Website:</strong> <span className="text-blue-400">https://connectdev.online</span></p>
                  <p><strong>Subject Line:</strong> "Privacy Policy Inquiry"</p>
                </div>
                <p className="mt-4 text-gray-400 text-sm">
                  We will respond to your privacy-related inquiries within 30 days of receipt.
                </p>
              </div>
            </section>

            <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 mt-8">
              <p className="text-blue-300 text-sm">
                <strong>Disclaimer:</strong> This privacy policy is designed to be compliant with general 
                data protection regulations. For specific legal advice, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;