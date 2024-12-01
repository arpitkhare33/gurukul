import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from '@/components/ui/Navbar'
import RegisterForm from '@/pages/RegisterForm'
import { SignInForm } from './pages/SignInForm'
import { CourseCard } from './components/custom/CourseCard'
import CoursePage from './pages/CoursePage'
import { CourseCreator } from './pages/CourseCreator'
import { SessionManager } from './pages/SessionManager'
function App() {


  return (
    <>

      <Navbar />
      {/* <SessionManager/> */}
    <Routes>
      {/* <Route path='/' element={</>}   /> */}
      <Route path='/register' element={<RegisterForm/>}   />
      <Route path='/signin' element={<SignInForm/>}   />
      <Route path='/courses' element={<CoursePage/>}/>
      <Route path='/course_creator' element={<CourseCreator/>}/>
      <Route path='/manage_sessions' element={<SessionManager/>}/>
      
    </Routes>
    </>
  )
}

export default App
