import React from 'react'
import { HashLink } from 'react-router-hash-link';
import Section from '../Components/UI/Section'
import Button from '../Components/UI/Button'
import { Calendar, User, Clock, Tag, ArrowRight, TrendingUp, BookOpen, MessageSquare, Newspaper, Share2, Heart } from 'lucide-react'

const news = [
  {
    id: 1,
    title: 'Новые тренды в веб-разработке 2024',
    excerpt: 'Обзор самых перспективных технологий и подходов, которые будут доминировать в этом году.',
    date: '15 января 2024',
    author: 'Алексей Смирнов',
    readTime: '5 мин',
    category: 'Разработка',
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: 'Как начать карьеру в IT без опыта',
    excerpt: 'Пошаговое руководство для тех, кто хочет войти в IT с нуля и быстро найти первую работу.',
    date: '10 января 2024',
    author: 'Мария Петрова',
    readTime: '8 мин',
    category: 'Карьера',
    views: 980,
    likes: 76,
  },
  {
    id: 3,
    title: 'Python vs JavaScript: что выбрать в 2024?',
    excerpt: 'Сравнение двух самых популярных языков программирования и рекомендации по выбору.',
    date: '5 января 2024',
    author: 'Дмитрий Иванов',
    readTime: '7 мин',
    category: 'Обучение',
    views: 1520,
    likes: 120,
  },
  {
    id: 4,
    title: 'Искусственный интеллект в образовании',
    excerpt: 'Как AI меняет подход к обучению и какие инструменты использовать уже сегодня.',
    date: '28 декабря 2023',
    author: 'Елена Козлова',
    readTime: '6 мин',
    category: 'Технологии',
    views: 890,
    likes: 65,
  },
  {
    id: 5,
    title: 'Собеседование в IT: как пройти успешно',
    excerpt: 'Советы от HR-специалистов и технических руководителей ведущих компаний.',
    date: '20 декабря 2023',
    author: 'Иван Сидоров',
    readTime: '10 мин',
    category: 'Карьера',
    views: 2100,
    likes: 156,
  },
  {
    id: 6,
    title: 'Мифы о программировании',
    excerpt: 'Разоблачаем самые распространенные заблуждения о профессии разработчика.',
    date: '15 декабря 2023',
    author: 'Анна Кузнецова',
    readTime: '4 мин',
    category: 'Обучение',
    views: 1150,
    likes: 92,
  },
]

const popularTags = [
  'Разработка', 'Дизайн', 'Карьера', 'Обучение', 'Технологии',
  'Python', 'JavaScript', 'React', 'Mobile', 'Startup'
]

const News = () => {
  return (
    <div className="pt-20">
      <Section
        className="bg-gradient-to-b from-white to-gray-100 dark:from-zinc-950 dark:to-zinc-900"
        data-aos="fade"
        data-aos-duration="1000"
      >
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-6 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <Newspaper className="w-4 h-4" />
            Самые свежие материалы из мира IT
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-black mb-6 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="150"
          >
            <span className="text-red-600 dark:text-red-500">Новости</span> и статьи
          </h1>
          <p
            className="text-xl text-black/70 dark:text-zinc-400"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="200"
          >
            Самые свежие материалы о технологиях, карьере и обучении в IT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {news.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-black/10 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500/30"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={150 + index * 100}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-black/70 dark:bg-zinc-800 dark:text-zinc-300">
                  {item.category}
                </span>
                <div className="flex items-center gap-3 text-sm text-black/50 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {item.likes}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors line-clamp-2 dark:text-white dark:group-hover:text-red-500">
                {item.title}
              </h3>

              <p className="text-black/70 mb-4 line-clamp-3 dark:text-zinc-400">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-zinc-800">
                <div className="text-sm text-black/50 dark:text-zinc-500">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {item.author}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-black/50 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-6 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="250"
          >
            <MessageSquare className="w-4 h-4" />
            Будьте в курсе последних новостей
          </div>

          <h2
            className="text-2xl font-bold text-black mb-6 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
          >
            Подпишитесь на рассылку
          </h2>
          <p
            className="text-black/70 mb-8 max-w-2xl mx-auto dark:text-zinc-400"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="350"
          >
            Получайте самые интересные статьи и новости из мира IT прямо на почту
          </p>

          <div
            className="max-w-md mx-auto flex justify-center gap-4"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
          >
                          <HashLink
                            smooth
                            to="/#contacts"
                          >
                            <Button size="lg">Связаться с менеджером</Button>
            
                          </HashLink>
          </div>

          <p
            className="text-xs text-black/50 mt-4 dark:text-zinc-500"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="450"
          >
            Отправляя email, вы соглашаетесь с нашей политикой конфиденциальности
          </p>
        </div>
      </Section>
    </div>
  )
}

export default News