// src/react-app/components/ToolButton.tsx
import { LucideIcon } from "lucide-react";

interface Tool {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

interface ToolButtonProps {
  tool: Tool;
  isSelected: boolean;
  onClick: () => void;
}

export function ToolButton({ tool, isSelected, onClick }: ToolButtonProps) {
  const Icon = tool.icon;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all border-2
        ${isSelected 
          ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white shadow-md shadow-purple-200/50 scale-[1.02]" 
          : "bg-white border-purple-100 text-purple-800 hover:border-purple-300 hover:text-purple-950 shadow-sm"
        }
      `}
    >
      <Icon className={`w-4 h-4 transition-colors ${isSelected ? "text-white" : "text-purple-500"}`} />
      {tool.label}
    </button>
  );
}
