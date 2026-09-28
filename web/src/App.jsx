import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Category from './pages/Category.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Person from './pages/Person.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/person/:slug" element={<Person />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
