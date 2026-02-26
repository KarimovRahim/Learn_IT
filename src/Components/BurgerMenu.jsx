import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone,
  Search,
  Home,
  BookOpen,
  Settings,
  Newspaper,
  Info,
  Mail,
  Users
} from 'lucide-react';
import Button from './UI/Button.jsx';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    closeMenu();
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Главная', path: '/', icon: Home },
    { name: 'Курсы', path: '/courses', icon: BookOpen },
    { name: 'Наши услуги', path: '/services', icon: Settings },
    { name: 'Новости', path: '/news', icon: Newspaper },
    { name: 'О нас', path: '/about', icon: Info },
    { name: 'Контакты', path: '/contacts', icon: Mail },
    { name: 'Команда', path: '/team', icon: Users },
  ];

  return (
    <>
      {/* Кнопка бургера */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-[60] p-2 text-white hover:text-red-500 transition-colors duration-300"
        aria-label="Меню"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </button>

      {/* Оверлей с blur эффектом */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-[70] md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Само меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: 0.3
            }}
            className="fixed top-[73px] right-0 h-[calc(100vh-73px)] w-full max-w-sm bg-zinc-900 border-l border-zinc-800 shadow-2xl z-[80] md:hidden overflow-y-auto"
          >
            {/* Шапка меню */}
            <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
                    IT
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">Learn IT</span>
                </Link>
              </div>

              {/* Поиск */}
              <form onSubmit={handleSearch} className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск..."
                    className="w-full px-4 py-3 pl-11 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-500 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Навигация */}
            <nav className="p-6">
              <ul className="space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive(link.path)
                            ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive(link.path) ? 'text-red-500' : ''}`} />
                        <span className="font-medium">{link.name}</span>
                        {isActive(link.path) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-1.5 h-1.5 bg-red-600 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Контакты и кнопка */}
            <div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 p-6">
              <div className="space-y-4">
                <a
                  href="tel:+992920091313"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-red-600/10 transition-colors">
                    <Phone className="w-4 h-4 text-red-500 group-hover:text-red-400" />
                  </div>
                  <span className="text-sm font-medium">+992 (92) 009-13-13</span>
                </a>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HashLink
                    smooth
                    to="/#contacts"
                    onClick={closeMenu}
                  >
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-0">
                      Войти
                    </Button>
                  </HashLink>
                </motion.div>

                <p className="text-xs text-zinc-600 text-center">
                  © 2026 Learn IT Academy
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;