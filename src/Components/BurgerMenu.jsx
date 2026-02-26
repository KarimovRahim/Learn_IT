import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { 
  Menu, X, Phone, Home, BookOpen, Settings, 
  Newspaper, Info, Mail, ChevronRight, LogIn, Sun, Moon
} from 'lucide-react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  // Монтируем портал только на клиенте
  useEffect(() => {
    setMounted(true);
    
    // Проверяем тему при монтировании
    const checkTheme = () => {
      const isDarkTheme = document.documentElement.classList.contains('dark');
      setIsDark(isDarkTheme);
    };
    
    checkTheme();
    
    // Наблюдаем за изменениями темы
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      setMounted(false);
      observer.disconnect();
    };
  }, []);

  // Управление рендерингом для анимации закрытия
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Главная', path: '/', icon: Home, description: 'Вернуться на главную' },
    { name: 'Курсы', path: '/courses', icon: BookOpen, description: 'Наши обучающие программы' },
    { name: 'Наши услуги', path: '/services', icon: Settings, description: 'Что мы предлагаем' },
    { name: 'Новости', path: '/news', icon: Newspaper, description: 'Последние события' },
  ];

  // Кнопка бургера с адаптацией под тему
  const burgerButton = (
    <button
      onClick={toggleMenu}
      className="md:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-red-500 dark:hover:text-red-500 transition-all duration-300 group z-50"
      aria-label="Меню"
      aria-expanded={isOpen}
    >
      <div className={`absolute inset-0 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-300 ${isOpen ? 'scale-110 opacity-100' : 'scale-0 opacity-0'}`} />
      
      {/* Анимированная иконка */}
      <div className="relative w-6 h-6">
        <X 
          size={24} 
          className={`absolute inset-0 transform transition-all duration-500 ${
            isOpen 
              ? 'rotate-0 opacity-100 scale-100' 
              : 'rotate-90 opacity-0 scale-50'
          }`} 
        />
        <Menu 
          size={24} 
          className={`absolute inset-0 transform transition-all duration-500 ${
            isOpen 
              ? '-rotate-90 opacity-0 scale-50' 
              : 'rotate-0 opacity-100 scale-100'
          }`} 
        />
      </div>
    </button>
  );

  // Меню и overlay с анимацией и поддержкой темы
  const menuContent = shouldRender && (
    <>
      {/* Overlay с анимацией появления/исчезновения - адаптирован под тему */}
      <div 
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-500 ${
          isDark 
            ? 'bg-black/60 backdrop-blur-md' 
            : 'bg-black/40 backdrop-blur-sm'
        } ${
          isOpen 
            ? 'opacity-100 backdrop-blur-md' 
            : 'opacity-0 backdrop-blur-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Меню с комплексной анимацией */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] z-[1000] md:hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-8 opacity-0 scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        {/* Контейнер меню с адаптивными цветами */}
        <div className={`relative h-full shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-zinc-900 to-zinc-950'
            : 'bg-gradient-to-b from-white to-gray-50'
        }`}>
          
          {/* Анимированная линия сверху (красная всегда) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isOpen ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 origin-left"
          />
          
          {/* Анимированный градиентный фон - адаптирован под тему */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? (isDark ? 0.5 : 0.3) : 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${
              isDark
                ? 'from-red-600/20 via-transparent to-transparent'
                : 'from-red-500/10 via-transparent to-transparent'
            }`}
          />
          
          {/* Шапка с логотипом и анимацией */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`relative bg-gradient-to-b p-6 pb-8 ${
              isDark
                ? 'from-zinc-800/50 to-transparent'
                : 'from-gray-100/50 to-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: isOpen ? 1 : 0, rotate: isOpen ? 0 : -180 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-lg blur-sm opacity-50 animate-pulse ${
                  isDark ? 'bg-red-600' : 'bg-red-500'
                }`} />
                <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  IT
                </div>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <span className={`text-lg font-bold block ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Learn IT
                </span>
                <span className={`text-xs ${
                  isDark ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Образовательный центр
                </span>
              </motion.div>
            </div>
            
            {/* Декоративная линия с анимацией */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isOpen ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent origin-left"
            />
          </motion.div>

          {/* Навигация с последовательной анимацией пунктов */}
          <nav className="p-4 overflow-y-auto max-h-[calc(100vh-280px)]">
            <ul className="space-y-1">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                
                return (
                  <motion.li 
                    key={link.path}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ 
                      x: isOpen ? 0 : -30, 
                      opacity: isOpen ? 1 : 0 
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.35 + index * 0.07,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    whileHover={{ x: 5 }}
                    className="transform-gpu"
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        active
                          ? isDark
                            ? 'bg-gradient-to-r from-red-600/20 to-red-600/5 text-red-500'
                            : 'bg-gradient-to-r from-red-500/10 to-red-500/5 text-red-600'
                          : isDark
                            ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {/* Индикатор активного пункта с анимацией */}
                      {active && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-r-full"
                        />
                      )}
                      
                      {/* Иконка с эффектом */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative p-2 rounded-lg transition-all duration-300 ${
                          active
                            ? isDark
                              ? 'bg-red-600/20 text-red-500'
                              : 'bg-red-500/10 text-red-600'
                            : isDark
                              ? 'bg-zinc-800/50 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-white'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                        }`}
                      >
                        <Icon size={18} />
                      </motion.div>
                      
                      {/* Текст и описание */}
                      <div className="flex-1">
                        <span className={`text-sm font-medium block ${
                          active
                            ? isDark ? 'text-red-500' : 'text-red-600'
                            : isDark ? 'text-zinc-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'
                        }`}>
                          {link.name}
                        </span>
                        <span className={`text-xs transition-colors ${
                          isDark 
                            ? 'text-zinc-500 group-hover:text-zinc-400' 
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {link.description}
                        </span>
                      </div>
                      
                      {/* Анимированная стрелка */}
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight 
                          size={16} 
                          className={active 
                            ? isDark ? 'text-red-500' : 'text-red-600'
                            : isDark ? 'text-zinc-500' : 'text-gray-400'
                          } 
                        />
                      </motion.div>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Контакты и кнопка входа с анимацией снизу */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: isOpen ? 0 : 30, 
              opacity: isOpen ? 1 : 0 
            }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t pt-8 pb-6 px-4 ${
              isDark
                ? 'from-zinc-900 via-zinc-900 to-transparent'
                : 'from-white via-white to-transparent border-t border-gray-200'
            }`}
          >
            <div className="space-y-3">
              {/* Телефон с анимацией */}
              <motion.a
                href="tel:+992920091313"
                whileHover={{ x: 5 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden ${
                  isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className={`absolute inset-0 transition-all duration-300 rounded-xl ${
                  isDark
                    ? 'bg-zinc-800/0 group-hover:bg-zinc-800/50'
                    : 'bg-gray-100/0 group-hover:bg-gray-100'
                }`} />
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`relative p-2 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-zinc-800 group-hover:bg-red-600/10'
                      : 'bg-gray-100 group-hover:bg-red-500/10'
                  }`}
                >
                  <Phone size={16} className="text-red-500" />
                </motion.div>
                <div className="relative">
                  <span className={`text-sm font-medium block ${
                    isDark ? 'text-zinc-300' : 'text-gray-700'
                  }`}>
                    +992 (92) 009-13-13
                  </span>
                  <span className={`text-xs ${
                    isDark ? 'text-zinc-500' : 'text-gray-500'
                  }`}>
                    Есть вопросы? Звоните!
                  </span>
                </div>
              </motion.a>

              {/* Индикатор темы */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg ${
                  isDark ? 'bg-zinc-800/50' : 'bg-gray-100'
                }`}
              >
                {isDark ? (
                  <>
                    <Moon size={14} className="text-red-500" />
                    <span className={`text-xs ${
                      isDark ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      Тёмная тема активна
                    </span>
                  </>
                ) : (
                  <>
                    <Sun size={14} className="text-red-500" />
                    <span className={`text-xs ${
                      isDark ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      Светлая тема активна
                    </span>
                  </>
                )}
              </motion.div>

              {/* Кнопка входа */}
              {/* <HashLink
                smooth
                to="/#contacts"
                onClick={closeMenu}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full group overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-100 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Анимированная волна при наведении */}
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative flex items-center justify-center gap-2 py-3 px-4">
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LogIn size={18} className="text-white" />
                    </motion.div>
                    <span className="text-sm font-medium text-white">Связаться с нами</span>
                  </div>
                </motion.button>
              </HashLink> */}
            </div>

            {/* Нижний декоративный элемент */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-4 text-center"
            >
              <span className={`text-[10px] ${
                isDark ? 'text-zinc-600' : 'text-gray-400'
              }`}>
                © 2026 Learn IT. Все права защищены
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {burgerButton}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
};

export default BurgerMenu;