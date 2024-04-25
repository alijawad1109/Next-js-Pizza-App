import React from 'react'
import WorkStory from '@/app/components/layout/WorkStory';
import WorkExperience from '@/app/components/layout/WorkExperience';
import StoryLocation from '@/app/components/layout/StoryLocation';
import OwnerStory from '@/app/components/layout/OwnerStory';
import Footer from '../components/layout/Footer';
const page = () => {
  return (
    <div className='w-[100%]'>
    <StoryLocation/>
    <WorkStory/>
    <WorkExperience/>
    <OwnerStory/>
    <Footer/>
    </div>
  )
}

export default page