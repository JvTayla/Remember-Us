import { useParams } from 'react-router-dom'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { categoryBySlugQuery, projectsByCategoryQuery } from '../lib/queries.js'

export default function Category() {
  const { slug } = useParams()
  const { data: category } = useSanityQuery(categoryBySlugQuery, { slug })
  const { data: projects, loading } = useSanityQuery(projectsByCategoryQuery, { slug })

  return (
    <>
      <h1>{category?.title || 'Category'}</h1>
      {loading ? <p>Loading...</p> : <ProjectGrid projects={projects} />}
    </>
  )
}
