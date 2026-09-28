import { useParams, Link } from 'react-router-dom'
import { urlFor } from '../lib/sanityClient.js'
import ImageGallery from '../components/projects/ImageGallery.jsx'
import PersonBio from '../components/people/PersonBio.jsx'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { projectBySlugQuery } from '../lib/queries.js'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data: project, loading } = useSanityQuery(projectBySlugQuery, { slug })

  if (loading) return <p>Loading...</p>
  if (!project) return <NotFound />

  return (
    <>
      {project.category && <Link to={`/category/${project.category.slug}`}>{project.category.title}</Link>}
      <h1>{project.title}</h1>
      {project.subType && <p>{project.subType}</p>}
      {project.heroImage && <img src={urlFor(project.heroImage).width(1200).url()} alt={project.title} />}
      <h2>Overview</h2>
      <p>{project.overview}</p>
      {project.projectLink && <p><a href={project.projectLink} target="_blank" rel="noreferrer">View project</a></p>}
      <ImageGallery images={project.gallery} title={project.title} />
      <h2>Team</h2>
      {project.team?.map((p) => <PersonBio key={p.slug} person={p} />)}
    </>
  )
}
