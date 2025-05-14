import React, { useState } from 'react';
import emailjs from 'emailjs-com'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_6exyd8f',       // e.g., service_xxx
      'template_pydms9t',      // e.g., template_yyy
      formData,
      'mqCbyjuLIlNNXUjsD' // found in EmailJS dashboard
    )
    .then(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      setStatus('Failed to send message. Try again later.');
      console.error(err);
    });
  };

  return (
    <section className="contact-us flex flex-col md:flex-row justify-center bg-gray-100" id="contact">
      {/* About Us Section */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-0 md:pr-12 border-b md:border-b-0 md:border-r border-gray-200 max-w-xl">
        <h2 className="text-4xl font-bold mb-8">About Us</h2>
        <p className="text-lg mb-6 text-gray-700">
          This platform provides a smart and user-friendly Inventory Management System designed to help businesses track stock in real-time, reduce errors, and streamline operations.
        </p>
        <p className="text-lg text-gray-700">
          Our goal is to simplify inventory control and support smarter decision-making for growing businesses.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-xl w-full ">
        <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md" onSubmit={sendEmail}>
          <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
          <p className="text-gray-500 mb-6">You can reach us anytime</p>
          <div className="flex gap-2 mb-4">
            <input type="text" name="name" placeholder="Name" className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md px-4 py-2">
            <input type="email" name="email" placeholder="Your email" className="flex-1 border-none outline-none" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <textarea name="message" value={formData.message} onChange={handleChange} required maxLength={120} placeholder="Your message" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none" rows={3}></textarea>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold">Send</button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;