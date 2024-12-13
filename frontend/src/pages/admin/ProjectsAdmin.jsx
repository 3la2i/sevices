import { useState, useEffect } from 'react';
import { api } from '../../api/config';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    technologies: [],
    status: 'in-progress'
  });
  const [editingId, setEditingId] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/projects/${editingId}`, formData);
      } else {
        await api.post('/api/projects', formData);
      }
      await fetchProjects();
      resetForm();
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving project:', error);
      alert(error.response?.data?.message || 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      link: '',
      technologies: [],
      status: 'in-progress'
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>
      
      {updateSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Project saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="Project Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Project Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={formData.image}
            onChange={e => setFormData({...formData, image: e.target.value})}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={formData.link}
            onChange={e => setFormData({...formData, link: e.target.value})}
            placeholder="Project Link"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={formData.technologies.join(', ')}
            onChange={e => setFormData({
              ...formData,
              technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
            })}
            placeholder="Technologies (comma-separated)"
            className="w-full p-2 border rounded"
          />
          <select
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
          >
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {projects.map(project => (
          <div key={project._id} className="border rounded p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === 'completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {project.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <p className="text-gray-600">{project.description}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  setFormData(project);
                  setEditingId(project._id);
                }}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-100 text-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 