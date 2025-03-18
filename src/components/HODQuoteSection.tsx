import React from 'react';

const HODQuoteSection: React.FC = () => {
  const hodImage = "/images/hod.jpeg"; // Placeholder for HOD image

  return (
    <section className="hod-quote-section px-4 lg:px-56 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Our HOD Quote</h2>
      <div className="flex flex-col items-center">
        <img 
          src={hodImage} 
          alt="HOD" 
          className="w-24 h-24 rounded-full mb-4 object-scale-down" 
        />
        <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-400">
          "SCSIT, established in 1986, is a hub for cutting-edge tech education, offering M.Tech, M.Sc., MBA, PGDCA, and BCA programs tailored to industry needs. With a strong focus on research, innovation, and entrepreneurship, the school provides state-of-the-art labs, ICT-enabled infrastructure, and collaborations with top organizations like DRDO, ISRO, and C-DAC. Students gain hands-on experience through projects, internships, and real-world problem-solving, fostering technical expertise and leadership. Supported by various student development initiatives and backed by experienced faculty, SCSIT is committed to shaping future-ready IT professionals equipped to drive technological advancements and entrepreneurship."
        </blockquote>
      </div>
      <p className="text-center mt-2">- Dr. Ugrasen Suman</p>
    </section>
  );
};

export default HODQuoteSection;
