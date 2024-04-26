import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 w-96">
          Full Name
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            minLength={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 pl-2"
          />
        </label>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-96">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 pl-2"
          />
        </label>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            minLength={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 pl-2"
          />
        </label>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={3}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2"
          />
        </label>
        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-96 mx-auto">
          Send Message
        </button>
      </form>
    </div>
  );
}
