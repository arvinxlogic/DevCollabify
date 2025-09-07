// src/components/TermsConditions.jsx
import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Terms and Conditions</h1>
          
          <div className="text-gray-300 space-y-6">
            <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 mb-6">
              <p className="text-blue-300 text-sm">
                <strong>Last Updated:</strong> January 2025 • <strong>Effective Date:</strong> January 2025
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using DevConnect ("the Service") at <span className="text-blue-400">https://connectdev.online</span>, 
                you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to these terms, you should not use this service.
              </p>
              <p>
                These Terms of Service ("Terms") govern your use of our website and services provided by 
                DevConnect ("we," "us," or "our").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Description of Service</h2>
              <p className="mb-4">
                DevConnect is a professional networking platform designed for developers to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Create professional profiles and showcase skills</li>
                <li>Connect with other developers and tech professionals</li>
                <li>Send and receive connection requests</li>
                <li>Chat with connections (premium feature)</li>
                <li>Access premium features through paid subscriptions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. User Accounts and Registration</h2>
              
              <div className="ml-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">3.1 Account Creation</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>You must provide accurate and complete registration information</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must be at least 18 years old to create an account</li>
                    <li>One person may only maintain one account at a time</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">3.2 Account Security</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>We are not liable for any loss or damage from unauthorized account access</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Subscription Plans and Payments</h2>
              
              <div className="ml-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.1 Premium Plans</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>Silver Plan (₹199/3 months):</strong> Chat features, 100 requests/day, verification badge</li>
                    <li><strong>Gold Plan (₹299/6 months):</strong> Unlimited chat, unlimited requests, premium verification</li>
                    <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.2 Payment Terms</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Payments are processed securely through Razorpay</li>
                    <li>Subscriptions are billed in advance for the entire subscription period</li>
                    <li>No automatic renewals - you must manually renew your subscription</li>
                    <li>All sales are final subject to our refund policy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.3 Service Access</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Premium features are activated immediately upon successful payment</li>
                    <li>Access continues for the full subscription period</li>
                    <li>After expiration, your account reverts to the free plan</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. User Conduct and Acceptable Use</h2>
              
              <div className="ml-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.1 Acceptable Use</h3>
                  <p className="mb-2">You agree to use DevConnect only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Post false, inaccurate, or misleading information</li>
                    <li>Impersonate another person or entity</li>
                    <li>Upload content that is offensive, harmful, or inappropriate</li>
                    <li>Spam, harass, or abuse other users</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use automated tools to access or interact with the service</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.2 Content Guidelines</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Keep profile information professional and accurate</li>
                    <li>Respect intellectual property rights</li>
                    <li>Do not post copyrighted material without permission</li>
                    <li>Maintain respectful communication with other users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.3 Consequences of Violations</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Warning or temporary suspension of account</li>
                    <li>Permanent termination of account</li>
                    <li>Legal action if required by law</li>
                    <li>No refund of subscription fees for terminated accounts</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Intellectual Property Rights</h2>
              
              <div className="ml-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Our Content</h3>
                  <p>All content, features, and functionality of DevConnect are owned by us and protected by copyright, trademark, and other intellectual property laws.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">User Content</h3>
                  <p>You retain ownership of content you post, but grant us a license to use, display, and distribute your content on our platform.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Restrictions</h3>
                  <p>You may not reproduce, distribute, modify, or create derivative works from our content without express written permission.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">7. Privacy and Data Protection</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our 
                <span className="text-blue-400"> Privacy Policy</span>, which is incorporated into these Terms by reference.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>We collect information necessary to provide our services</li>
                <li>We implement security measures to protect your data</li>
                <li>We do not sell your personal information to third parties</li>
                <li>You can request deletion of your account and data at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">8. Service Availability and Modifications</h2>
              
              <div className="ml-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Service Availability</h3>
                  <p>We strive to provide reliable service but cannot guarantee 100% uptime. We may perform maintenance that temporarily affects service availability.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Service Modifications</h3>
                  <p>We reserve the right to modify, suspend, or discontinue any aspect of the service with or without notice.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Feature Changes</h3>
                  <p>Premium features and pricing may be modified. Existing subscribers will be notified of significant changes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">9. Termination</h2>
              
              <div className="ml-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Termination by You</h3>
                  <p>You may delete your account at any time through your account settings or by contacting support.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Termination by Us</h3>
                  <p>We may terminate your account for violations of these Terms, illegal activity, or at our sole discretion.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Effect of Termination</h3>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Immediate loss of access to the service</li>
                    <li>Deletion of your account and associated data</li>
                    <li>No refund of remaining subscription period</li>
                    <li>Survival of certain provisions (payment obligations, disclaimers)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">10. Disclaimers and Limitation of Liability</h2>
              
              <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-4">
                <p className="text-yellow-300 text-sm font-semibold">
                  IMPORTANT LEGAL NOTICE - PLEASE READ CAREFULLY
                </p>
              </div>

              <div className="ml-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Service "As Is"</h3>
                  <p>The service is provided "as is" without warranties of any kind, either express or implied.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Limitation of Liability</h3>
                  <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Maximum Liability</h3>
                  <p>Our total liability to you shall not exceed the amount you paid for the service in the 12 months preceding the claim.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">11. Governing Law and Disputes</h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>These Terms are governed by the laws of India</li>
                <li>Any disputes will be resolved in the courts of India</li>
                <li>We encourage resolution of disputes through direct communication first</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">12. Changes to Terms</h2>
              <p className="mb-4">We may modify these Terms at any time by:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Posting updated Terms on our website</li>
                <li>Updating the "Last Updated" date</li>
                <li>Notifying users of material changes via email or platform notification</li>
              </ul>
              <p className="mt-4">
                Continued use of the service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">13. Contact Information</h2>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p className="mb-4">For questions about these Terms and Conditions, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <span className="text-blue-400">support@connectdev.online</span></p>
                  <p><strong>Website:</strong> <span className="text-blue-400">https://connectdev.online</span></p>
                  <p><strong>Subject Line:</strong> "Terms and Conditions Inquiry"</p>
                </div>
                <p className="mt-4 text-gray-400 text-sm">
                  We will respond to your inquiries within 48 hours during business days.
                </p>
              </div>
            </section>

            <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 mt-8">
              <p className="text-blue-300 text-sm">
                <strong>Disclaimer:</strong> These terms and conditions are provided for general guidance. 
                For specific legal matters, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;