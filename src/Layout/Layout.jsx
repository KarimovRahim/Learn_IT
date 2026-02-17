import React, { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import Button from '../Components/UI/Button.jsx'  // Исправленный путь
import { motion, AnimatePresence } from 'framer-motion'
import Switch from '../Components/swintcher.jsx'  // Исправленный путь
import Footer from '../Components/Footer/Footer.jsx'  // Исправленный путь
import AOS from 'aos'
import 'aos/dist/aos.css'

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 100,
      delay: 100,
    });

    // Обновляем AOS при изменении маршрута
    return () => {
      AOS.refresh();
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const userTheme = localStorage.getItem('theme');

    const isDarkTheme =
      userTheme === 'dark' ||
      (!userTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsDark(isDarkTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setTimeout(() => AOS.refresh(), 100);
  };

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Курсы', path: '/courses' },
    { name: 'Наши услуги', path: '/services' },
    { name: 'Новости', path: '/news' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen dark:bg-zinc-950 bg-zinc-50 font-sans selection-red">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-zinc-950/80 dark:border-zinc-800 py-3'
            : 'bg-white dark:bg-transparent py-5'
          }`}
        data-aos="fade-down"
        data-aos-duration="600"
        data-aos-easing="ease-out-quad"
        data-aos-offset="0"
        data-aos-once="true"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
              IT
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Learn IT</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${isActive(link.path)
                    ? 'text-gray-900 border-b-2 border-red-600 pb-1 dark:text-white dark:border-red-500'
                    : 'text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white'
                  }`}
                data-aos="fade-down"
                data-aos-duration="500"
                data-aos-delay={300 + index * 100}
                data-aos-easing="ease-out-back"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-6" data-aos="fade-left" data-aos-duration="700" data-aos-delay="600">
            <Switch darkChecked={isDark} darkOnchange={handleToggle} />
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="tel:+992920091313" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white transition-colors group"
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay="700"
                data-aos-easing="ease-out-quad"
              >
                <Phone className="w-4 h-4 text-red-600 group-hover:text-red-700 dark:text-red-500 dark:group-hover:text-red-400" />
                <span className="text-sm font-medium">+992 (92) 009-13-13</span>
              </a>
              <Button 
                variant="primary" 
                size="sm"
                data-aos="zoom-in"
                data-aos-duration="500"
                data-aos-delay="800"
                data-aos-easing="ease-out-back"
              >
                Войти
              </Button>
            </div>
          </div>

          <button
            className="md:hidden text-gray-900 dark:text-zinc-100 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="700"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
{isMobileMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] // кастомный easing для более плавности
    }}
    className="md:hidden bg-white border-b border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden"
  >
    <div className="px-4 py-6 flex flex-col gap-4">
      {navLinks.map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ 
            duration: 0.4,
            delay: index * 0.05,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <Link
            to={link.path}
            className={`text-base font-medium py-2 border-b border-gray-100 last:border-0 dark:border-zinc-800/50 block ${
              isActive(link.path)
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        </motion.div>
      ))}
      
      <motion.div 
        className="pt-4 flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4,
          delay: navLinks.length * 0.05 + 0.1,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <a 
          href="tel:+992920091313" 
          className="flex items-center gap-2 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4 text-red-600 dark:text-red-500" />
          <span>+992 (92) 009-13-13</span>
        </a>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full">
            Войти
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
)}
        </AnimatePresence>
      </header>

      <main className="-mt-2" data-aos="fade" data-aos-duration="1000" data-aos-delay="200">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout