import React from 'react'

const ProjectDetail = (data) => {
    console.log(data.project)
  return (
    <div>
      <h1 className='text-white'>{data.project.name}</h1>
    </div>
  )
}

export default ProjectDetail
