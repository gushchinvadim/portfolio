import { motion } from 'framer-motion';
import { Code2, Database, Server } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: <Server className="w-8 h-8" />, title: 'Backend', desc: 'Python/Django' },
    { icon: <Code2 className="w-8 h-8" />, title: 'Frontend', desc: 'React/Vite' },
    { icon: <Database className="w-8 h-8" />, title: 'Database', desc: 'PostgreSQL' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">Обо мне</h2>
          
          <p className="text-lg text-slate-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
            Разрабатываю веб-приложения для авиации: от систем подготовки пилотов 
            до учета технической эксплуатации ВС. Специализация — автоматизация процессов, 
            анализ данных, интеграция с государственными системами.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg text-center"
              >
                <div className="text-secondary mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-slate-600">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;