import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "uimate - AI-Powered UI Design Analysis",
  description: "Get professional UI design reviews powered by artificial intelligence",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css"
        />
        <title>uimate — ai reviewer of ui & design</title>
<meta name="title" content="uimate — ai reviewer of ui & design" />
<meta name="description" content="with uimate you don't have to worry about design, you just code. uimate gives you recommendations to build cool looking websites and apps!" />


<meta property="og:type" content="website" />
<meta property="og:url" content="https://uimate-ai.vercel.app/" />
<meta property="og:title" content="uimate — ai reviewer of ui & design" />
<meta property="og:description" content="with uimate you don't have to worry about design, you just code. uimate gives you recommendations to build cool looking websites and apps!" />
<meta property="og:image" content="/logo.png" />


<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://uimate-ai.vercel.app/" />
<meta property="twitter:title" content="uimate — ai reviewer of ui & design" />
<meta property="twitter:description" content="with uimate you don't have to worry about design, you just code. uimate gives you recommendations to build cool looking websites and apps!" />
<meta property="twitter:image" content="/logo.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'