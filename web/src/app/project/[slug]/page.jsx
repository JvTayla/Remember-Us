import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanityClient'
import { projectBySlugQuery } from '@/lib/queries'
import ImageGallery from '@/components/projects/ImageGallery'
import PersonBio from '@/components/people/PersonBio'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await sanityFetch(projectBySlugQuery, { slug })
  if (!project) return {}

  const description = project.shortDescription || project.overview?.slice(0, 160)
  const image = project.heroImage ? urlFor(project.heroImage).width(1200).height(630).url() : null

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params
  const project = await sanityFetch(projectBySlugQuery, { slug })

  if (!project) notFound()

  return (
    <>
      {project.category && <Link href={`/category/${project.category.slug}`}>{project.category.title}</Link>}
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
