import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/config';

const HeroSection = ({ content }) => {
  if (!content) return null;
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{content.title}</h1>
        <p className="text-xl md:text-2xl max-w-2xl leading-relaxed opacity-90">
          {content.description}
        </p>
      </div>
    </section>
  );
};

const VisionSection = ({ content }) => {
  if (!content) return null;
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">{content.title}</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{content.description}</p>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ content }) => {
  if (!content) return null;
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{content.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{content.description}</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            {/* You can add an image here later */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = ({ content }) => {
  if (!content) return null;
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">{content.title}</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">{content.description}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {content.items?.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [content, setContent] = useState({});
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/content`);
        const contentMap = response.data.reduce((acc, item) => {
          acc[item.section] = item;
          return acc;
        }, {});
        setContent(contentMap);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    
    fetchContent();
  }, []);

  return (
    <main>
      <HeroSection content={content.hero} />
      <VisionSection content={content.vision} />
      <AboutSection content={content.about} />
      <ServicesSection content={content.services} />
    </main>
  );
} 