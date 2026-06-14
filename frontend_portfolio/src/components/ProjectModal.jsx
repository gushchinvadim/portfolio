import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Code2 } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  // Разбиваем технологии на массив
  const techList = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнённый фон */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Модальное окно */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              {/* Заголовок с изображением */}
              <div className="relative h-64 bg-gradient-to-br from-primary to-secondary overflow-hidden rounded-t-2xl">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-white text-8xl">✈️</span>
                  </div>
                )}
                
                {/* Градиент поверх картинки */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Кнопка закрытия */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Заголовок проекта */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6 md:p-8">
                {/* Описание */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Описание проекта
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {project.full_description || project.description}
                  </p>
                </div>

                {/* Технологии */}
                {techList.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Технологии
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techList.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-primary font-medium rounded-lg border border-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Видео (если есть) */}
                {project.video_url && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">🎥 Демонстрация</h3>
                    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                      <video
                        controls
                        className="w-full h-full"
                        poster={project.image_url || ''}
                      >
                        <source src={project.video_url} type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                  </div>
                )}

                {/* Кнопки действий */}
                <div className="flex gap-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;