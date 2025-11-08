import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      setResponseMsg("⚠️ Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setResponseMsg("⚠️ Invalid email address.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/contact-us", form);

      if (res.status === 200) {
        setResponseMsg("✅ Form Submitted Successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      setResponseMsg("❌ Submission failed, try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="border p-3 h-28 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>

        {responseMsg && (
          <p className="text-center mt-4 text-gray-700 font-medium">
            {responseMsg}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
