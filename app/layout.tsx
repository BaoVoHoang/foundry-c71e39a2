import type { Metadata } from 'next'
import './layout.css'

export const metadata: Metadata = {
  title: 'BasicCalc',
  description: 'A simple calculator app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
