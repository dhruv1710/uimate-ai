'use client'; 

import { Card } from "@/components/ui/card"
import { ArrowRight, AlertTriangle } from "lucide-react" 
import Uimate from "@/components/uimate"
import { useRouter } from "next/navigation" 
import { useState } from "react"; 
import ClipLoader from "react-spinners/ClipLoader"; 
import { useWebsiteStore } from "@/stores/website_store";

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetUserDescription, setTargetUserDescription] = useState(''); 
  const {url} = useWebsiteStore();
  const router = useRouter();

  const handleAnalyze = async () => {
    setIsLoading(true);
    
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "url": url,
        "target_user_description": targetUserDescription
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      const api_url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch( `${api_url}/analyze-website/`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(`API error ${response.status}: ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();

      sessionStorage.setItem('analysisReportData', JSON.stringify(data));
      router.push('/report');

    } catch (err: any) {
      console.error("Analysis API call failed:", err);
      setError(err.message || "Failed to analyze website.");
      setIsLoading(false); 
    }
    setIsLoading(false); 
  };

  return (
    <div className="min-h-screen bg-[#1B1D2A] text-white mx-auto">
      <div className="text-center py-10 mx-auto">
        <a href="/" className="text-center mx-auto">
          <Uimate />
          {url}
        </a>
      </div>
      
      <main className="container mx-auto px-4 pb-20"> 
        <Card className="max-w-2xl mx-auto bg-[#2A2D3C] border-0 p-12 rounded-3xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Describe the target user</h1>
              <div className="h-32">
                <textarea 
                  className="w-full h-full bg-transparent text-lg focus:outline-none resize-none"
                  placeholder="The user will be 17yo and tech savvy from a city"
                  value={targetUserDescription}
                  onChange={(e) => setTargetUserDescription(e.target.value)}
                  disabled={isLoading} 
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-900/30 border border-red-700 p-3 rounded-lg">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button 
                onClick={handleAnalyze}
                disabled={isLoading} 
                className={`bg-[#4F5CD1] hover:bg-[#4F5CD1]/90 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 text-lg transition-opacity ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  <>Analyze <ArrowRight className="h-5 w-5" /></>
                )}
              </button>
            </div>
          </div>
        </Card>
      </main>
      {isLoading && (<div className="min-h-screen min-w-screen bg-[#1B1D2A] z-50 fixed inset-0 flex flex-col items-center justify-center ">
        <a href="/" className="inline-block mb-12">
          <Uimate /> 
        </a>
        <ClipLoader color="#ffffff" size={50} />
        <p className="text-xl mt-4">Analyzing your design... This may take a while</p>
      </div>)}
    </div>
  )
}