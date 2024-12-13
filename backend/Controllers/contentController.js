const Content = require('../Models/Content');

// Get all content
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort('order');
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get content by section
exports.getContentBySection = async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update content
exports.updateContent = async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;

    // Validate required fields
    if (!updateData.title || !updateData.description) {
      return res.status(400).json({ 
        message: 'Title and description are required' 
      });
    }

    // Additional validation for projects and services
    if ((section === 'projects' || section === 'services') && Array.isArray(updateData.items)) {
      // Validate each item
      for (const item of updateData.items) {
        if (!item.title || !item.description) {
          return res.status(400).json({ 
            message: 'Each item must have a title and description' 
          });
        }
      }
    }

    const content = await Content.findOneAndUpdate(
      { section },
      updateData,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Create initial content if not exists
exports.createInitialContent = async () => {
  try {
    const sections = ['hero', 'vision', 'about', 'services', 'projects'];
    
    for (let i = 0; i < sections.length; i++) {
      const exists = await Content.findOne({ section: sections[i] });
      if (!exists) {
        await Content.create({
          section: sections[i],
          title: `${sections[i].charAt(0).toUpperCase() + sections[i].slice(1)} Section`,
          description: `This is the ${sections[i]} section. Edit this content in the admin panel.`,
          order: i + 1,
          items: sections[i] === 'services' ? [
            { title: 'Service 1', description: 'Service 1 description' },
            { title: 'Service 2', description: 'Service 2 description' }
          ] : sections[i] === 'projects' ? [
            { 
              title: 'Project 1',
              description: 'Project 1 description',
              technologies: ['React', 'Node.js'],
              link: 'https://example.com'
            },
            { 
              title: 'Project 2',
              description: 'Project 2 description',
              technologies: ['Vue', 'Express'],
              link: 'https://example.com'
            }
          ] : []
        });
      }
    }
    console.log('Initial content created');
  } catch (error) {
    console.error('Error creating initial content:', error);
  }
}; 