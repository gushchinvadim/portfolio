import { motion } from 'framer-motion';
import { Plane, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-blue-800 to-secondary relative overflow-hidden pt-20">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <Plane className="w-20 h-20 text-white animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Разработка ПО<br />
            <span className="text-blue-200">для авиации</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Создаю цифровые решения для повышения безопасности и эффективности полетов
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
            >
              Посмотреть проекты
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all"
            >
              Связаться
            </a>
          </div>
        </motion.div>

        {/* Кнопка скролла вниз */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;