import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AgreementProvider } from '@/lib/AgreementContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Equal Agreement Portal',
  description: 'Create and customise your agreement with Equal',
  icons: {
    icon: '/eq-logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AgreementProvider>
          {children}
        </AgreementProvider>
      </body>
    </html>
  )
} 