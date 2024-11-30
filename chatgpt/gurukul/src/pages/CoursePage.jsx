import React from 'react'
import { CourseCard } from '../components/custom/CourseCard'

function CoursePage() {
  return (
    <div className='mt-20 ml-10'>
        <h3 className='text-lg font-semibold'>Good Morning Arpit, welcome to your learning path...</h3>
        <div className='cardContainer flex'>
        <CourseCard title={"Social Media Addiction"} image={"../public/profile.png"} completionPercentage={45} />
        <CourseCard title={"Social Media Addiction"} image={"../public/profile.png"} completionPercentage={45} />
        
        <CourseCard title={"Social Media Addiction"} image={"../public/profile.png"} completionPercentage={45} />
        <CourseCard title={"Social Media Addiction"} image={"../public/profile.png"} completionPercentage={45} />

        </div>
    </div>
  )
}

export default CoursePage