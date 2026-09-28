import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }) {
  if (!projects?.length) return <p>No projects yet.</p>
  return (
    <div className="grid">
      {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
    </div>
  )
}
