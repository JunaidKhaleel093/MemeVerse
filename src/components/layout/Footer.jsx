import React from "react";
import { Link } from "react-router-dom";
import { Flame, Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2e003e] via-[#6a0dad] to-[#8a2be2] text-gray-200 text-sm">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo & Socials */}
        <div className="flex items-center space-x-2">
          <Flame size={20} className="text-purple-500" />
          <span className="text-lg text-white font-semibold">MemeVerse</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/trending" className="hover:text-white">Trending</Link>
          <Link to="/upload" className="hover:text-white">Upload</Link>
          <Link to="/search" className="hover:text-white">Search</Link>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/JunaidKhaleel093" className="hover:text-white"><Github size={18} /></a>
          <a href="https://x.com/JunaidKhaleel96" className="hover:text-white"><Twitter size={18} /></a>
          <a href="https://www.instagram.com/mohammed_junaid_khaleel" className="hover:text-white"><Instagram size={18} /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-800 mt-4 py-4">
        &copy; {new Date().getFullYear()} MemeVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
