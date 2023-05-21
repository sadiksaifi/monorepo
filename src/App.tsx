import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className='px-4 xl:px-28 2xl:px-96'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App
