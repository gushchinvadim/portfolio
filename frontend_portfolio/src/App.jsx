import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      
      <footer className="bg-primary text-white py-8 text-center">
        <div className="container mx-auto px-6">
          <img 
            src="/images/GVE Dynamics White logo (1).png" 
            alt="GVE Dynamics" 
            className="h-16 w-auto mx-auto mb-4 opacity-80"
          />
          <p>© 2026 GVE Dynamics. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;