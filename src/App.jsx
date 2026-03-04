import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from "./Pages/Home"
import Courses from "./Pages/Courses"
import Services from "./Pages/Services"
import News from "./Pages/News"
import DetailPage from "./Pages/DetailPage"

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "courses",
          element: <Courses />
        },
        {
          path: "services",
          element: <Services />
        },
        {
          path: "news",
          element: <News />
        },
        {
          path: "detail/:type/:id",
          element: <DetailPage />
        }
      ]
    }
  ], {
    future: {
      v7_startTransition: true
    }
  });

  return <RouterProvider router={router} />
}

export default App