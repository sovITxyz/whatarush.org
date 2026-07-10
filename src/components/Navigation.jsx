import React, { useState, useEffect } from 'react';
import { Menu, X, Home as HomeIcon, User, Sparkles, Camera, Users, Building, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { PHONE_TEL, whatsappUrl } from '@/lib/contact';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', icon: HomeIcon, sectionId: 'home' },
    { name: 'Horses', icon: User, sectionId: 'horse-riding' },
    { name: 'Services', icon: Sparkles, sectionId: 'services' },
    { name: 'Gallery', icon: Camera, sectionId: 'horse-gallery' },
    { name: 'Owners', icon: Users, sectionId: 'meet-the-owners' },
    { name: 'Rental', icon: Building, sectionId: 'available-units' }
  ];

  return (
    <nav
      className={`animate-nav-slide-down fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-white/20 shadow-2xl ${
        isScrolled
          ? 'bg-white/15'
          : 'bg-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
          >
            House of Grace
          </a>

          {/* Desktop Navigation (shown at xl+: below that the row can't fit the
              nav links plus both the Call and WhatsApp pills, so we use the
              hamburger menu instead) */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.sectionId}`}
                onClick={(e) => scrollToSection(e, link.sectionId)}
                className="flex items-center gap-2 font-medium transition-all duration-300 group"
              >
                <link.icon className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-teal-700 group-hover:to-cyan-700">
                  {link.name}
                </span>
              </a>
            ))}
            
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <a href={PHONE_TEL} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              </Button>
              <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-white/90' : 'text-white'
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="animate-mobile-menu-in xl:hidden mt-4 py-4 border-t border-gray-200"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.sectionId}`}
                  onClick={(e) => scrollToSection(e, link.sectionId)}
                  className="flex items-center gap-2 font-medium transition-all py-2 group"
                >
                  <link.icon className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
                  <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-teal-700 group-hover:to-cyan-700">
                    {link.name}
                  </span>
                </a>
              ))}
              
              <Button
                asChild
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-2 rounded-full w-full"
              >
                <a href={PHONE_TEL} className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </Button>

              <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-full w-full"
              >
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;