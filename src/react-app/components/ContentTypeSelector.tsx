export type UseCase =
  | "legal"
  | "real_estate"
  | "email"
  | "career"
  | "social"
  | "marketing"
  | "ads"
  | "support"
  | "flowcharts"
  | "comparisons"
  | "video_reviews"
  | "listicles"
  | "seasonal_content"
  | "case_studies"
  | "ebooks"
  | "collaborations"
  | "quote_cards";

type ContentType = {
  id: UseCase;
  label: string;
};

export const contentTypes: ContentType[] = [
  { id: "legal", label: "Legal Assistant" },
  { id: "real_estate", label: "Real Estate Listing" },
  { id: "email", label: "Professional Email" },
  { id: "career", label: "Career Tools" },
  { id: "social", label: "Social Media Content" },
  { id: "marketing", label: "Marketing Strategy" },
  { id: "ads", label: "Ad Copy" },
  { id: "support", label: "Customer Support" },

  { id: "flowcharts", label: "Flowcharts & Checklists" },
  { id: "comparisons", label: "Comparisons" },
  { id: "video_reviews", label: "Video Reviews & Testimonials" },
  { id: "listicles", label: "Listicles" },
  { id: "seasonal_content", label: "Seasonal Content" },
  { id: "case_studies", label: "Case Studies & Use Cases" },
  { id: "ebooks", label: "eBooks & Whitepapers" },
  { id: "collaborations", label: "Collaborations & Partnerships" },
  { id: "quote_cards", label: "Quote Cards" }
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