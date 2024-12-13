import { useState, useEffect } from 'react';
import { api } from '../api/config';

export default function Projects() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/content/projects');
        setContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-24">Loading...</div>;
  if (error) return <div className="text-center py-24 text-red-600">{error}</div>;
  if (!content) return null;

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{content.title}</h1>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          {content.description}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {content.items?.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow">
              {project.image && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 