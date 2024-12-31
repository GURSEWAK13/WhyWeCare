import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
      <div className="relative bg-blue-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-black opacity-90">
          {/* Simple dot pattern using pseudo-elements */}
          <div className="absolute inset-0 opacity-20 bg-grid-slate-100/[0.05]"></div>
        </div>
  
        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              <span className="block">WhyWeCare</span>
              <span className="block text-2xl md:text-3xl font-medium text-blue-200 mt-2">
                Making a Difference, One Life at a Time
              </span>
            </h1>
  
            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100 mb-10">
              We are dedicated to creating positive change through compassion, 
              commitment, and community action. Join us in building a better world for everyone.
            </p>
  
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl">
              <a href="/donate" className="hover:text-gray-400">Donate Now</a>
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-200">
              <a href="/termsAndConditions" className="hover:text-gray-400">Get Involved</a>

              </button>
            </div>
  
            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">1000+</div>
                <div className="text-blue-200 mt-1">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
                <div className="text-blue-200 mt-1">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">100+</div>
                <div className="text-blue-200 mt-1">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">25+</div>
                <div className="text-blue-200 mt-1">Communities</div>
              </div>
            </div>
  
            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-6 items-center">
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white backdrop-blur-sm">
                ★★★★★ Charity Navigator
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white backdrop-blur-sm">
                Certified Non-Profit
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white backdrop-blur-sm">
                Tax ID: 501(c)(3)
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16 fill-current text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,123.11,111.17,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
    );
  };
  
  export default HeroSection;