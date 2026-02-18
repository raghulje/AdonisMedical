import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import QualitySection from './components/QualitySection';
import SpecialtiesSection from './components/SpecialtiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import SEO from '../../components/seo/SEO';
import { getSEOConfig, getOrganizationStructuredData, getWebSiteStructuredData } from '../../utils/seoConfig';

const HomePage = () => {
  const seoConfig = getSEOConfig('/');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        {...seoConfig}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            getOrganizationStructuredData(),
            getWebSiteStructuredData(),
          ],
        }}
      />
      <div className="pt-16 sm:pt-20">
        <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <QualitySection />
        <SpecialtiesSection />
        <TestimonialsSection />
        <ContactUsSection />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default HomePage;
