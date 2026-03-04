import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { 
  ArrowLeft, Calendar, User, Clock, Tag, Heart, 
  Share2, Bookmark, Eye, MessageSquare, ChevronRight,
  Download, Printer, ThumbsUp, AlertCircle
} from 'lucide-react';
import Section from '../Components/UI/Section';
import Button from '../Components/UI/Button';
import Aurora from '../Components/Aurora';
import Loader from '../Components/Loader'; // если есть

const DetailPage = () => {
  const { id, type } = useParams(); // type может быть 'news' или 'course'
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const baseUrl = import.meta.env.VITE_POCKETBASE_URL || 'https://ehjoi-manaviyat.pockethost.io';

  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  useEffect(() => {
    fetchItem();
    // Рандомное количество лайков для демо
    setLikes(Math.floor(Math.random() * 150) + 50);
  }, [id, type]);

  const fetchItem = async () => {
    try {
      setIsLoading(true);
      const collection = type === 'news' ? 'learn_it_news' : 'learn_it_courses';
      const res = await fetch(`${baseUrl}/api/collections/${collection}/records/${id}`);
      const data = await res.json();
      setItem(data);
    } catch (error) {
      console.error('Error fetching item:', error);
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
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} в ${hours}:${minutes}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.nameCourse || item?.newsTopic,
        text: item?.description || item?.info,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-zinc-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Страница не найдена
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 mb-6">
            Запрашиваемая страница не существует или была удалена
          </p>
          <Button onClick={() => navigate('/')} className="mx-auto">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const isCourse = type === 'course';
  const title = isCourse ? item.nameCourse : item.newsTopic;
  const content = isCourse ? item.description : item.info;
  const image = item.image ? `${baseUrl}/api/files/${isCourse ? 'learn_it_courses' : 'learn_it_news'}/${item.id}/${item.image}` : null;
  const benefits = isCourse && item.tags ? item.tags.split(',') : [];

  return (
    <div className="pt-20 pb-16 bg-white dark:bg-zinc-950 min-h-screen">
      {/* Фоновый эффект Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
        <Aurora
          colorStops={['#ffb3b3', '#ff8080', '#ff4d4d']}
          amplitude={1.0}
          blend={0.5}
          speed={2.0}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Кнопка назад */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Назад</span>
          </button>
        </motion.div>

        {/* Хлебные крошки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500 mb-6"
        >
          <Link to="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/${isCourse ? 'courses' : 'news'}`} className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            {isCourse ? 'Курсы' : 'Новости'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white truncate max-w-[200px]">
            {title}
          </span>
        </motion.div>

        {/* Основной контент */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800"
        >
          {/* Изображение */}
          {image && (
            <div className="relative h-[400px] overflow-hidden group">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Категория/цена на изображении */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-full text-sm font-bold shadow-lg">
                  {isCourse ? `₸ ${item.price}` : (item.newsTopic || 'Новость')}
                </span>
              </div>

              {/* Кнопки действий */}
              <div className="absolute top-6 right-6 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 group"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group ${
                    isSaved ? 'text-red-600' : 'hover:text-red-600'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </motion.button>
              </div>

              {/* Заголовок на изображении */}
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {title}
                </h1>
                {!isCourse && (
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.published)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {Math.floor(Math.random() * 1000) + 100}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Контент */}
          <div className="p-8 md:p-12">
            {/* Мета-информация для курса */}
            {isCourse && (
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-zinc-500">Цена</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.price} <span className="text-sm font-normal text-gray-500">смн</span>
                    </p>
                  </div>
                </div>

                {benefits.length > 0 && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-zinc-500 mb-2">Включает:</p>
                    <div className="flex flex-wrap gap-2">
                      {benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-full text-xs"
                        >
                          {benefit.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Основной текст */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {typeof content === 'string' ? parse(content) : content}
            </div>

            {/* Блок с действиями внизу */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-6 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4"
            >
              {/* Лайки */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">{Math.floor(Math.random() * 30) + 5}</span>
                </motion.button>
              </div>

              {/* Кнопка действия */}
              {isCourse ? (
                <HashLink smooth to="/#contacts">
                  <Button size="lg" className="group">
                    Записаться на курс
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </HashLink>
              ) : (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleShare}
                  className="group"
                >
                  Поделиться
                  <Share2 className="ml-2 w-5 h-5" />
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailPage;