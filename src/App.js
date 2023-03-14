import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Blog from './components/Blog'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
    <div className='px-4 xl:px-28 2xl:px-96'>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='blog' element={ <Blog /> } />
      </Routes>
    </div>
      <Footer />
    </div>
  );
}

export default App
