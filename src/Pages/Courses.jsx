import React from 'react'
import { HashLink } from 'react-router-hash-link';
import Section from '../Components/UI/Section'
import Button from '../Components/UI/Button'
import { CheckCircle2, Clock, Users, Star, DollarSign, Code, Database, PenTool, Smartphone, Zap, Cloud } from 'lucide-react'

const allCourses = [
  {
    id: 1,
    title: 'Frontend Разработка',
    level: 'Начальный',
    duration: '6 месяцев',
    price: '45,000 ₽',
    description: 'Полный курс по современной фронтенд разработке с нуля до профи',
    icon: <Code className="w-6 h-6" />,
    features: ['HTML/CSS', 'JavaScript ES6+', 'React & TypeScript', 'Redux Toolkit', 'Next.js', 'Тестирование'],
    students: 120,
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Python Разработчик',
    level: 'Средний',
    duration: '8 месяцев',
    price: '55,000 ₽',
    description: 'Профессиональный Python разработчик для веба, данных и автоматизации',
    icon: <Database className="w-6 h-6" />,
    features: ['Python 3.11', 'Django/Flask', 'FastAPI', 'SQL/NoSQL', 'Docker', 'AWS'],
    students: 85,
    rating: 4.8,
  },
  {
    id: 3,
    title: 'UI/UX Дизайн',
    level: 'Начальный',
    duration: '4 месяца',
    price: '35,000 ₽',
    description: 'Создание пользовательских интерфейсов и опыт работы с продуктом',
    icon: <PenTool className="w-6 h-6" />,
    features: ['Figma', 'Adobe XD', 'Прототипирование', 'Дизайн-системы', 'User Research', 'Анимация'],
    students: 95,
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Мобильная разработка',
    level: 'Средний',
    duration: '7 месяцев',
    price: '50,000 ₽',
    description: 'Разработка кросс-платформенных приложений для iOS и Android',
    icon: <Smartphone className="w-6 h-6" />,
    features: ['React Native', 'Flutter', 'Swift/Kotlin', 'Firebase', 'App Store', 'Google Play'],
    students: 70,
    rating: 4.9,
  },
  {
    id: 5,
    title: 'Data Science',
    level: 'Продвинутый',
    duration: '9 месяцев',
    price: '65,000 ₽',
    description: 'Анализ данных, машинное обучение и искусственный интеллект',
    icon: <Zap className="w-6 h-6" />,
    features: ['Python/Pandas', 'NumPy/SciPy', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tableau'],
    students: 60,
    rating: 4.8,
  },
  {
    id: 6,
    title: 'DevOps',
    level: 'Продвинутый',
    duration: '6 месяцев',
    price: '60,000 ₽',
    description: 'Автоматизация процессов разработки и развертывания',
    icon: <Cloud className="w-6 h-6" />,
    features: ['Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP', 'Terraform', 'Ansible'],
    students: 55,
    rating: 4.9,
  },
]

const Courses = () => {
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
          <h1 
            className="text-4xl md:text-5xl font-bold text-black mb-6 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="100"
          >
            Все <span className="text-red-600 dark:text-red-500">курсы</span> программирования
          </h1>
          <p 
            className="text-xl text-black/70 mb-8 dark:text-zinc-400"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="200"
          >
            Выберите направление, которое подходит именно вам. Старт новых групп каждые 2 недели.
          </p>
          <div 
            className="flex flex-wrap justify-center gap-4"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="300"
          >
            <Button variant="outline">Для начинающих</Button>
            <Button variant="outline">Для продвинутых</Button>
            <Button variant="outline">С трудоустройством</Button>
            <Button>Получить консультацию</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCourses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white border border-black/10 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500/30"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={150 + index * 100}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span 
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700 mb-2 dark:bg-red-500/10 dark:text-red-400"
                  >
                    {course.level}
                  </span>
                  <h3 
                    className="text-xl font-bold text-black group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-500"
                  >
                    {course.title}
                  </h3>
                </div>
                <div 
                  className="flex items-center gap-1 text-yellow-500"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-black dark:text-white">{course.rating}</span>
                </div>
              </div>

              <div 
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 dark:bg-red-500/10 dark:text-red-500">
                  {course.icon}
                </div>
                <p className="text-black/70 text-sm dark:text-zinc-400">{course.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div 
                  className="flex items-center gap-2 text-sm text-black/60 dark:text-zinc-400"
                >
                  <Clock className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <span>Длительность: {course.duration}</span>
                </div>
                <div 
                  className="flex items-center gap-2 text-sm text-black/60 dark:text-zinc-400"
                >
                  <Users className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <span>Студентов: {course.students}</span>
                </div>
                <div 
                  className="flex items-center gap-2 text-sm text-black/60 dark:text-zinc-400"
                >
                  <DollarSign className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <span className="text-black font-bold dark:text-white">Стоимость: {course.price}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-black font-medium mb-3 dark:text-white"
                >
                  Что вы изучите:
                </h4>
                <ul className="space-y-2">
                  {course.features.slice(0, 4).map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center gap-2 text-sm text-black/70 dark:text-zinc-400"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full justify-between group/btn"
              >
                Записаться на курс
                <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          ))}
        </div>

        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <h2 
            className="text-2xl font-bold text-black mb-6 dark:text-white"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Не нашли подходящий курс?
          </h2>
          <p 
            className="text-black/70 mb-8 max-w-2xl mx-auto dark:text-zinc-400"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            Напишите нам, и мы поможем подобрать индивидуальную программу обучения под ваши цели
          </p>
                        <HashLink
                smooth
                to="/#contacts"
              >
                <Button size="lg">Связаться с менеджером</Button>

              </HashLink>
        </div>
      </Section>
    </div>
  )
}

export default Courses