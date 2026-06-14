import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Server, Code2, Database, Cloud, Wrench } from 'lucide-react';

const TechStack = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/skills/')
      .then(response => setSkills(response.data))
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  // Группируем навыки по категориям
  const categories = {
    backend: { title: 'Backend', icon: <Server className="w-6 h-6" />, color: 'bg-green-100 text-green-700' },
    frontend: { title: 'Frontend', icon: <Code2 className="w-6 h-6" />, color: 'bg-blue-100 text-blue-700' },
    database: { title: 'Базы данных', icon: <Database className="w-6 h-6" />, color: 'bg-purple-100 text-purple-700' },
    devops: { title: 'DevOps', icon: <Cloud className="w-6 h-6" />, color: 'bg-orange-100 text-orange-700' },
    tools: { title: 'Инструменты', icon: <Wrench className="w-6 h-6" />, color: 'bg-slate-100 text-slate-700' },
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 text-primary"
        >
          Мой стек технологий
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([key, cat]) => {
            const catSkills = skills.filter(s => s.category === key);
            if (catSkills.length === 0) return null;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${cat.color}`}>
                  {cat.icon}
                  {cat.title}
                </div>
                
                <div className="space-y-4">
                  {catSkills.map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-secondary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;