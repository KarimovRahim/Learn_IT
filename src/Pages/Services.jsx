import React from 'react'
import Section from '../Components/UI/Section'
import Button from '../Components/UI/Button'
import { Briefcase, Users, Code, Settings, Shield, Zap, Globe, BarChart, Target, Headphones } from 'lucide-react'

const services = [
  {
    icon: <Briefcase className="w-10 h-10 text-red-600 dark:text-red-500" />,
    title: 'Корпоративное обучение',
    description: 'Обучение сотрудников вашей компании современным технологиям',
    features: ['Индивидуальные программы', 'Гибкий график', 'Отчетность', 'Сертификация'],
  },
  {
    icon: <Users className="w-10 h-10 text-red-600 dark:text-red-500" />,
    title: 'Подбор IT-специалистов',
    description: 'Помощь в поиске и найме квалифицированных разработчиков',
    features: ['Техническое собеседование', 'Ассессмент', 'Кадровый аудит', 'Адаптация'],
  },
  {
    icon: <Code className="w-10 h-10 text-red-600 dark:text-red-500" />,
    title: 'Разработка ПО на заказ',
    description: 'Создание веб и мобильных приложений под ключ',
    features: ['Полный цикл разработки', 'UI/UX дизайн', 'Тестирование', 'Поддержка'],
  },
  {
    icon: <Settings className="w-10 h-10 text-red-600 dark:text-red-500" />,
    title: 'Технический консалтинг',
    description: 'Экспертная помощь в выборе технологий и архитектуры',
    features: ['Архитектурный аудит', 'Оптимизация', 'Миграция', 'Масштабирование'],
  },
  {
    icon: <Shield className="w-10 h-10 text-red-600 dark:text-red-500" />,
    title: 'Информационная безопасность',
    description: 'Защита данных и обучение кибербезопасности',
    features: ['Аудит безопасности', 'Обучение', 'Penetration testing', 'Compliance'],
  },
  {
    icon: <Zap className="w-10 h-10 text-red-600 dark:text-red-500" />,
    title: 'Автоматизация процессов',
    description: 'Роботизация рутинных задач и бизнес-процессов',
    features: ['RPA', 'Workflow', 'Интеграции', 'Аналитика'],
  },
]

const industries = [
  { name: 'Финансы и банкинг', count: 45 },
  { name: 'Ритейл и e-commerce', count: 32 },
  { name: 'Телекоммуникации', count: 28 },
  { name: 'Государственный сектор', count: 25 },
  { name: 'Медицина', count: 22 },
  { name: 'Образование', count: 18 },
]

const Services = () => {
  return (
    <div className="pt-20">
      <Section className="bg-gradient-to-b from-white to-gray-100 dark:from-zinc-950 dark:to-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-6 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            <Target className="w-4 h-4" />
            Комплексные IT-решения для бизнеса
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 dark:text-white">
            Наши <span className="text-red-600 dark:text-red-500">услуги</span>
          </h1>
          <p className="text-xl text-black/70 dark:text-zinc-400">
            Помогаем компаниям внедрять современные технологии и развивать IT-компетенции
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-black/10 rounded-2xl p-8 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500/30"
            >
              <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform dark:bg-zinc-950 dark:border-zinc-800">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-500">
                {service.title}
              </h3>

              <p className="text-black/70 mb-6 dark:text-zinc-400">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-black/80 flex items-center gap-2 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full">
                Узнать подробнее
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-8 mb-16 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6 dark:text-white">
                Работаем с компаниями из разных отраслей
              </h2>
              <p className="text-black/70 mb-6 dark:text-zinc-400">
                За годы работы мы помогли более 200 компаниям оптимизировать IT-процессы,
                обучить сотрудников и внедрить современные технологии.
              </p>
              <Button size="lg">Стать клиентом</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-red-600/50 transition-colors dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-red-500/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black dark:text-white">{industry.name}</h4>
                    <BarChart className="w-4 h-4 text-red-600 dark:text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-black dark:text-white">{industry.count}+ проектов</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-6 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            <Headphones className="w-4 h-4" />
            Поддержка 24/7
          </div>

          <h2 className="text-3xl font-bold text-black mb-6 dark:text-white">Готовы начать сотрудничество?</h2>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto dark:text-zinc-400">
            Напишите нам, и мы поможем подобрать индивидуальную программу обучения под ваши цели
          </p>

          <div className="max-w-lg mx-auto">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Button size="lg">Связаться с менеджером</Button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Services