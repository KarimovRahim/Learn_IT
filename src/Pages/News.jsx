import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link';
import Section from '../Components/UI/Section'
import Button from '../Components/UI/Button'
import { Calendar, User, Clock, Tag, ArrowRight, TrendingUp, BookOpen, MessageSquare, Newspaper, Share2, Heart } from 'lucide-react'

const newsApi = "https://ehjoi-manaviyat.pockethost.io/api/collections/learn_it_news/records";

const News = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const getNews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(newsApi);
      const data = await res.json();

      // Сортировка по дате публикации (новые сверху)
      const sorted = data.items.sort((a, b) =>
        new Date(b.published) - new Date(a.published)
      );

      setNews(sorted);
    } catch (error) {
      console.error("Ошибка при получении новостей:", error);
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "некорректная дата";

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formatReadTime = (content) => {
    // Примерный подсчет времени чтения (1 минута на 200 символов)
    const textLength = content?.length || 0;
    const minutes = Math.max(1, Math.ceil(textLength / 200));
    return `${minutes} мин`;
  };

  useEffect(() => {
    getNews();
  }, []);

  // Статические теги (можно оставить или тоже получать из API)
  const popularTags = [
    'Разработка', 'Дизайн', 'Карьера', 'Обучение', 'Технологии',
    'Python', 'JavaScript', 'React', 'Mobile', 'Startup'
  ];

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

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-black/70 dark:text-zinc-400">Загрузка новостей...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {news.length > 0 ? (
              news.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-black/10 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500/30"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={150 + index * 100}
                >
                  {item.image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <img
                        src={`https://ehjoi-manaviyat.pockethost.io/api/files/learn_it_news/${item.id}/${item.image}`}
                        alt={item.newsTopic || "news"}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-black/70 dark:bg-zinc-800 dark:text-zinc-300">
                      {item.newsTopic || "Новость"}
                    </span>
                    <div className="flex items-center gap-3 text-sm text-black/50 dark:text-zinc-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {Math.floor(Math.random() * 1000) + 100}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {Math.floor(Math.random() * 100) + 10}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors line-clamp-2 dark:text-white dark:group-hover:text-red-500">
                    {item.newsTopic || "Новость"}
                  </h3>

                  <p className="text-black/70 mb-4 line-clamp-3 dark:text-zinc-400">
                    {item.info ? (
                      typeof item.info === 'string' ?
                        item.info.replace(/<[^>]*>/g, '').substring(0, 150) + '...' :
                        'Описание отсутствует'
                    ) : (
                      'Описание отсутствует'
                    )}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-zinc-800">
                    <div className="text-sm text-black/50 dark:text-zinc-500">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        Learn IT Academy
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-black/50 dark:text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.published)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatReadTime(item.info)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-black/70 dark:text-zinc-400 text-lg">
                  Новостей пока нет. Скоро появятся!
                </p>
              </div>
            )}
          </div>
        )}

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

export default News;