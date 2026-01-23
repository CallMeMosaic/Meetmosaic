import React, { useState } from 'react';
import { Mail, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative bg-blue-600">
      {/* Contact Form Section */}
      <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
        <div className="max-w-2xl w-full">
          <h2 className="text-5xl md:text-7xl font-light text-white mb-4 text-center">
            Get In Touch
          </h2>
          <p className="text-xl text-white/70 mb-12 text-center">
            Interested in working together? Let's connect!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white/80 mb-2 text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white/80 mb-2 text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white/80 mb-2 text-lg">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-medium text-lg rounded-lg hover:bg-white/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center space-x-8 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:contact@mosaic.com"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={28} />
            </a>
          </div>

          {/* Footer Text */}
          <div className="text-center space-y-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Mosaic. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#impressum" className="text-white/60 hover:text-white transition-colors">
                Impressum
              </a>
              <span className="text-white/30">|</span>
              <a href="#privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/30">|</span>
              <a href="#terms" className="text-white/60 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
