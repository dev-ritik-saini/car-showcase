import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Check,
  ArrowRight,
  Map,
} from "lucide-react";
import "./Contact.css";

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      Icon: MapPin,
      title: "Address",
      details: "123 AutoVerse Drive, Car City, CA 90210",
    },
    { Icon: Phone, title: "Phone", details: "+1 (555) 123-4567" },
    { Icon: Mail, title: "Email", details: "hello@autoverse.com" },
    { Icon: Clock, title: "Hours", details: "Mon - Fri: 9AM - 6PM PST" },
  ];

  const socialLinks = [
    { Icon: Facebook, label: "Facebook", url: "#" },
    { Icon: Instagram, label: "Instagram", url: "#" },
    { Icon: Twitter, label: "Twitter", url: "#" },
    { Icon: Youtube, label: "YouTube", url: "#" },
  ];

  const faqs = [
    {
      q: "Can I submit my car to be featured?",
      a: "Yes! Contact us with details and high-quality photos of your vehicle.",
    },
    {
      q: "Are the cars for sale?",
      a: "AutoVerse is a showcase platform. We can connect you with dealerships if interested.",
    },
    {
      q: "How often do you update collections?",
      a: "We add new vehicles and update our collections weekly.",
    },
    {
      q: "Can I use images for personal projects?",
      a: "All images are sourced from Unsplash with proper licensing. Please check individual licenses.",
    },
  ];

  return (
    <div className={`contact-page ${darkMode ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-badge">Get in Touch</span>
          <h1>Contact Us</h1>
          <p>Have questions or feedback? We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main">
        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            {isSubmitted ? (
              <div className="success-message">
                <Check size={32} className="success-icon" />
                <h3>Thank you!</h3>
                <p>
                  Your message has been sent successfully. We'll get back to you
                  soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                  <ArrowRight size={18} className="btn-arrow" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info-wrapper">
            <h2>Contact Information</h2>
            <p className="info-subtitle">
              Reach out to us through any of these channels
            </p>
            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <info.Icon size={24} className="info-icon" />
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    <p>{info.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="social-link"
                    aria-label={social.label}
                  >
                    <social.Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-card">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-placeholder">
          <Map size={48} className="map-icon" />
          <p>Interactive Map Coming Soon</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
