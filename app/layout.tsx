import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eliot Hall",
  description: "Christopher Eliot Hall's personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="4-TT-_bV4-uVAauHt7W8PZTkhvasbrU2t_B2Q9z4SyY" />
      <body className={inter.className + " break-words"}>{children}</body>
    </html>
  )
}
