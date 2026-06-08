// src/react-app/components/LanguageSelector.tsx
interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

export function LanguageSelector({ languages, selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <div className="mb-6 animate-in fade-in duration-200">
      <h3 className="text-sm font-bold text-purple-900 mb-3 uppercase tracking-wider">
        Translate to
      </h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => {
          const isSelected = selectedLanguage === language;
          return (
            <button
              key={language}
              type="button"
              onClick={() => onSelect(language)}
              className={`
                px-4 py-2 rounded-xl text-sm font-bold transition-all border-2
                ${isSelected 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white shadow-md shadow-purple-200/50 scale-[1.02]" 
                  : "bg-white border-purple-100 text-purple-800 hover:border-purple-300 hover:text-purple-950 shadow-sm"
                }
              `}
            >
              {language}
            </button>
          );
        })}
      </div>
    </div>
  );
}
