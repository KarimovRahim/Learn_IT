import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { HashLink } from 'react-router-hash-link';
import Section from '../Components/UI/Section'
import Button from '../Components/UI/Button'

// MUI Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Courses = () => {
  // 1. Хуки должны быть ВНУТРИ компонента
  const [data, setData] = useState([]);

  // 2. Функция загрузки тоже внутри (или вынесена в отдельный сервис)
  async function getCourses() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_POCKETBASE_URL || 'https://ehjoi-manaviyat.pockethost.io'}/api/collections/learn_it_courses/records?page=1&perPage=50`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const json = await res.json();
      const records = json.items;

      const formattedData = records.map((rec) => ({
        id: rec.id,
        imageCourse: `${import.meta.env.VITE_POCKETBASE_URL || 'https://ehjoi-manaviyat.pockethost.io'}/api/files/${rec.collectionId}/${rec.id}/${rec.image}`,
        months: rec.months,
        nameCourse: rec.nameCourse,
        tags: rec.tags, 
        description: rec.description,
        price: rec.price,
        rate: rec.rate,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

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

        <div className="bg-gray-50/50 dark:bg-transparent transition-colors duration-300 rounded-3xl p-2 md:p-8">
          <div id="secioncours" className="max-w-[1440px] mx-auto pb-10">
            <div className="flex flex-col gap-[20px] mb-12">
              <h2 className="text-[32px] md:text-[38px] font-bold dark:text-white">Наши программы обучения</h2>
              <p className="text-[16px] text-[#8A8A8A] max-w-[800px] dark:text-zinc-400">
                Курсы Learn IT – это практические знания, необходимые для успешной карьеры в ИТ-индустрии.
              </p>
            </div>

            {/* Сетка карточек */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((element, index) => (
                <div
                  key={element.id}
                  className="bg-white border border-black/10 rounded-3xl p-6 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 group dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500/30 shadow-sm hover:shadow-xl"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700 mb-2 dark:bg-red-500/10 dark:text-red-400">
                        Курс
                      </span>
                      <h3 className="text-xl font-bold text-black group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-500">
                        {element.nameCourse}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <StarIcon sx={{ fontSize: 18 }} />
                      <span className="text-sm font-medium text-black dark:text-white">
                        {element.rate}
                      </span>
                    </div>
                  </div>

                  <div className="relative mb-4 overflow-hidden rounded-2xl h-44">
                    <img
                      src={element.imageCourse}
                      alt={element.nameCourse}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="text-black/70 text-sm dark:text-zinc-400 mb-6 line-clamp-3 min-h-[60px]">
                    {parse(element.description)}
                  </div>

                  <div className="space-y-3 mb-6 border-t border-gray-100 dark:border-zinc-800 pt-4">
                    <div className="flex items-center gap-2 text-sm text-black/60 dark:text-zinc-400">
                      <CalendarMonthIcon sx={{ fontSize: 18 }} className="text-red-600 dark:text-red-500" />
                      <span>Длительность: {element.months}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-black/60 dark:text-zinc-400">
                      <PaymentsIcon sx={{ fontSize: 18 }} className="text-red-600 dark:text-red-500" />
                      <span className="text-black font-bold dark:text-white">
                        Стоимость: {element.price} сомони
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {element.tags?.split(',').map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-black/50 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                          <CheckCircleOutlineIcon sx={{ fontSize: 12 }} className="text-red-600" />
                          {tag.trim()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <HashLink
                    smooth
                    to="/#contacts"
                    className="flex items-center justify-between w-full px-6 py-4 bg-white text-black rounded-2xl border border-solid border-red-600 group/btn hover:bg-red-600 transition-all duration-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-red-500 dark:hover:text-black"
                  >
                    <span className="font-bold text-sm">Записаться на курс</span>
                    <ArrowForwardIcon className="group-hover/btn:translate-x-1 transition-transform" />
                  </HashLink>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16 pb-10">
          <h2 className="text-2xl font-bold text-black mb-4 dark:text-white">
            Не нашли подходящий курс?
          </h2>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto dark:text-zinc-400">
            Напишите нам, и мы поможем подобрать индивидуальную программу обучения под ваши цели.
          </p>
          <HashLink smooth to="/#contacts">
            <Button size="lg" className="rounded-full px-10">Связаться с менеджером</Button>
          </HashLink>
        </div>
      </Section>
    </div>
  )
}

export default Courses;