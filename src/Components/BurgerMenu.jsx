import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Phone, Home, BookOpen, Settings, Newspaper, Info, Mail } from 'lucide-react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Блокировка скролла при открытом меню
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Главная', path: '/', icon: Home },
    { name: 'Курсы', path: '/courses', icon: BookOpen },
    { name: 'Наши услуги', path: '/services', icon: Settings },
    { name: 'Новости', path: '/news', icon: Newspaper },
    { name: 'О нас', path: '/about', icon: Info },
    { name: 'Контакты', path: '/contacts', icon: Mail },
  ];

  return (
    <>
      {/* Кнопка бургера */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-50 p-2 text-white hover:text-red-500 transition-colors"
        aria-label="Меню"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Затемнение фона */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Меню */}
      <div 
        className={`fixed top-0 right-0 h-full w-[60%] bg-zinc-900 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Шапка с логотипом */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
              IT
            </div>
            <span className="text-lg font-bold text-white">Learn IT</span>
          </div>
        </div>

        {/* Навигация */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-red-600/10 text-red-500'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-red-500' : 'text-zinc-500'} />
                    <span className="text-sm font-medium">{link.name}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 bg-red-600 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Контакты */}
        <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-5">
          <div className="space-y-3">
            <a
              href="tel:+992920091313"
              className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-red-600/10 transition-colors">
                <Phone size={16} className="text-red-500" />
              </div>
              <span className="text-sm">+992 (92) 009-13-13</span>
            </a>

            <HashLink
              smooth
              to="/#contacts"
              onClick={closeMenu}
            >
              <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                Войти
              </button>
            </HashLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;