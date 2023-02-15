import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Error404 from '../src/containers/errors/Error404';
import Home from '../src/containers/pages/Home';
import Cases from '../src/containers/pages/Cases';
import Services from '../src/containers/pages/Services';
import About from '../src/containers/pages/About';
import Blog from '../src/containers/pages/Blog';
import Category from '../src/containers/pages/Category';
import Search from '../src/containers/pages/Search';
// import Careers from '../src/containers/pages/Careers';
// import Contact from '../src/containers/pages/Contact';
import PostDetail from '../src/containers/pages/PostDetail';

import Dashboard from './containers/pages/dashboard/Dashboard';
import DashboardHome from './containers/pages/dashboard/Home';
import DashboardBlog  from './containers/pages/dashboard/Blog';


function AnimatedRoutes() {

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Error Display */}
        <Route path="*" element={<Error404 />} />

        {/* Home Display */}
        <Route path="/" element={<Home />} />
        <Route path="/casos" element={<Cases />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/nosotros" element={<About />} />
        {/* <Route path="/carreras" element={<Careers />} /> */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<PostDetail />} />
        <Route path="/s/:term" element={<Search />} />
        <Route path="/category/:slug" element={<Category />} />
        {/* <Route path="/contacto" element={<Contact />} /> */}

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/home" element={<DashboardHome />} />
        <Route path="/dashboard/blog" element={<DashboardBlog />} />
      </Routes>
    </AnimatePresence>
  )
}
export default AnimatedRoutes