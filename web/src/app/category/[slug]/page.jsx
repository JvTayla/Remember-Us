import { notFound } from 'next/navigation'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { sanityFetch } from '@/lib/sanityClient'
import { categoryBySlugQuery, projectsByCategoryQuery } from '@/lib/queries'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = await sanityFetch(categoryBySlugQuery, { slug })
  if (!category) return {}
  return {
    title: category.title,
    description: `${category.title} projects from the Remember Us 4th year exhibition.`,
  }
}

export default async function Category({ params }) {
  const { slug } = await params
  const [category, projects] = await Promise.all([
    sanityFetch(categoryBySlugQuery, { slug }),
    sanityFetch(projectsByCategoryQuery, { slug }),
  ])

  if (!category) notFound()

  return (
    <>
      <h1>{category.title}</h1>
      <ProjectGrid projects={projects} />
    </>
  )
}
