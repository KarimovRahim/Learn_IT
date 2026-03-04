import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import parse from 'html-react-parser';

import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import Section from '../Components/UI/Section'
import Button from '../Components/UI/Button'
import log from '../assets/log.png'
import Mehrdod from '../assets/mehrdod.jpg'
import Amir from '../assets/amir.jpg'
import Ismoil from '../assets/ismoil.jpg'
import Narzullo from '../assets/narzullo.jpg'
import Aurora from '../Components/Aurora.jsx';
import { ArrowRight, Code, Code2, TrendingUp, Smartphone, Database, PenTool, CheckCircle2, Award, Users, BookOpen, Clock, Calendar, Tag, User, MessageSquare, Newspaper, Share2, Heart, Lightbulb, Mail, MapPin, Phone as PhoneIcon } from 'lucide-react';

const partnersApi = "https://ehjoi-manaviyat.pockethost.io/api/collections/learn_it_parthners/records";

// Swiper компоненты и стили
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Иконки MUI (используем те, что у вас точно есть)
import TerminalIcon from "@mui/icons-material/Terminal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {

  const [data, setData] = useState([]);

  const [news, setNews] = useState([]);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState({
    news: true,
    partners: true
  });

  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  // Функция для загрузки новостей
  const getNews = async () => {
    try {
      setIsLoading(prev => ({ ...prev, news: true }));
      const res = await fetch("https://ehjoi-manaviyat.pockethost.io/api/collections/learn_it_news/records");
      const data = await res.json();

      const sorted = data.items.sort((a, b) =>
        new Date(b.published) - new Date(a.published)
      );

      setNews(sorted);
    } catch (error) {
      console.error("Ошибка при получении новостей:", error);
      setNews([]);
    } finally {
      setIsLoading(prev => ({ ...prev, news: false }));
    }
  };

  // Функция для загрузки партнёров
  const getPartners = async () => {
    try {
      setIsLoading(prev => ({ ...prev, partners: true }));
      const res = await fetch(partnersApi);
      const data = await res.json();
      setPartners(data.items || []);
    } catch (error) {
      console.error("Ошибка при получении партнёров:", error);
      setPartners([]);
    } finally {
      setIsLoading(prev => ({ ...prev, partners: false }));
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
    const textLength = content?.length || 0;
    const minutes = Math.max(1, Math.ceil(textLength / 200));
    return `${minutes} мин`;
  };

  useEffect(() => {
    getNews();
    getPartners();
  }, []);

  const popularTags = [
    'Разработка', 'Дизайн', 'Карьера', 'Обучение', 'Технологии',
    'Python', 'JavaScript', 'React', 'Mobile', 'Startup'
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Сертифицированные учителя',
      description: 'Наши преподаватели — действующие специалисты ведущих IT-компаний.',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '80% практики и 20% теории',
      description: 'Максимум реальных задач и проектов для вашего портфолио.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Индивидуальный подход',
      description: 'Небольшие группы позволяют уделять время каждому студенту.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Регулярные занятия',
      description: 'Удобный график обучения, который легко совмещать с работой или учебой.',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Творческие уроки',
      description: 'Нескучная подача материала и интересные домашние задания.',
    },
  ]

  const stats = [
    { value: '150+', label: 'Выпускников' },
    { value: '100%', label: 'Завершение курсов' },
    { value: '98%', label: 'Трудоустройство' },
    { value: '4.9 ★', label: 'Средняя оценка' },
  ]

  const team = [
    {
      name: 'Тохири Мехрдод',
      role: 'СЕО LearnITacademy, Ментор и FrontEnd разработчик',
      img: Mehrdod,
    },
    {
      name: 'Амир Олимов',
      role: 'Ментор, FullStack-разработчик',
      img: Amir,
    },
    {
      name: 'Нарзуллоев Нарзулло',
      role: 'Ментор, Frontend-разработчик',
      img: Narzullo,
    },
    {
      name: 'Исмоил Олимов',
      role: 'Ментор, Frontend-разработчик',
      img: Ismoil,
    },
  ]

  async function getCourses() {
    try {
      const baseUrl = import.meta.env.VITE_POCKETBASE_URL || 'https://ehjoi-manaviyat.pockethost.io';
      const res = await fetch(`${baseUrl}/api/collections/learn_it_courses/records?page=1&perPage=50`);
      const json = await res.json();
      const formattedData = json.items.map((rec) => ({
        id: rec.id,
        title: rec.nameCourse,
        description: rec.description,
        benefits: rec.tags ? rec.tags.split(',') : ["Практика", "Проекты"],
        price: rec.price,
      }));
      setData(formattedData);
    } catch (e) { console.error(e); }
  }

  useEffect(() => { getCourses(); }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden bg-transparent"
        data-aos="fade"
        data-aos-duration="1000"
      >
        {/* Фоновый градиент - тёплый персиковый градиент (всегда виден как запасной вариант) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900"></div>
        </div>

        {/* Фон с Aurora эффектом - яркие красные оттенки для светлой темы */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {/* Основной слой - ярко-розовый */}
          <Aurora
            colorStops={['#ffb3b3', '#ff9999', '#ff8080']}
            amplitude={1.3}
            blend={0.4}
            speed={3.0}
            className="opacity-60 md:opacity-80 dark:opacity-0 dark:md:opacity-0"
          />

          {/* Второй слой - коралловый */}
          <Aurora
            colorStops={['#ff9999', '#ff8080', '#ff6666']}
            amplitude={1.1}
            blend={0.45}
            speed={2.7}
            className="opacity-50 md:opacity-70 dark:opacity-0 dark:md:opacity-0"
          />

          {/* Третий слой - ярко-красный */}
          <Aurora
            colorStops={['#ff8080', '#ff6666', '#ff4d4d']}
            amplitude={0.9}
            blend={0.5}
            speed={2.4}
            className="opacity-40 md:opacity-60 dark:opacity-0 dark:md:opacity-0"
          />

          {/* Для тёмной темы - насыщенные красные оттенки */}
          <Aurora
            colorStops={['#ff4d4d', '#ff3333', '#ff1a1a']}
            amplitude={1.5}
            blend={0.2}
            speed={3.2}
            className="hidden dark:block opacity-0 dark:opacity-80 dark:md:opacity-100"
          />

          <Aurora
            colorStops={['#ff6666', '#ff4d4d', '#ff3333']}
            amplitude={1.2}
            blend={0.25}
            speed={2.8}
            className="hidden dark:block opacity-0 dark:opacity-60 dark:md:opacity-80"
          />

          <Aurora
            colorStops={['#ff8080', '#ff6666', '#ff4d4d']}
            amplitude={1.0}
            blend={0.3}
            speed={2.5}
            className="hidden dark:block opacity-0 dark:opacity-40 dark:md:opacity-60"
          />
        </div>

        {/* Основной контент с колонками */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
            {/* Левая колонка - текст */}
            <div
              className="order-2 lg:order-1"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              {/* Бейдж с набором - тёплый красный */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-sm font-medium mb-6 dark:bg-red-500/20 dark:border-red-500/30 dark:text-red-400"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-400"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 dark:bg-red-500"></span>
                </span>
                Набор на новый поток открыт
              </div>

              {/* Заголовок - тёплый тёмно-коричневый */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-amber-950 dark:text-white leading-[1.1] tracking-tight mb-6"
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-delay="400"
              >
                Добро пожаловать в <br />
                <span className="text-red-500 dark:text-red-400">
                  академию программирования
                </span> <br />
                <span className="text-red-500 dark:text-red-400">Learn IT</span>
              </h1>

              {/* Описание - тёплый коричневый */}
              <p
                className="text-lg md:text-xl text-amber-800 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="500"
              >
                Мы обучаем современным IT-профессиям с нуля. Получите востребованные навыки,
                создайте портфолио и начните карьеру в технологиях под руководством опытных менторов.
              </p>

              {/* Кнопки */}
              <div
                className="flex flex-col sm:flex-row gap-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="600"
              >
                <div>
                  <HashLink
                    smooth
                    to="#contacts"
                  >
                    <Button
                      size="lg"
                      className="group bg-red-500 hover:bg-red-600 text-white dark:bg-red-500 dark:hover:bg-red-600 shadow-lg hover:shadow-xl transition-all"
                    >
                      Получить консультацию
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </HashLink>
                </div>
                <div>
                  <Link
                    to="/courses"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                    >
                      Посмотреть программу
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Правая колонка - логотип */}
            <div
              className="order-1 lg:order-2 flex justify-center lg:justify-end items-center"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
              data-aos-offset="100"
            >
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Красное свечение за логотипом для светлой темы */}
                <div className="absolute inset-0 flex items-center justify-center dark:hidden">
                  <div className="w-[80%] h-[80%] bg-gradient-to-r from-red-400/30 to-red-500/30 rounded-full blur-2xl" />
                </div>

                {/* Логотип с красной тенью */}
                <img
                  src={log}
                  alt="Learn IT Academy"
                  className="w-full h-auto object-contain relative z-10
        drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]
        dark:drop-shadow-[0_20px_30px_rgba(255,255,255,0.1)]
        dark:brightness-100 dark:invert-0"
                />

                {/* Декоративные элементы */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-300/40 to-red-400/40 rounded-full blur-3xl dark:bg-red-500/20"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                />

                <div
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-amber-300/40 to-amber-400/40 rounded-full blur-3xl dark:bg-orange-500/20"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Скролл индикатор */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <div className="w-6 h-10 border-2 border-red-300 dark:border-red-500/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-red-500 dark:bg-red-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <Section
        id="courses"
        className="bg-white dark:bg-transparent"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="200"
      >
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-black mb-4 dark:text-white"
              data-aos="fade-right"
              data-aos-duration="700"
              data-aos-delay="100"
            >
              Наши курсы
            </h2>
            <p
              className="text-black/70 max-w-xl dark:text-zinc-400"
              data-aos="fade-right"
              data-aos-duration="700"
              data-aos-delay="200"
            >
              Выберите направление, которое подходит именно вам. Мы постоянно обновляем программы, чтобы они соответствовали требованиям рынка.
            </p>
          </div>
          <Button
            variant="outline"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="300"
          >
            Все курсы
          </Button>
        </div>

        <div className="w-full py-20 bg-[#fdfdfd] dark:bg-zinc-950 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6">

            {/* Шапка с кнопками навигации */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="text-left">
                <h1 className="text-4xl font-bold mb-4 dark:text-white tracking-tight">Наши курсы</h1>
                <p className="text-gray-500 max-w-xl dark:text-zinc-400">
                  Выберите направление и начните свой путь в IT. Все курсы включают практические задания и поддержку менторов.
                </p>
              </div>

              {/* Кастомные кнопки навигации */}
              <div className="flex gap-3">
                <button className="swiper-prev-btn w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 dark:border-zinc-800 dark:text-white">
                  <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
                </button>
                <button className="swiper-next-btn w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 dark:border-zinc-800 dark:text-white">
                  <ArrowForwardIosIcon sx={{ fontSize: 18, marginLeft: '3px' }} />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={25}
              slidesPerView={1}
              // Привязываем кастомные кнопки
              navigation={{
                prevEl: '.swiper-prev-btn',
                nextEl: '.swiper-next-btn',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-14"
            >
              {data.map((course) => (
                <SwiperSlide key={course.id} className="h-auto">
                  <div className="group bg-white h-full border border-gray-100 hover:border-transparent rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:bg-zinc-900 dark:border-zinc-800 flex flex-col relative overflow-hidden">

                    {/* Декоративный элемент фона при наведении */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-0 dark:bg-red-900/10" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="bg-zinc-50 w-14 h-14 rounded-xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 dark:bg-zinc-800">
                        <TerminalIcon />
                      </div>

                      <h3 className="text-xl font-bold text-zinc-900 mb-4 group-hover:text-red-600 transition-colors dark:text-white">
                        {course.title}
                      </h3>

                      <div className="text-zinc-500 text-sm mb-6 line-clamp-4 flex-grow dark:text-zinc-400 leading-relaxed">
                        {typeof course.description === 'string' ? parse(course.description) : course.description}
                      </div>

                      <ul className="space-y-3 mb-8">
                        {course.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {benefit.trim()}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">
                          {course.price} <span className="text-xs font-medium text-zinc-400 uppercase ml-1">смн</span>
                        </span>

                        <HashLink
                          smooth
                          to="#contacts"
                          className="text-sm font-bold text-red-600 flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          Записаться <ArrowForwardIcon sx={{ fontSize: 18 }} />
                        </HashLink>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d1d1 !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #dc3545 !important;
          width: 24px !important;
          border-radius: 4px !important;
          transition: all 0.3s ease;
        }
        /* Скрываем стандартные стрелки swiper, если они появятся */
        .swiper-button-next, .swiper-button-prev {
          display: none !important;
        }
      `}</style>
        </div>
      </Section>

      {/* About Section */}
      <Section
        id="about"
        className="relative overflow-hidden bg-white dark:bg-transparent"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="200"
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none dark:bg-red-500/5"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2
              className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight dark:text-white"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              Многолетний опыт <br />
              <span className="text-black/50 dark:text-zinc-500">обучения профессионалов</span>
            </h2>
            <p
              className="text-lg text-black/70 mb-6 leading-relaxed dark:text-zinc-400"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              Академия Learn IT была основана с целью предоставить качественное и доступное IT-образование.
              За годы работы мы выпустили сотни специалистов, которые успешно строят карьеру в крупнейших технологических компаниях.
            </p>
            <p
              className="text-lg text-black/70 mb-8 leading-relaxed dark:text-zinc-400"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="150"
            >
              Мы верим, что программирование — это не просто написание кода, а способ мышления.
              Наша методика направлена на развитие аналитических способностей и творческого подхода к решению задач.
            </p>
          </div>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-200 dark:hover:bg-zinc-900/50 dark:hover:border-zinc-800"
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay={100 + index * 50}
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-red-600 dark:bg-red-500/10 dark:text-red-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black mb-1 dark:text-white">{feature.title}</h3>
                  <p className="text-black/70 text-sm dark:text-zinc-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section
        className="bg-red-50 border-y border-red-100 dark:bg-zinc-900 dark:border-zinc-800"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-offset="150"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-black mb-2 dark:text-white"
              data-aos="fade-right"
              data-aos-duration="600"
            >
              Наш прогресс
            </h2>
            <p
              className="text-black/70 text-sm max-w-xs mx-auto md:mx-0 dark:text-zinc-400"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              Цифры говорят громче слов. Наши результаты — это успех наших студентов.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full md:w-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:items-start"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay={100 + index * 50}
              >
                <span className="text-3xl md:text-4xl font-bold text-black mb-1 dark:text-white">{stat.value}</span>
                <span className="text-sm font-medium text-red-600 uppercase tracking-wider dark:text-red-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section
        id="team"
        className="bg-white dark:bg-transparent"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="200"
      >
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-black mb-4 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            Наша команда
          </h2>
          <p
            className="text-black/70 max-w-2xl mx-auto dark:text-zinc-400"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="100"
          >
            Опытные менторы, которые будут сопровождать вас на каждом этапе обучения.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={100 + index * 50}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center border border-gray-200 dark:border-zinc-700 shadow-lg group-hover:shadow-xl transition-all duration-500">

                {/* Фотография - теперь правильно отображается */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Оверлей с градиентом при наведении */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Иконка или дополнительная информация при наведении */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm font-medium text-center">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="text-center relative">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">
                  {member.role}
                </p>

                {/* Линия под ролью при наведении */}
                <div className="w-0 h-0.5 bg-red-500 mx-auto mt-3 group-hover:w-16 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* News Section */}
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

        {isLoading.news ? (
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

{/* Partners Section */}
<Section
  className="bg-white dark:bg-transparent"
  data-aos="fade-up"
  data-aos-duration="1000"
  data-aos-offset="200"
>
  <div className="text-center mb-16">
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-4 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <TrendingUp className="w-4 h-4" />
      Наши партнёры
    </div>
    <h2
      className="text-3xl md:text-4xl font-bold text-black mb-4 dark:text-white"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      Компании, которые нам <span className="text-red-600 dark:text-red-500">доверяют</span>
    </h2>
    <p
      className="text-black/70 max-w-2xl mx-auto dark:text-zinc-400"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-delay="100"
    >
      Ведущие IT-компании, где работают наши выпускники и с которыми мы активно сотрудничаем
    </p>
  </div>

  {isLoading.partners ? (
    <div className="flex justify-center items-center py-20">
      <div className="inline-block w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {partners.length > 0 ? (
        partners.map((partner, index) => (
          <a
            key={partner.id}
            href={partner.website || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay={100 + index * 50}
          >
            <div className="relative overflow-hidden rounded-xl aspect-square mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center border border-gray-200 dark:border-zinc-700 shadow-lg group-hover:shadow-xl transition-all duration-500">
              
              {/* Логотип партнёра */}
              {partner.logo ? (
                <img
                  src={`https://ehjoi-manaviyat.pockethost.io/api/files/learn_it_parthners/${partner.id}/${partner.logo}`}
                  alt={partner.name}
                  className="w-full h-full object-contain p-8 transition-all duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    // Если логотип не загрузился, показываем первую букву названия
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="text-4xl font-bold text-red-600 dark:text-red-500">
                        ${partner.name.charAt(0)}
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="text-4xl font-bold text-red-600 dark:text-red-500">
                  {partner.name.charAt(0)}
                </div>
              )}

              {/* Оверлей с градиентом при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Название компании при наведении (для мобильных) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-sm font-medium text-center line-clamp-2">
                  {partner.name}
                </p>
              </div>

              {/* Иконка внешней ссылки */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                <span className="text-red-600 text-lg font-bold">↗</span>
              </div>
            </div>

            <div className="text-center relative">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-300">
                {partner.name}
              </h3>
              
              {partner.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                  {partner.description}
                </p>
              )}

              {/* Линия под названием при наведении */}
              <div className="w-0 h-0.5 bg-red-500 mx-auto mt-3 group-hover:w-16 transition-all duration-500"></div>
            </div>
          </a>
        ))
      ) : (
        // Запасные партнёры в том же стиле
        ['TechCorp', 'InnoSoft', 'DevStudio', 'CloudSystems'].map((partner, index) => (
          <div
            key={index}
            className="group relative"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay={100 + index * 50}
          >
            <div className="relative overflow-hidden rounded-xl aspect-square mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center border border-gray-200 dark:border-zinc-700 shadow-lg group-hover:shadow-xl transition-all duration-500">
              
              {/* Первая буква названия как логотип */}
              <div className="text-4xl font-bold text-red-600 dark:text-red-500 transition-all duration-700 ease-out group-hover:scale-110">
                {partner.charAt(0)}
              </div>

              {/* Оверлей с градиентом при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Название компании при наведении */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-sm font-medium text-center">
                  {partner}
                </p>
              </div>
            </div>

            <div className="text-center relative">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-300">
                {partner}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Партнёр
              </p>

              {/* Линия под названием при наведении */}
              <div className="w-0 h-0.5 bg-red-500 mx-auto mt-3 group-hover:w-16 transition-all duration-500"></div>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</Section>

      {/* Contact Section */}
      <Section
        id="contacts"
        className="bg-white dark:bg-transparent"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-black mb-6 dark:text-white"
              data-aos="fade-right"
              data-aos-duration="700"
            >
              Связаться с нами
            </h2>
            <p
              className="text-black/70 mb-8 leading-relaxed dark:text-zinc-400"
              data-aos="fade-right"
              data-aos-duration="700"
              data-aos-delay="100"
            >
              Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут, чтобы ответить на все вопросы и помочь с выбором курса.
            </p>

            <div className="space-y-6">
              <div
                className="flex items-start gap-4"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="150"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 border border-red-100 dark:bg-zinc-900 dark:border-zinc-800">
                  <MapPin className="w-5 h-5 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium mb-1 dark:text-white">Адрес</h4>
                  <p className="text-black/70 text-sm dark:text-zinc-400">г. Худжанд, Хиёбони И.Сомони 93А (ориентир Дилбархон 3-этаж)</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="200"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 border border-red-100 dark:bg-zinc-900 dark:border-zinc-800">
                  <PhoneIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium mb-1 dark:text-white">Телефон</h4>
                  <p className="text-black/70 text-sm dark:text-zinc-400">+992 (92) 009-13-13</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="250"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 border border-red-100 dark:bg-zinc-900 dark:border-zinc-800">
                  <Mail className="w-5 h-5 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h4 className="text-black font-medium mb-1 dark:text-white">Email</h4>
                  <p className="text-black/70 text-sm dark:text-zinc-400">learnit_academy@mail.ru</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 dark:bg-zinc-900/50 dark:border-zinc-800"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="space-y-2"
                // data-aos="fade-up"
                // data-aos-duration="500"
                // data-aos-delay="250"
                >
                  <label className="text-sm font-medium text-black dark:text-zinc-300">Имя</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-red-600 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-red-500"
                    placeholder="Введите имя"
                  />
                </div>
                <div
                  className="space-y-2"
                // data-aos="fade-up"
                // data-aos-duration="500"
                // data-aos-delay="300"
                >
                  <label className="text-sm font-medium text-black dark:text-zinc-300">Фамилия</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-red-600 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-red-500"
                    placeholder="Введите фамилию"
                  />
                </div>
              </div>

              <div
                className="space-y-2"
              // data-aos="fade-up"
              // data-aos-duration="500"
              // data-aos-delay="350"
              >
                <label className="text-sm font-medium text-black dark:text-zinc-300">Телефон</label>
                <input
                  type="tel"
                  className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-red-600 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-red-500"
                  placeholder="+992 (__) ___-__-__"
                />
              </div>

              <div
                className="space-y-2"
              // data-aos="fade-up"
              // data-aos-duration="500"
              // data-aos-delay="400"
              >
                <label className="text-sm font-medium text-black dark:text-zinc-300">Email</label>
                <input
                  type="email"
                  className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-red-600 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-red-500"
                  placeholder="email@example.com"
                />
              </div>

              <div
                className="space-y-2"
              // data-aos="fade-up"
              // data-aos-duration="500"
              // data-aos-delay="450"
              >
                <label className="text-sm font-medium text-black dark:text-zinc-300">Сообщение</label>
                <textarea
                  className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-red-600 transition-colors min-h-[120px] dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-red-500"
                  placeholder="Какой курс вас интересует?"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-2"
              // data-aos="fade-up"
              // data-aos-duration="500"
              // data-aos-delay="500"
              >
                Отправить заявку
              </Button>

              <p
                className="text-xs text-black/50 text-center mt-4 dark:text-zinc-500"
              // data-aos="fade-up"
              // data-aos-duration="500"
              // data-aos-delay="550"
              >
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>

      </Section>
      <div className="w-full flex justify-center bg-[#DA4533] dark:bg-transparent pt-[70px] pb-[50px]">
        <div className="w-[90%] max-w-[1000px] h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1522.0419508867233!2d69.6379656!3d40.2738864!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b1b363df3d22ab%3A0xcf204e8dd836ec19!2sLearn%20IT%20Academy!5e0!3m2!1sen!2s!4v1747903235766!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>


    </>
  )
}

export default Home