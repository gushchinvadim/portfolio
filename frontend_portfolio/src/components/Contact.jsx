import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/contact/', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 text-primary"
        >
          Давайте работать вместе!
        </motion.h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Свяжитесь со мной</h3>
            <p className="text-slate-600 mb-8">
              Готов обсудить ваш проект:<br />
              • Разработка с нуля<br />
              • Доработка существующих систем<br />
              • Интеграция с государственными системами
            </p>

            <div className="space-y-4">
              <a href="mailto:gushvadim@yandex.ru" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                gvedynamics@yandex.ru
              </a>
              {/* <a href="https://github.com/gushchinvadim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors">
               <GitBranch className="w-5 h-5" />
                github.com/gushchinvadim
              </a> */}
            </div>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Сообщение"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {submitted ? 'Отправлено!' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;