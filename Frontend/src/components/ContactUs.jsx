// src/components/ContactUs.jsx
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using EmailJS SDK method instead of direct API
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'arvindsinghq05@gmail.com'
      };

      // Direct fetch to EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_6jej2cu',
          template_id: 'template_ja2vu47',
          user_id: 'BaEsrgDyGjkDj-Nvb',
          template_params: templateParams
        })
      });

      console.log('EmailJS Response Status:', response.status);
      
      if (response.status === 200) {
        alert('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorText = await response.text();
        console.error('EmailJS Error Response:', errorText);
        
        // Fallback to mailto
        const mailtoLink = `mailto:arvindsinghq05@gmail.com?subject=${encodeURIComponent(`ConnectDev Contact: ${formData.subject}`)}&body=${encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
        `)}`;
        
        window.location.href = mailtoLink;
        alert('Opening email client as fallback...');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback to mailto
      const mailtoLink = `mailto:arvindsinghq05@gmail.com?subject=${encodeURIComponent(`ConnectDev Contact: ${formData.subject}`)}&body=${encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
      `)}`;
      
      window.location.href = mailtoLink;
      alert('Opening email client as fallback...');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Have questions, suggestions, or need support? We're here to help! 
                Reach out to us using the information below or fill out the contact form.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <span className="text-blue-400 mr-2">📧</span>
                    Email Support
                  </h3>
                  <p className="text-gray-300">arvindsinghq05@gmail.com</p>
                  <p className="text-gray-400 text-sm mt-1">Response time: 24-48 hours</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <span className="text-blue-400 mr-2">🌐</span>
                    Website
                  </h3>
                  <p className="text-gray-300">https://connectdev.online</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <span className="text-blue-400 mr-2">📱</span>
                    Business Hours
                  </h3>
                  <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                  <p className="text-gray-300">Saturday - Sunday: 10:00 AM - 4:00 PM (IST)</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <span className="text-blue-400 mr-2">🏢</span>
                    Business Address
                  </h3>
                  <p className="text-gray-300">
                    DevConnect Platform<br />
                    Online Service Provider<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-400 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-400 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-400 focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Report a Bug</option>
                    <option value="account">Account Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-400 focus:outline-none"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-2">How do I upgrade to premium?</h3>
                <p className="text-gray-400 text-sm">Visit our Pricing page to choose between Silver (3 months) or Gold (6 months) plans and complete the payment process.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-2">Can I cancel my subscription?</h3>
                <p className="text-gray-400 text-sm">Yes, you can cancel anytime. Please check our Refund Policy for details on cancellation terms.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-2">How do I get verified?</h3>
                <p className="text-gray-400 text-sm">The blue tick verification badge is included with both Silver and Gold premium plans.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-2">Technical issues?</h3>
                <p className="text-gray-400 text-sm">Please email us at arvindsinghq05@gmail.com with details about the issue you're experiencing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;