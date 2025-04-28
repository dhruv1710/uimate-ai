'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Palette, Accessibility, CheckCircle, AlertTriangle } from "lucide-react"
import Uimate from "@/components/uimate"
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation';

interface Score {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

interface Recommendation {
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface ReportData {
  scores: Score[];
  recommendations: Recommendation[];
}

const getIconComponent = (iconName: string): React.ReactNode => {
  switch (iconName?.toLowerCase()) {
    case 'lightbulb': return <Lightbulb className="h-5 w-5 text-yellow-400" />;
    case 'palette': return <Palette className="h-5 w-5 text-pink-400" />;
    case 'accessibility': return <Accessibility className="h-5 w-5 text-blue-400" />;
    case 'checkcircle': return <CheckCircle className="h-4 w-4 mr-2" />;
    case 'rec-accessibility': return <Accessibility className="h-4 w-4 mr-2" />;
    case 'rec-lightbulb': return <Lightbulb className="h-4 w-4 mr-2" />;
    case 'rec-palette': return <Palette className="h-4 w-4 mr-2" />;
    default: return <Lightbulb className="h-5 w-5 px-5 text-yellow-400" />;
  }
};

const getScoreColorClass = (title: string): string => {
  switch (title.toLowerCase()) {
    case 'usability': return 'bg-yellow-500';
    case 'aesthetics': return 'bg-pink-500';
    case 'accessibility': return 'bg-blue-500';
    default: return 'bg-blue-500';
  }
};

const getSeverityBadgeVariant = (severity: string): "destructive" | "warning" | "default" | "outline" | "secondary" | null | undefined => {
  switch (severity.toLowerCase()) {
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'secondary';
    default: return 'outline';
  }
};

export default function ReportPage() {
  const [reportData, setReportData] = useState<ReportData | null | 'not_found'>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedData = sessionStorage.getItem('analysisReportData');

        if (!storedData) {
          console.warn("No analysis data found in sessionStorage.");
          setReportData('not_found');
          setLoading(false);
          return;
        }

        const data = JSON.parse(storedData);

        const processedData: ReportData = {
          scores: data.analysis.scores.map((score: any) => ({
            ...score,
            icon: getIconComponent(score.title),
            color: getScoreColorClass(score.title)
          })),
          recommendations: data.analysis.recommendations.map((rec: any) => ({
            ...rec,
            icon: getIconComponent(`rec-${rec.severity?.toLowerCase() || 'low'}`)
          }))
        };
        setReportData(processedData);

      } catch (err: any) {
        console.error("Failed to read or process report data:", err);
        setError(err.message || "Failed to load report data from storage. It might be corrupted.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1B1D2A] to-[#11131E] text-white">
        <div className="text-center mb-12">
          <a href="/" className="inline-block">
            <Uimate /> 
          </a>
        </div>
        <ClipLoader color="#3b82f6" size={50} />
        <p className="text-xl mt-4">Loading Analysis Report...</p>
      </div>
    );
  }

  if (reportData === 'not_found') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1B1D2A] to-[#11131E] text-white px-4 py-10">
        <div className="text-center mb-12">
          <a href="/" className="inline-block">
            <Uimate /> 
          </a>
        </div>
        <p className="text-xl text-center mb-4">No analysis data found.</p>
        <button onClick={() => router.push('/analyze')} className="text-blue-400 hover:text-blue-300">Run a new analysis</button>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1B1D2A] to-[#11131E] text-white px-4 py-10">
        <div className="text-center mb-12">
          <Uimate /> 
        </div>
        <Card className="bg-red-900/30 border border-red-700 p-6 max-w-lg text-center">
          <CardHeader className="flex flex-row items-center justify-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-400">Error Loading Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-200">{error || "Could not process report data."}</p>
            <button onClick={() => router.push('/analyze')} className="mt-4 text-blue-400 hover:text-blue-300">Try analysis again</button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1D2A] to-[#11131E] text-white mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <a href="/" className="inline-block">
          <Uimate /> 
        </a>
      </div>
      <main className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
          Your AI UI Analysis Report
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-slate-300">Overall Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportData.scores.map((score, index) => (
              <Card key={index} className="bg-[#2A2D3C]/50 border border-slate-700 backdrop-blur-sm transition-all hover:border-blue-500/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    {score.icon}
                    {score.title}
                  </CardTitle>
                  <span className="text-lg font-bold text-white">{score.value}</span>
                </CardHeader>
                <CardContent>
                  <Progress value={score.value} className={`h-2 ${score.color}`} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-slate-300">Recommendations</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {reportData.recommendations.map((rec, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-[#2A2D3C]/50 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:border-blue-500/50 px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center text-base font-medium text-slate-100">
                      {rec.icon}
                      {rec.title}
                    </span>
                    <Badge variant={getSeverityBadgeVariant('medium')}>{'medium'}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-slate-300 text-sm">
                  {rec.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </main>
      
      <div className="text-center mt-16">
         {/* Example: <Button variant="outline">Analyze Another URL</Button> */}
      </div>
    </div>
  )
}
