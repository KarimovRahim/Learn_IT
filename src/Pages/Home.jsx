import React from 'react'
import { motion } from 'framer-motion'
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
import { ArrowRight, Code, Smartphone, Database, PenTool, CheckCircle2, Award, Users, BookOpen, Clock, Lightbulb, Mail, MapPin, Phone as PhoneIcon } from 'lucide-react'

const Home = () => {
  const courses = [
    {
      id: 1,
      title: 'Frontend Разработка',
      description: 'Создавайте современные и интерактивные веб-сайты используя HTML, CSS, JavaScript и React.',
      icon: <Code className="w-8 h-8 text-red-600 dark:text-red-500" />,
      benefits: ['React & TypeScript', 'Адаптивная верстка', 'SPA приложения'],
    },
    {
      id: 2,
      title: 'Python Разработчик',
      description: 'Освойте самый популярный язык программирования для веба, анализа данных и автоматизации.',
      icon: <Database className="w-8 h-8 text-red-600 dark:text-red-500" />,
      benefits: ['Django & FastAPI', 'Работа с базами данных', 'Основы DevOps'],
    },
    {
      id: 3,
      title: 'UI/UX Дизайн',
      description: 'Научитесь проектировать удобные интерфейсы и создавать дизайн-системы в Figma.',
      icon: <PenTool className="w-8 h-8 text-red-600 dark:text-red-500" />,
      benefits: ['Figma Mastery', 'Прототипирование', 'Исследования пользователей'],
    },
    {
      id: 4,
      title: 'Мобильная разработка',
      description: 'Разработка нативных приложений для iOS и Android используя современные фреймворки.',
      icon: <Smartphone className="w-8 h-8 text-red-600 dark:text-red-500" />,
      benefits: ['Flutter / React Native', 'Публикация в сторы', 'Архитектура приложений'],
    },
  ]

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

  const partners = [
    'TechCorp', 'InnoSoft', 'DevStudio', 'CloudSystems',
    'DataFlow', 'WebMatrix', 'CyberGuard', 'FutureTech'
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden bg-transparent"
        data-aos="fade"
        data-aos-duration="1000"
      >
        {/* Фоновый градиент */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950"></div>
        </div>

        {/* Фон с Aurora эффектом - красные оттенки под бренд */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {/* Основной слой - ярко-красный */}
          <Aurora
            colorStops={['#ef4444', '#b91c1c', '#7f1d1d']} // От ярко-красного до темно-красного
            amplitude={1.5}
            blend={0.2}
            speed={3.2}
            sharpness={2.0}
            className="opacity-80 md:opacity-100"
          />

          {/* Второй слой для глубины - красный с фиолетовым оттенком */}
          <Aurora
            colorStops={['#f87171', '#dc2626', '#991b1b']} // Более насыщенные красные
            amplitude={1.2}
            blend={0.25}
            speed={2.8}
            sharpness={1.7}
            className="opacity-50 md:opacity-70"
          />

          {/* Третий слой для акцентов - теплый красный */}
          <Aurora
            colorStops={['#fca5a5', '#ef4444', '#b91c1c']} // Светло-красный переход
            amplitude={1.0}
            blend={0.3}
            speed={2.5}
            sharpness={1.5}
            className="opacity-30 md:opacity-50"
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
              {/* Бейдж с набором */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Набор на новый поток открыт
              </div>

              {/* Заголовок */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-delay="400"
              >
                Добро пожаловать в <br />
                <span className="text-red-500">
                  академию программирования
                </span> <br />
                <span className="text-red-500">Learn IT</span>
              </h1>

              {/* Описание */}
              <p
                className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed"
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
                <div className="dark">
                  <HashLink
                    smooth
                    to="#contacts"
                  >
                    <Button size="lg" className="group">
                      Получить консультацию
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </HashLink>
                </div>
                <div className="dark">
                  <Link
                    to="/courses"
                  >
                    <Button variant="outline" size="lg">
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
                <img
                  src={log}
                  alt="Learn IT Academy"
                  className="w-full h-auto object-contain brightness-0 invert drop-shadow-[0_20px_30px_rgba(255,255,255,0.1)]"
                />

                {/* Декоративные элементы */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                />

                <div
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Анимированный скролл индикатор */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-red-500 rounded-full mt-2 animate-bounce" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-white border border-black/10 hover:border-red-600/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/20 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500/30 dark:hover:shadow-red-900/10"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={200 + index * 100}
            >
              <div className="bg-red-50 w-14 h-14 rounded-lg flex items-center justify-center border border-red-100 mb-6 group-hover:scale-110 transition-transform duration-300 dark:bg-zinc-950 dark:border-zinc-800">
                {course.icon}
              </div>

              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-500">
                {course.title}
              </h3>

              <p className="text-black/70 text-sm mb-6 leading-relaxed dark:text-zinc-400">
                {course.description}
              </p>

              <ul className="space-y-2 mb-6">
                {course.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-black/80 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-500" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button variant="ghost" className="w-full justify-between group/btn px-0 hover:bg-transparent hover:text-red-600 dark:hover:text-red-500">
                Подробнее
                <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          ))}
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

      {/* Partners Section */}
      <Section
        className="bg-white border-y border-black/10 py-12 md:py-16 dark:bg-zinc-900 dark:border-zinc-800"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-offset="150"
      >
        <div className="text-center mb-10">
          <h2
            className="text-2xl font-bold text-black mb-2 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Наши партнёры
          </h2>
          <p
            className="text-black/70 text-sm dark:text-zinc-400"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            Компании, где работают наши выпускники
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-xl md:text-2xl font-bold text-black/30 hover:text-red-600 transition-colors cursor-default select-none dark:text-zinc-500 dark:hover:text-white"
              data-aos="zoom-in"
              data-aos-duration="500"
              data-aos-delay={50 + index * 30}
            >
              {partner}
            </div>
          ))}
        </div>
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
    </>
  )
}

export default Home