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
  Users,
  ChevronRight
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
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Здесь можно добавить логику поиска
      closeMenu();
    }
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

  // Варианты анимации для меню
  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    }
  };

  // Варианты анимации для оверлея
  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Кнопка бургера с улучшенной анимацией */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-[60] p-2 text-white hover:text-red-500 transition-all duration-300 group"
        aria-label="Меню"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          )}
        </motion.div>
        
        {/* Эффект пульсации при открытом меню */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeOut'
            }}
            className="absolute inset-0 rounded-full bg-red-500/20"
          />
        )}
      </button>

      {/* Улучшенный оверлей с градиентным blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[70] md:hidden"
            onClick={closeMenu}
          >
            {/* Градиентный фон с blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-900/80 to-zinc-950/90 backdrop-blur-xl" />
            
            {/* Декоративные элементы */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 -left-10 w-40 h-40 bg-red-600/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 -right-10 w-60 h-60 bg-red-600/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Улучшенное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-gradient-to-b from-zinc-900 to-zinc-950 border-l border-red-600/20 shadow-2xl z-[80] md:hidden overflow-y-auto"
          >
            {/* Декоративная полоса сверху */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0" />

            {/* Шапка меню с улучшенным дизайном */}
            <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 p-6 z-10">
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/20 group-hover:shadow-red-600/30 transition-shadow">
                      IT
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Learn IT</span>
                  </Link>
                </motion.div>

                {/* Индикатор открытого меню */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-1"
                >
                  <span className="text-xs text-zinc-500">Меню</span>
                  <div className="w-1 h-1 bg-red-600 rounded-full" />
                </motion.div>
              </div>

              {/* Улучшенный поиск */}
              <motion.form 
                onSubmit={handleSearch} 
                className="mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск курсов, новостей..."
                    className="w-full px-4 py-3 pl-11 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all group-hover:border-zinc-600"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-zinc-500 hover:text-red-500 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            </div>

            {/* Улучшенная навигация */}
            <nav className="p-6">
              <ul className="space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.05,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${
                          active
                            ? 'text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {/* Фон при наведении/активности */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl ${
                            active 
                              ? 'bg-gradient-to-r from-red-600/20 to-red-600/5' 
                              : 'bg-zinc-800/0 group-hover:bg-zinc-800/50'
                          }`}
                          layoutId={active ? "activeBackground" : undefined}
                          transition={{ type: 'spring', duration: 0.5 }}
                        />
                        
                        {/* Индикатор активности */}
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 w-1 h-8 bg-red-600 rounded-r-full"
                            transition={{ type: 'spring', duration: 0.5 }}
                          />
                        )}

                        {/* Иконка */}
                        <div className={`relative z-10 p-1.5 rounded-lg ${
                          active 
                            ? 'bg-red-600/20 text-red-500' 
                            : 'bg-zinc-800/50 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-red-500'
                        } transition-all duration-300`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Название */}
                        <span className={`relative z-10 font-medium ${
                          active ? 'text-white' : ''
                        }`}>
                          {link.name}
                        </span>

                        {/* Стрелка при наведении */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="absolute right-4 z-10"
                        >
                          <ChevronRight className="w-4 h-4 text-red-500" />
                        </motion.div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Улучшенный блок контактов */}
            <div className="sticky bottom-0 bg-gradient-to-t from-zinc-900 via-zinc-900/95 to-transparent pt-12 pb-6 px-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {/* Контакт */}
                <a
                  href="tel:+992920091313"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-zinc-800/80 rounded-xl group-hover:bg-red-600/10 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-4 h-4 text-red-500 group-hover:text-red-400" />
                  </div>
                  <span className="text-sm font-medium">+992 (92) 009-13-13</span>
                </a>

                {/* Кнопка входа */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HashLink
                    smooth
                    to="/#contacts"
                    onClick={closeMenu}
                  >
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-300 py-3.5 rounded-xl">
                      Войти в аккаунт
                    </Button>
                  </HashLink>
                </motion.div>

                {/* Копирайт */}
                <p className="text-xs text-zinc-600 text-center pt-2">
                  © 2026 Learn IT Academy
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;