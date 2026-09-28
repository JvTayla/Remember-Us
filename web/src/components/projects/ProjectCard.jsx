import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/sanityClient.js'

export default function ProjectCard({ project }) {
  return (
    <Link to={`/project/${project.slug}`} className="card">
      {project.heroImage && (
        <img src={urlFor(project.heroImage).width(600).height(450).url()} alt={project.title} loading="lazy" />
      )}
      <h3>{project.title}</h3>
      {project.subType && <small>{project.subType}</small>}
      {project.shortDescription && <p>{project.shortDescription}</p>}
    </Link>
  )
}
