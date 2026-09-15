import './globals.css'
import settings from '../src/config/setting.js'

export const metadata = {
  title: `${settings.name} | Modern & High Performance REST APIs`,
  description: settings.description,
  icons: {
    icon: settings.icon,
    shortcut: settings.icon,
    apple: settings.icon
  },
  openGraph: {
    title: settings.name,
    description: settings.description,
    images: [
      {
        url: settings.icon,
        width: 800,
        height: 800,
        alt: settings.name
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={settings.icon} sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
