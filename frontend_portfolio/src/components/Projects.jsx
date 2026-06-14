import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/projects/')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  // Управляем скроллом через useEffect
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };


  if (loading) {
    return (
      <section id="projects" className="py-20 bg-slate-50">
        <div className="text-center text-xl text-primary">Загрузка проектов...</div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12 text-primary"
          >
            Мои проекты
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                {/* Изображение проекта */}
                <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden cursor-pointer"
                     onClick={() => openModal(project)}>
                  {project.image_url ? (
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <span className="text-white text-6xl">✈️</span>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 text-primary">{project.title}</h3>
                  <p className="text-slate-600 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.split(',').map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-primary text-sm rounded-full">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <button 
                      onClick={() => openModal(project)}
                      className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Подробнее
                    </button>
                  <button 
                    onClick={() => openModal(project)}
                    className="mt-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Смотреть демо
                  </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;