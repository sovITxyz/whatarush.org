import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

// Lazy-load below-the-fold sections (loaded as user scrolls down)
const HorseRidingSection = lazy(() => import('@/components/HorseRidingSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const HorseGallery = lazy(() => import('@/components/HorseGallery'));
const LocationSection = lazy(() => import('@/components/LocationSection'));
const MeetTheOwners = lazy(() => import('@/components/MeetTheOwners'));
const AvailableUnitsSection = lazy(() => import('@/components/AvailableUnitsSection'));
const GoogleReview = lazy(() => import('@/components/GoogleReview'));
const Footer = lazy(() => import('@/components/Footer'));

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "What A Rush Riding Stables",
    "description": "Beachfront horseback riding, guided trail rides, horsemanship lessons, and horse therapy sessions in La Libertad, El Salvador.",
    "url": "https://whatarush.org",
    "telephone": "+50369866030",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Libertad",
      "addressCountry": "SV"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.4353125,
      "longitude": -89.1872656
    },
    "image": "https://whatarush.org/images/hero-background.jpg",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Horseback Riding Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guided Trail Rides",
            "description": "Guided trail rides through scenic sugar cane fields, estuaries, and wooded trails."
          },
          "price": "60.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Horse/Human Therapy Sessions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Horsemanship Training Lessons"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Riding Lessons"
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "House of Grace - Palapa Rental",
    "description": "Beachfront palapa rental in La Libertad, El Salvador. Fully furnished with Starlink internet, pool, and beach views.",
    "url": "https://whatarush.org/#available-units",
    "telephone": "+50369866030",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Libertad",
      "addressCountry": "SV"
    },
    "image": "https://whatarush.org/images/property/main%20photo.jpeg",
    "priceRange": "$250-$3700 USD",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Beachfront", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Starlink Internet", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Fully Furnished", "value": true }
    ]
  }
];

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>What A Rush - Beachfront Horseback Riding, Trail Rides & Palapa Rental | La Libertad, El Salvador</title>
        <meta
          name="description"
          content="Experience beachfront horseback riding, guided trail rides, horsemanship lessons, and beachfront palapa rental at What A Rush in La Libertad, El Salvador."
        />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:text-amber-700 focus:font-bold focus:rounded-md focus:shadow-lg">
        Skip to main content
      </a>

      <div id="home" className="scroll-smooth">
        <Navigation />
        <HeroSection />
        <Suspense fallback={null}>
          <div id="main-content"><HorseRidingSection /></div>
          <ServicesSection />
          <HorseGallery />
          <LocationSection
            title="What A Rush Riding Stables is located in Playa Cangrejera El Salvador. Look for the yellow sign!"
            mapUrl="https://maps.app.goo.gl/8DDUbCdor8oBKjEm7"
            image="/images/location/sign.jpeg"
            imageAlt="What A Rush Riding Stables sign at Playa Cangrejera, El Salvador"
          />
          <MeetTheOwners />
          <div className="py-8 text-center bg-gradient-to-b from-amber-50 to-amber-100">
            <Button
              asChild
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <a href="https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested" target="_blank" rel="noopener noreferrer">
                Contact for Booking
              </a>
            </Button>
          </div>
          <AvailableUnitsSection />
          <LocationSection
            title="House of Grace is a living community in El Salvador."
            mapUrl="https://maps.app.goo.gl/hLYVpeWB1gF2EEqm9"
          />
          <GoogleReview />
          <Footer />
        </Suspense>
        <Toaster />
      </div>
    </>
  );
}

export default App;
