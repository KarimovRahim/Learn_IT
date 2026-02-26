import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Phone } from 'lucide-react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Блокировка прокрутки
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
    { name: 'Главная', path: '/' },
    { name: 'Курсы', path: '/courses' },
    { name: 'Наши услуги', path: '/services' },
    { name: 'Новости', path: '/news' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <>
      {/* Кнопка бургера */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-[60] p-2 text-white hover:text-red-500 transition-colors duration-300"
        aria-label="Меню"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Оверлей с blur */}
      <div
        className={`fixed inset-0 z-[70] transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md" />
      </div>

      {/* Меню */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-zinc-900 border-l border-zinc-800 shadow-2xl z-[80] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Шапка */}
        <div className="p-6 border-b border-zinc-800">
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

        {/* Навигация */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Контакты */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="space-y-4">
            <a
              href="tel:+992920091313"
              className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-red-600/10 transition-colors">
                <Phone className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-sm">+992 (92) 009-13-13</span>
            </a>

            <HashLink
              smooth
              to="/#contacts"
              onClick={closeMenu}
            >
              <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-lg transition-colors">
                Войти
              </button>
            </HashLink>

            <p className="text-xs text-zinc-600 text-center">
              © 2026 Learn IT Academy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;