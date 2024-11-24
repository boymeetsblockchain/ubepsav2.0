"use client";
import { Mail, MapPin, Facebook, Instagram } from "lucide-react";

function ContactPage() {
  return (
    <div className="flex  w-full flex-col items-center bg-gray-50 text-gray-800 py-16">
      {/* Header */}
      <div className="w-full text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-ubepsa">
          Get in Touch
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          We’d love to hear from you! Reach out to us anytime.
        </p>
      </div>

      {/* Contact Details */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {/* Contact Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer flex flex-col items-center text-center space-y-4">
          <Mail className="h-8 w-8 text-ubepsa" />
          <h2 className="text-lg font-bold">Email Us</h2>
          <p className="text-sm text-gray-600">ubepsaeditorial@gmail.com</p>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-lg shadow-lg p-6  cursor-pointer flex flex-col items-center text-center space-y-4">
          <MapPin className="h-8 w-8 text-ubepsa" />
          <h2 className="text-lg font-bold">Visit Us</h2>
          <p className="text-sm text-gray-600">
            9JVF+PM3, Uniben Road, Uselu, Benin City 300103, Edo
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div className="w-full max-w-4xl mt-10 flex flex-row   justify-center items-center space-x-6">
        <a
          href="https://www.instagram.com/trippicker.ng?igsh=am80bGd1ZzlqNzRy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white shadow-lg rounded-full h-12 w-12 hover:shadow-xl hover:bg-gray-100 transition"
        >
          <Instagram className="h-6 w-6 text-ubepsa" />
        </a>
        <a
          href="https://www.facebook.com/share/T39dDJsUD1Whqo9E/?mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white shadow-lg rounded-full h-12 w-12 hover:shadow-xl hover:bg-gray-100 transition"
        >
          <Facebook className="h-6 w-6 text-ubepsa" />
        </a>
      </div>
    </div>
  );
}

export default ContactPage;
