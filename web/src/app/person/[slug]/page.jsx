import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanityClient'
import { personBySlugQuery } from '@/lib/queries'
import PersonBio from '@/components/people/PersonBio'
import ProjectGrid from '@/components/projects/ProjectGrid'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const person = await sanityFetch(personBySlugQuery, { slug })
  if (!person) return {}

  const description = person.bio?.slice(0, 160)
  const image = person.photo ? urlFor(person.photo).width(600).height(600).url() : null

  return {
    title: person.name,
    description,
    openGraph: {
      title: person.name,
      description,
      images: image ? [{ url: image }] : [],
    },
  }
}

export default async function Person({ params }) {
  const { slug } = await params
  const person = await sanityFetch(personBySlugQuery, { slug })

  if (!person) notFound()

  return (
    <>
      <PersonBio person={{ ...person, slug }} />
      <h2>Projects</h2>
      <ProjectGrid projects={person.projects} />
    </>
  )
}
