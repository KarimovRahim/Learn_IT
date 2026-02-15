import React, { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import Button from '../Components/UI/Button.jsx'  // Исправленный путь
import { motion, AnimatePresence } from 'framer-motion'
import Switch from '../Components/swintcher.jsx'  // Исправленный путь
import Footer from '../Components/Footer/Footer.jsx'  // Исправленный путь

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()

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
  };

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Курсы', path: '/courses' },
    { name: 'Наши услуги', path: '/services' },
    { name: 'Новости', path: '/news' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection-red">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-zinc-950/80 dark:border-zinc-800 py-3' 
            : 'bg-white dark:bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
              IT
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Learn IT</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-gray-900 border-b-2 border-red-600 pb-1 dark:text-white dark:border-red-500'
                    : 'text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-6">
            <Switch darkChecked={isDark} darkOnchange={handleToggle} />
            <div className="hidden md:flex items-center gap-6">
              <a href="tel:+992920091313" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-red-600 group-hover:text-red-700 dark:text-red-500 dark:group-hover:text-red-400" />
                <span className="text-sm font-medium">+992 (92) 009-13-13</span>
              </a>
              <Button variant="primary" size="sm">
                Войти
              </Button>
            </div>
          </div>


          <button
            className="md:hidden text-gray-900 dark:text-zinc-100 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-base font-medium py-2 border-b border-gray-100 last:border-0 dark:border-zinc-800/50 ${
                      isActive(link.path) 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-4">
                  <a href="tel:+992920091313" className="flex items-center gap-2 text-gray-600 dark:text-zinc-300">
                    <Phone className="w-4 h-4 text-red-600 dark:text-red-500" />
                    <span>+992 (92) 009-13-13</span>
                  </a>
                  <Button className="w-full">Войти</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout