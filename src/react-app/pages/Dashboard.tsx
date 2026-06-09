import { useState, useEffect, useRef } from "react";
import { 
  RefreshCw, 
  Expand, 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Languages,
  Copy,
  ArrowRight,
  Upload,
  File,
  X,
  Download,
  Trash2,      // Added for clear/reset
  Loader2,     // Spinner
  Hourglass,   // Hourglass
  Heart        // Heartbeat
} from "lucide-react";
import { ToolButton } from "@/react-app/components/ToolButton";
import { ToneSelector } from "@/react-app/components/ToneSelector";
import { LanguageSelector } from "@/react-app/components/LanguageSelector";
import { ContentTypeSelector, contentTypes } from "@/react-app/components/ContentTypeSelector";

type Tool = "rewrite" | "expand" | "summarize" | "grammar" | "tone" | "translate";

const tools = [
  { id: "rewrite" as Tool, label: "Optimize", icon: RefreshCw, description: "Improve product description" },
  { id: "expand" as Tool, label: "Expand", icon: Expand, description: "Add more product details" },
  { id: "summarize" as Tool, label: "Shorten", icon: FileText, description: "Create a shorter version" },
  { id: "grammar" as Tool, label: "Fix", icon: CheckCircle, description: "Clean and correct text" },
  { id: "tone" as Tool, label: "Style", icon: MessageSquare, description: "Adjust tone (luxury, casual)" },
  { id: "translate" as Tool, label: "Translate", icon: Languages, description: "Convert for global markets" },
];

const tones = ["Professional", "Casual", "Formal", "Friendly", "Persuasive", "Academic"];
const languages = ["Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Chinese", "Korean"];

export default function ToolPage() {
  const [selectedTool, setSelectedTool] = useState<Tool>("rewrite");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTone, setSelectedTone] = useState(tones[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedContentType, setSelectedContentType] = useState(contentTypes[0].id);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      alert("File is too large. Please upload a file smaller than 100KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text);
      setUploadedFile({ name: file.name, size: file.size });
    };
    reader.onerror = () => {
      alert("Failed to read file. Please try again.");
    };
    reader.readAsText(file);
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setInputText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Full reset function for inputs and outputs
  const handleResetAll = () => {
    setInputText("");
    setOutputText("");
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleProcess = async () => {
    if (!inputText.trim()) return;

    if (inputText.length > 10000) {
      alert("Text too long (max 10,000 characters)");
      return;
    }

    setIsProcessing(true);
    setOutputText("");

    try {
      const response = await fetch("https://my-backend-1-qzxx.onrender.com/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          tool: selectedTool,
          tone: selectedTool === "tone" ? selectedTone : undefined,
          language: selectedTool === "translate" ? selectedLanguage : undefined,
          contentType: selectedContentType,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const data = await response.json();
      setOutputText(data.result);

    } catch (error: any) {
      setOutputText(error.message || "Processing failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `NOAH Commerce-${selectedTool}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-sky-50 p-6 text-slate-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto space-y-6">
        
        {/* Content Type Selection */}
        <ContentTypeSelector 
          selectedType={selectedContentType} 
          onSelect={setSelectedContentType} 
        />

        {/* Tool Selection */}
        <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-semibold text-sky-600 mb-3 uppercase tracking-wider">Select a tool</h2>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <ToolButton
                key={tool.id}
                tool={tool}
                isSelected={selectedTool === tool.id}
                onClick={() => setSelectedTool(tool.id)}
              />
            ))}
          </div>
        </div>

        {/* Additional Options for Tone/Translate */}
        {selectedTool === "tone" && (
          <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-2xl p-5 shadow-sm">
            <ToneSelector tones={tones} selectedTone={selectedTone} onSelect={setSelectedTone} />
          </div>
        )}
        {selectedTool === "translate" && (
          <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-2xl p-5 shadow-sm">
            <LanguageSelector languages={languages} selectedLanguage={selectedLanguage} onSelect={setSelectedLanguage} />
          </div>
        )}

        {/* Main Workspace */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Input Panel */}
          <div className="bg-white border border-sky-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Source Text</label>
                <div className="flex items-center gap-2">
                  {uploadedFile && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-sky-100 text-sky-800 rounded text-xs">
                      <File className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">{uploadedFile.name}</span>
                      <button onClick={clearUploadedFile} className="hover:text-red-500 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <span className="text-xs text-slate-400">{inputText.length} chars</span>
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your product details here..."
                className="w-full h-64 p-3 bg-sky-50/30 border border-sky-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Actions Row */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleProcess}
                disabled={isProcessing || !inputText.trim()}
                className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 text-white rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 transition-all shadow-sm text-sm"
              >
                {isProcessing ? "Processing..." : "Generate Optimization"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetAll}
                title="Clear all fields"
                className="p-2.5 border border-sky-200 hover:bg-sky-100/50 text-slate-600 hover:text-slate-900 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <label className="p-2.5 border border-sky-200 hover:bg-sky-100/50 text-slate-600 hover:text-slate-900 rounded-xl transition-all cursor-pointer">
                <Upload className="w-4 h-4" />
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.md" className="hidden" />
              </label>
            </div>
          </div>

                  {/* Output Panel with Animated Loading Array */}
          <div className="bg-white border border-sky-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Optimized Results</label>
                {outputText && (
                  <div className="flex gap-1">
                    <button onClick={handleCopy} className="p-1.5 hover:bg-sky-50 rounded text-slate-500 hover:text-sky-600 transition-all" title="Copy text">
                      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={handleExport} className="p-1.5 hover:bg-sky-50 rounded text-slate-500 hover:text-sky-600 transition-all" title="Download text">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {isProcessing ? (
                <div className="w-full h-64 flex flex-col items-center justify-center bg-sky-50/20 border border-dashed border-sky-200 rounded-xl space-y-4">
                  <div className="flex items-center gap-4 text-sky-500">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <Hourglass className="w-6 h-6 animate-bounce" />
                    <Heart className="w-6 h-6 animate-pulse text-red-400" />
                  </div>
                  <p className="text-xs font-medium text-sky-600 animate-pulse tracking-wide">Enhancing your product messaging...</p>
                </div>
              ) : (
                <textarea
                  readOnly
                  value={outputText}
                  placeholder="Your generated alternative content will appear here..."
                  className="w-full h-64 p-3 bg-slate-50/50 border border-slate-100 rounded-xl resize-none focus:outline-none text-sm text-slate-700"
                />
              )}
            </div>
            
            <div className="text-[10px] text-slate-400 text-right pt-2 italic">
              Powered by NOAH Commerce Engine
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

