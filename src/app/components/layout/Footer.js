import React from 'react';
import { FaTiktok, FaGoogle, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-hero-pattern text-white pt-[50px] pb-[50px] p-8 mt-8">
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Icons Column */}
        <div>
        <h2 className='text-center pb-4 pt-2 text-3xl cursor-pointer'>Aj Pizza</h2>
        <div className="flex justify-around items-center">
          <FaGoogle className="text-2xl cursor-pointer" />
          <FaYoutube className="text-2xl cursor-pointer" />
          <FaTwitter className="text-2xl cursor-pointer" />
          <FaInstagram className="text-2xl cursor-pointer" />
          <FaTiktok className="text-2xl cursor-pointer" />
        </div>
        </div>

        {/* Link List Column 1 */}
        <div>
          <ul className="space-y-2">
            <li className='cursor-pointer hover:underline'>FAQ</li>
            <li className='cursor-pointer hover:underline'>Contact Us</li>
            <li className='cursor-pointer hover:underline'>Our Story</li>
            <li className='cursor-pointer hover:underline'>Order Online</li>
          </ul>
        </div>

        {/* Link List Column 2 */}
        <div>
          <ul className="space-y-2 cursor-pointer">
            <li className='cursor-pointer hover:underline'>Careers</li>
            <li className='cursor-pointer hover:underline'>Privacy Policy</li>
            <li className='cursor-pointer hover:underline'>Terms & Conditions</li>
            <li className='cursor-pointer hover:underline'>Franchising</li>
          </ul>
        </div>

        {/* Link List Column 3 */}
        <div>
          <ul className="space-y-2 cursor-pointer">
            <li className='cursor-pointer hover:underline'>Nutrition</li>
            <li className='cursor-pointer hover:underline'>Ingredients Statements</li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
