import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import QualitySection from './components/QualitySection';
import SpecialtiesSection from './components/SpecialtiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Adonis Medical Systems - Excellence In Technology, Dedication in Service';
  }, []);

  return (
    <div className="pt-20">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <QualitySection />
        <SpecialtiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
