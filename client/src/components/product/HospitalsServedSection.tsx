import { useEffect } from 'react';
import { useHospitalsServed } from '../../hooks/useHospitalsServed';
import { getImageUrl } from '../../utils/imageUrl';
import hospitalNameLogo from '../../assets/hospitalname.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HospitalsServedSection() {
  const { hospitals, settings, loading } = useHospitalsServed();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Get background image URL if available
  const backgroundImageUrl = settings?.backgroundImage ? getImageUrl(settings.backgroundImage) : null;
  const sectionStyle = backgroundImageUrl
    ? {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : { backgroundColor: '#F5F5DC' };

  if (loading) {
    return (
      <section className="py-11" style={sectionStyle}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // If no hospitals, show default 4 cards
  const displayHospitals = hospitals.length > 0
    ? hospitals
    : [
        { id: 1, hospitalName: 'Hospital Name', cityState: 'City name, State name', orderIndex: 0 },
        { id: 2, hospitalName: 'Hospital Name', cityState: 'City name, State name', orderIndex: 1 },
        { id: 3, hospitalName: 'Hospital Name', cityState: 'City name, State name', orderIndex: 2 },
        { id: 4, hospitalName: 'Hospital Name', cityState: 'City name, State name', orderIndex: 3 }
      ];

  return (
    <section className="py-11" style={sectionStyle}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-medium text-[#7DC244] text-center mb-12" data-aos="fade-up">
          Hospitals Served
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayHospitals.map((hospital, idx) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="flex items-start gap-4">
                <img
                  src={hospitalNameLogo}
                  alt="Hospital"
                  className="w-12 h-12 flex-shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{hospital.hospitalName}</h3>
                  <p className="text-gray-600 text-sm">{hospital.cityState}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
