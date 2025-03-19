import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: "Kashvi jain",
    message: "E-Cell has been an incredible space where ideas turn into action. It empowers dreamers to become achievers, pushing each other forward and turning visions into reality. Glad to be part of this journey..!!",
    image: "/images/Kashvi jain.jpg"
  },
  {
    name: "Harsh Soni",
    message: "Founding the E-Cell wasn't about staring yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality. What began as an idea is now a launchpad for fearless innovators and game-changers 🚀 and I’m proud to have played a part in its journey.  This is just the beginning. The future belongs to those who dare to build it! Remember, कायर भोगे दुःख सदा, वीर भोग्या वसुन्धरा 🪖⚔️",
    image: "/images/harsh.jpg"
  },
];

const TestimonialsSection: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="testimonials-section px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-2">
              <div className="testimonial-card p-6 border rounded-lg shadow-lg bg-white">
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-black">{testimonial.name}</h3>
                  <p className="text-gray-600 text-center">{testimonial.message}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;
