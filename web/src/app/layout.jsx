import localFont from 'next/font/local'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/styles/reset.css'
import '@/styles/variables.css'
import '@/styles/global.css'

// "Save the date" font. Put prakta.ttf in src/fonts/ (path is relative to this file).
const graffiti = localFont({ src: '../fonts/prakta.ttf', variable: '--font-graffiti' })

// "EXHIBITION '26" font
const display = localFont({
  src: '../fonts/YESTER.ttf',
  variable: '--font-display',
  display: 'swap',
})

// TODO: swap these for your real fonts later. Until then the CSS falls back to defaults.
// const title = localFont({ src: '../fonts/YourRansomFont.woff2', variable: '--font-title' })     // "REMEMBER US"
// const display = localFont({ src: '../fonts/YourBlockFont.woff2', variable: '--font-display' })  // "EXHIBITION '26"
// const serif = localFont({
//   src: [
//     { path: '../fonts/YourSerifFont-Regular.woff2', weight: '400' },
//     { path: '../fonts/YourSerifFont-Bold.woff2', weight: '700' },
//   ],
//   variable: '--font-serif',
// })
// ...then add `${title.variable} ${display.variable} ${serif.variable}` to the <body> className below.

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
    <body className={`${graffiti.variable} ${display.variable}`}>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
