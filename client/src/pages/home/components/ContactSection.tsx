import { getDefaultImageUrl } from '../../../utils/imageUrl';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Contact Us</h2>
            
            <form className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="Your name"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Id
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="your@email.com"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  id="mobile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="Your mobile number"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div data-aos="fade-up" data-aos-delay="500">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#0066CC] text-white font-medium rounded-md hover:bg-[#0052A3] transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8" data-aos="fade-up">
            <div>
              <h5 className="text-xl font-bold text-gray-900 mb-4">ADONIS MEDICAL SYSTEMS PVT LTD</h5>
              <p className="text-gray-700 leading-relaxed">
                E-70, PHASE- VIII, INDUSTRIAL AREA,<br />
                MOHALI, 160071.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="100">
                <i className="ri-phone-line text-[#0066CC] text-xl"></i>
                <a href="tel:9872003273" className="text-gray-700 hover:text-[#0066CC] transition-colors duration-300">
                  9872003273
                </a>
              </div>

              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="200">
                <i className="ri-mail-line text-[#0066CC] text-xl"></i>
                <a href="mailto:support@adonismedical.com" className="text-gray-700 hover:text-[#0066CC] transition-colors duration-300">
                  support@adonismedical.com
                </a>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <img
                src={getDefaultImageUrl('2024/09/Frame-118.jpg')}
                alt="Contact us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
