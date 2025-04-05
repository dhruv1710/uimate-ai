import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Eye, Layout, Shield, ArrowRight } from "lucide-react"
import AiSphere from "@/components/ai-sphere"
import FeatureCard from "@/components/feature-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWebsite from "./components/FloatingWebsite"
import ClipLoader from "react-spinners/ClipLoader"
import { useState } from "react"
import Script from "next/script"

export default function Home() {

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>

      <Navbar />

      <main className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-col items-center justify-between gap-12 py-16">
          <div className="text-center space-y-6">
            <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors border-0 px-3 py-1">
              Next-Gen UI Analysis
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              AI-Powered Design Reviews
            </h1>
            <p className="mx-auto text-lg text-slate-300 max-w-xl">
              Elevate your UI with our cutting-edge AI analysis. Get instant, professional feedback on your designs and
              transform your user experience
            </p>
            <div 
              id="getWaitlistContainer" 
              data-waitlist_id="27036" 
              data-widget_type="WIDGET_3"
              className="mx-auto"
            ></div>
            {/* <div className="pt-4">
              <div className="relative  ">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
                <Card className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-lg p-2 flex">
                  <Input
                    
                    placeholder="Enter your website URL"
                    className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button 
                  
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 ml-2">

                    
                "Sign up for waitlist"
              
                   
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              </div>
              <p className="text-xs text-slate-400 mt-2 ml-1">Free forever</p>
            </div> */}
          </div>

          <div className="">
            <FloatingWebsite />
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your UI Design</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our AI analyzes every aspect of your interface to deliver actionable insights and professional
              recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye />}
              title="Visual Analysis"
              description="AI-powered assessment of visual hierarchy, color theory, and design consistency."
            />
            <FeatureCard
              icon={<Layout />}
              title="Layout Optimization"
              description="Get recommendations for improved spacing, alignment, and responsive behavior."
            />
            <FeatureCard
              icon={<Zap />}
              title="Performance Insights"
              description="Identify UI elements that might impact your site's loading speed and performance."
            />
            <FeatureCard
              icon={<Shield />}
              title="Accessibility Check"
              description="Ensure your design meets WCAG standards and is usable by everyone."
            />
            <FeatureCard
              icon={<Sparkles />}
              title="Trend Analysis"
              description="Compare your design against current industry trends and best practices."
            />
            <FeatureCard
              icon={<ArrowRight />}
              title="Actionable Feedback"
              description="Receive clear, implementable suggestions to enhance your design."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold">Ready to transform your UI?</h3>
                <p className="text-slate-300 max-w-md">
                  Join the elite designers using AI to perfect their interfaces.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button className="relative px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-lg text-lg">
                  Summon AI Review
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
      <Script 
        src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"
        strategy="afterInteractive"
      />
    </div>
  )
}

