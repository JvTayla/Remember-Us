import Countdown from '../components/countdown/Countdown.jsx'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { siteSettingsQuery, projectsQuery } from '../lib/queries.js'

export default function Home() {
  const { data: settings } = useSanityQuery(siteSettingsQuery)
  const { data: projects, loading } = useSanityQuery(projectsQuery)

  return (
    <>
      <h1>Remember Us</h1>
      <p>{settings?.tagline || 'Creative Project Showcase'}</p>
      <Countdown eventDate={settings?.eventDate} eventLocation={settings?.eventLocation} />
      <h2>Projects</h2>
      {loading ? <p>Loading...</p> : <ProjectGrid projects={projects} />}
    </>
  )
}
