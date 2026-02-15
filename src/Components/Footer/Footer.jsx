import React from 'react'
import { Link } from 'react-router-dom'
import { Send, Facebook, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10 pt-16 pb-8 dark:bg-zinc-950 dark:border-zinc-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
                IT
              </div>
              <span className="text-xl font-bold text-black tracking-tight dark:text-white">Learn IT</span>
            </div>
            <p className="text-black/50 text-sm leading-relaxed mb-6 dark:text-zinc-500">
              Современная академия программирования. Мы помогаем людям освоить новые профессии и изменить свою жизнь к лучшему.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-black/40 hover:text-red-600 transition-colors dark:text-zinc-400 dark:hover:text-white">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="text-black/40 hover:text-red-600 transition-colors dark:text-zinc-400 dark:hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-black/40 hover:text-red-600 transition-colors dark:text-zinc-400 dark:hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6 dark:text-white">Обучение</h4>
            <ul className="space-y-3 text-sm text-black/50 dark:text-zinc-400">
              <li>
                <Link to="/courses" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Frontend Разработка
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Python Разработка
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  UI/UX Дизайн
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Мобильная разработка
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  QA Тестирование
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6 dark:text-white">Компания</h4>
            <ul className="space-y-3 text-sm text-black/50 dark:text-zinc-400">
              <li>
                <Link to="/" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Наша команда
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Блог
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-red-600 transition-colors dark:hover:text-red-500">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6 dark:text-white">Контакты</h4>
            <ul className="space-y-3 text-sm text-black/50 dark:text-zinc-400">
              <li>г. Худжанд, Хиёбони И.Сомони 93А <br /> (ориентир Дилбархон 3-этаж)</li>
              <li>+992 (92) 009-13-13</li>
              <li>learnit_academy@mail.ru</li>
              <li>Пн-Сб: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-black/40 dark:border-zinc-800 dark:text-zinc-600">
          <p>© 2026 Learn IT Academy. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black/70 transition-colors dark:hover:text-zinc-400">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-black/70 transition-colors dark:hover:text-zinc-400">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer