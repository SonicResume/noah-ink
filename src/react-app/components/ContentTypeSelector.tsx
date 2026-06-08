// src/react-app/components/ContentTypeSelector.tsx
type UseCase =

  | "legal"
  | "product"
  | "real_estate"

  | "email"
  | "career"
  | "social";

type ContentType = {
  id: UseCase;
  label: string;
};

export const contentTypes: ContentType[] = [
  { id: "legal", label: "Legal" },
  { id: "product", label: "Product Description" },
  { id: "real_estate", label: "Real Estate" },
  { id: "email", label: "Professional Email" },
  { id: "career", label: "Career" },
  { id: "social", label: "Social Media" }
];

type Props = {
  selectedType: UseCase;
  onSelect: (id: UseCase) => void;
};

export function ContentTypeSelector({ selectedType, onSelect }: Props) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-bold text-purple-900 mb-4 uppercase tracking-wider">
        Select Use Case
      </h2>

      <div className="flex flex-wrap gap-2">
        {contentTypes.map((item) => {
          const isSelected = selectedType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2
                ${isSelected
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white shadow-md shadow-purple-200/50 scale-[1.02]"
                  : "bg-white border-purple-100 text-purple-800 hover:border-purple-300 hover:text-purple-950 shadow-sm"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
