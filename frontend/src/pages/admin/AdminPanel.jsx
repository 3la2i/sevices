import { useState, useEffect } from 'react';
import { api } from '../../api/config';

export default function AdminPanel() {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    items: []
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await api.get('/api/content');
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description) {
        alert('Title and description are required');
        return;
      }

      if ((selectedSection.section === 'services' || selectedSection.section === 'projects') 
          && formData.items) {
        for (const item of formData.items) {
          if (!item.title || !item.description) {
            alert('Each item must have a title and description');
            return;
          }
        }
      }

      if (selectedSection.section === 'projects') {
        formData.items = formData.items.map(item => ({
          ...item,
          technologies: item.technologies?.filter(tech => tech.trim() !== '') || []
        }));
      }

      await api.put(`/api/content/${selectedSection.section}`, formData);
      await fetchSections();
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating content:', error);
      alert(error.response?.data?.message || 'Error updating content. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      {updateSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Content updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {sections.map(section => (
          <button
            key={section._id}
            onClick={() => {
              setSelectedSection(section);
              setFormData({
                title: section.title,
                description: section.description,
                items: section.items || []
              });
            }}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedSection?.section === section.section
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {section.section.charAt(0).toUpperCase() + section.section.slice(1)}
          </button>
        ))}
      </div>

      {selectedSection && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>

          {(selectedSection.section === 'services' || selectedSection.section === 'projects') && (
            <div>
              <label className="block mb-2">
                {selectedSection.section === 'services' ? 'Services' : 'Projects'}
              </label>
              {formData.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => {
                        const newItems = [...formData.items];
                        newItems[index].title = e.target.value;
                        setFormData({...formData, items: newItems});
                      }}
                      placeholder="Title"
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={e => {
                        const newItems = [...formData.items];
                        newItems[index].description = e.target.value;
                        setFormData({...formData, items: newItems});
                      }}
                      placeholder="Description"
                      className="p-2 border rounded"
                    />
                    {selectedSection.section === 'projects' && (
                      <>
                        <input
                          type="text"
                          value={item.link || ''}
                          onChange={e => {
                            const newItems = [...formData.items];
                            newItems[index].link = e.target.value;
                            setFormData({...formData, items: newItems});
                          }}
                          placeholder="Project Link"
                          className="p-2 border rounded"
                        />
                        <input
                          type="text"
                          value={item.technologies?.join(', ') || ''}
                          onChange={e => {
                            const newItems = [...formData.items];
                            newItems[index].technologies = e.target.value.split(',').map(t => t.trim());
                            setFormData({...formData, items: newItems});
                          }}
                          placeholder="Technologies (comma-separated)"
                          className="p-2 border rounded"
                        />
                        <input
                          type="text"
                          value={item.image || ''}
                          onChange={e => {
                            const newItems = [...formData.items];
                            newItems[index].image = e.target.value;
                            setFormData({...formData, items: newItems});
                          }}
                          placeholder="Image URL"
                          className="p-2 border rounded"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  items: [...formData.items, { 
                    title: '', 
                    description: '',
                    ...(selectedSection.section === 'projects' ? {
                      link: '',
                      technologies: [],
                      image: ''
                    } : {})
                  }]
                })}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors"
              >
                Add {selectedSection.section === 'services' ? 'Service' : 'Project'}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors flex items-center justify-center space-x-2"
          >
            <span>Save Changes</span>
          </button>
        </form>
      )}
    </div>
  );
} 