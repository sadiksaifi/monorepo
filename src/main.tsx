import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './components/Post'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'blog',
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Blog /> },
          {
            path: ':id',
            element: <Post />,
          }
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
