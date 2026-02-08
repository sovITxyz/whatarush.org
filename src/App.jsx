import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HorseRidingSection from '@/components/HorseRidingSection';
import HorseGallery from '@/components/HorseGallery';
import ServicesSection from '@/components/ServicesSection';
import AvailableUnitsSection from '@/components/AvailableUnitsSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

function App() {
  return (
    <>
      <Helmet>
        <title>What A Rush - Beachfront Horseback Riding, Trail Rides & Palapa Rental | La Libertad, El Salvador</title>
        <meta
          name="description"
          content="Experience beachfront horseback riding, guided trail rides, horsemanship lessons, and beachfront palapa rental at What A Rush in La Libertad, El Salvador."
        />
      </Helmet>

      <div id="home" className="scroll-smooth">
        <Navigation />
        <HeroSection />
        <HorseRidingSection />
        <ServicesSection />
        <LocationSection
          title="What A Rush Riding Stables is located in Playa Cangrejera El Salvador. Look for the yellow sign!"
          mapUrl="https://maps.app.goo.gl/8DDUbCdor8oBKjEm7"
          image="/images/added/sign.jpeg"
        />
        <HorseGallery />
        <div className="py-8 text-center bg-gradient-to-b from-amber-50 to-amber-100">
          <Button
            onClick={() => window.open('https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested', '_blank')}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            Contact for Booking
          </Button>
        </div>
        <AvailableUnitsSection />
        <LocationSection
          title="House of Grace is a living community in El Salvador."
          mapUrl="https://maps.app.goo.gl/hLYVpeWB1gF2EEqm9"
        />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
