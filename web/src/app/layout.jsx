import localFont from 'next/font/local'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/styles/reset.css'
import '@/styles/variables.css'
import '@/styles/global.css'


const graffiti = localFont({ src: '../fonts/aAnotherTag.ttf', variable: '--font-graffiti' }) // "Save the date" font
const display = localFont({ src: '../fonts/YESTER.ttf', variable: '--font-display', display: 'swap', }) // "EXHIBITION '26" font
const title = localFont({ src: '../fonts/WhiteOnBlack.ttf', variable: '--font-title' })     // "REMEMBER US"



const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Remember Us - Creative Project Showcase',
    template: '%s | Remember Us',
  },
  description: '4th year creative project showcase: AI + IM, Animations, Games, and Narrative & Visual Design.',
  openGraph: {
    siteName: 'Remember Us',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${graffiti.variable} ${display.variable} ${title.variable}`}>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
