import { useParams } from 'react-router-dom'
import PersonBio from '../components/people/PersonBio.jsx'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { personBySlugQuery } from '../lib/queries.js'
import NotFound from './NotFound.jsx'

export default function Person() {
  const { slug } = useParams()
  const { data: person, loading } = useSanityQuery(personBySlugQuery, { slug })

  if (loading) return <p>Loading...</p>
  if (!person) return <NotFound />

  return (
    <>
      <PersonBio person={{ ...person, slug }} />
      <h2>Projects</h2>
      <ProjectGrid projects={person.projects} />
    </>
  )
}
