import React from 'react';
import { Heading } from '../common/Typography';
import Background from '../common/Background';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Background variant="white" className="sticky top-0 z-50 shadow-[-6px_-2px_12px_0px_rgba(0,0,0,0.04),6px_12px_12px_0px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="DriveShpere Logo" 
              className="h-9 w-auto"
            />
            <Heading className="text-[#1A1A1A] text-[22px]" as="h1">
              DriveShpere
            </Heading>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#9370DB]">
              Home
            </Link>
            <Link to="/" className="text-[#9370DB] border-b-2 border-[#9370DB] pb-1">
              Car Library
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-[#9370DB]">
              Services
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-[#9370DB]">
              Special Offers
            </Link>
            <Link to="/recycle-bin" className="text-gray-700 hover:text-[#9370DB]">
              Recycle Bin
            </Link>
          </div>
          
          {/* Contact Us Button */}
          <Button
            variant="primary"
            className="rounded-full"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </Background>
  );
};

export default Header;
