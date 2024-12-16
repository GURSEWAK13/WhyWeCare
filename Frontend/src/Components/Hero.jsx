import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../assets/HeroBanner.png";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderImages = [
    {
      url: banner,
      alt: "Volunteering 1",
      showText: false,
      overlay: false,
      isBanner: true  // Add this flag to identify the banner image
    },
    {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3",
      alt: "Volunteering 2",
      showText: true,
      overlay: true,
      isBanner: false
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3",
      alt: "Volunteering 3",
      showText: true,
      overlay: true,
      isBanner: false
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const updatedSettings = {
    ...settings,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Image Slider */}
      <Slider {...updatedSettings} className="h-full">
        {sliderImages.map((image, index) => (
          <div key={index} className="relative h-screen w-full">
            <div className="absolute inset-0">
              <img
                src={image.url}
                alt={image.alt}
                className={`w-full h-full ${image.isBanner ? 'object-fill' : 'object-cover'}`}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: image.isBanner ? 'fill' : 'cover'
                }}
              />
            </div>
            {image.overlay && (
              <div className="absolute inset-0 bg-black/50" />
            )}
          </div>
        ))}
      </Slider>

      {/* Content */}
      <div 
        className={`absolute top-0 left-0 right-0 z-10 h-full flex justify-center items-center px-8 transition-opacity duration-500 ${
          sliderImages[currentSlide].showText ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-4xl text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Join Hands, Spread Care
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Make a difference in your community today. Together, we can create a
            healthier and more compassionate world.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md transition duration-300"
            >
              Find Opportunities
            </a>
            <a
              href="#"
              className="bg-white hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-md transition duration-300"
            >
              Join Us
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .slick-slider,
        .slick-list,
        .slick-track,
        .slick-slide,
        .slick-slide > div {
          height: 100%;
        }
        
        .slick-slide > div {
          width: 100%;
        }
        
        .slick-dots {
          bottom: 25px;
          z-index: 20;
        }
        
        .slick-dots li button:before {
          color: white;
          font-size: 12px;
          opacity: 0.7;
        }
        
        .slick-dots li.slick-active button:before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Hero;