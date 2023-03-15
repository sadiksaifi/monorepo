import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Pages from './components/Blog/Pages'
import data from './components/Blog/data'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='px-4 xl:px-28 2xl:px-96'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/blog'>
            <Route index element={<Blog />} />
            {data.map((item, index) => (
              <Route path={item.title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')}
                key={index}
                element={<Pages
                  img={item.img}
                  title={item.title}
                  desc={item.desc} 
                 />}
              />
            ))}
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
