import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Richmond Works',
  description: 'How do we expect a modern city to work? Does Richmond, Virginia work like that? How does it work?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="lg:flex gap-x-12 mx-auto max-w-screen-xl mt-8 px-4 xl:px-0">
          <header className="lg:mb-0 mb-12">
            <Link href="/">
              <div className="flex items-end mx-auto max-w-2xl">
                <div className="text-xl mr-5 leading-none font-bold">Richmond<br />Works</div>
                <img src="/line.png" style={{
                  height: "75px"
                }}>
                </img>
              </div>
            </Link>
          </header>
          <div className="">
            {children}
          </div>
        </div>
        <footer className="mt-12">
          <div className="lg:flex mx-auto max-w-screen-xl py-12 px-4 xl:px-0 border-t-2 border-gray-200">
          </div>
        </footer>
      </body>
    </html>
  )
}
