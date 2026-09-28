import Countdown from '@/components/countdown/Countdown'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { sanityFetch } from '@/lib/sanityClient'
import { siteSettingsQuery, projectsQuery } from '@/lib/queries'

export default async function Home() {
  const [settings, projects] = await Promise.all([
    sanityFetch(siteSettingsQuery),
    sanityFetch(projectsQuery),
  ])

  return (
    <>
      <h1>Remember Us</h1>
      <p>{settings?.tagline || 'Creative Project Showcase'}</p>
      <Countdown eventDate={settings?.eventDate} eventLocation={settings?.eventLocation} />
      <h2>Projects</h2>
      <ProjectGrid projects={projects} />
    </>
  )
}
