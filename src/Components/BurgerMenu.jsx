import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { 
  Menu, X, Phone, Home, BookOpen, Settings, 
  Newspaper, Info, Mail, ChevronRight, LogIn 
} from 'lucide-react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Главная', path: '/', icon: Home, description: 'Вернуться на главную' },
    { name: 'Курсы', path: '/courses', icon: BookOpen, description: 'Наши обучающие программы' },
    { name: 'Наши услуги', path: '/services', icon: Settings, description: 'Что мы предлагаем' },
    { name: 'Новости', path: '/news', icon: Newspaper, description: 'Последние события' },
    { name: 'О нас', path: '/about', icon: Info, description: 'Узнайте больше о компании' },
    { name: 'Контакты', path: '/contacts', icon: Mail, description: 'Свяжитесь с нами' },
  ];

  return (
    <>
      {/* Кнопка бургера с анимацией */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white hover:text-red-500 transition-all duration-300 group"
        aria-label="Меню"
      >
        <div className={`absolute inset-0 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300 ${isOpen ? 'scale-110 opacity-100' : 'scale-0 opacity-0'}`} />
        {isOpen ? (
          <X size={24} className="transform transition-transform duration-300 rotate-0 hover:rotate-90" />
        ) : (
          <Menu size={24} className="transform transition-transform duration-300 hover:scale-110" />
        )}
      </button>

      {/* Затемнение фона с анимацией */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Меню с красивым дизайном */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-gradient-to-b from-zinc-900 to-zinc-950 z-50 md:hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Декоративный элемент сверху */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700" />
        
        {/* Шапка с логотипом и градиентом */}
        <div className="relative bg-gradient-to-b from-zinc-800/50 to-transparent p-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-lg blur-sm opacity-50 animate-pulse" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                IT
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-white block">Learn IT</span>
              <span className="text-xs text-zinc-400">Образовательный центр</span>
            </div>
          </div>
          
          {/* Декоративная линия */}
          <div className="absolute bottom-4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>

        {/* Навигация */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              
              return (
                <li 
                  key={link.path}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms' 
                  }}
                  className={`transform transition-all duration-300 ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                >
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      active
                        ? 'bg-gradient-to-r from-red-600/20 to-red-600/5 text-red-500'
                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                  >
                    {/* Индикатор активного пункта */}
                    {active && (
                      <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-r-full" />
                    )}
                    
                    {/* Иконка с эффектом */}
                    <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                      active 
                        ? 'bg-red-600/20 text-red-500' 
                        : 'bg-zinc-800/50 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-white'
                    }`}>
                      <Icon size={18} />
                    </div>
                    
                    {/* Текст и описание */}
                    <div className="flex-1">
                      <span className="text-sm font-medium block">{link.name}</span>
                      <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        {link.description}
                      </span>
                    </div>
                    
                    {/* Стрелка при наведении */}
                    <ChevronRight 
                      size={16} 
                      className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${
                        active ? 'text-red-500' : 'text-zinc-500'
                      }`} 
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Контакты и кнопка входа */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900 to-transparent pt-8 pb-6 px-4">
          <div className="space-y-3">
            {/* Телефон с эффектом */}
            <a
              href="tel:+992920091313"
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/50 transition-all duration-300 rounded-xl" />
              <div className="relative p-2 bg-zinc-800 rounded-lg group-hover:bg-red-600/10 transition-all duration-300">
                <Phone size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="relative">
                <span className="text-sm font-medium block">+992 (92) 009-13-13</span>
                <span className="text-xs text-zinc-500">Есть вопросы? Звоните!</span>
              </div>
            </a>

            {/* Кнопка входа с красивым дизайном */}
            <HashLink
              smooth
              to="/#contacts"
              onClick={closeMenu}
            >
              <button className="relative w-full group overflow-hidden rounded-xl">
                {/* Градиентный фон */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-100 group-hover:opacity-90 transition-opacity" />
                
                {/* Эффект свечения при наведении */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                
                {/* Контент кнопки */}
                <div className="relative flex items-center justify-center gap-2 py-3 px-4">
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Войти в аккаунт</span>
                </div>
              </button>
            </HashLink>
          </div>

          {/* Нижний декоративный элемент */}
          <div className="mt-4 text-center">
            <span className="text-[10px] text-zinc-600">© 2024 Learn IT. Все права защищены</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;