
import React from 'react';
import { Button } from "@/components/ui/button";
import { Target, Zap, MessageSquareText, ScanText, FileText, Laugh } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SummaryType = 'bullet' | 'custom' | 'chat' | 'tldr' | 'detailed' | 'sarcastic';

interface SummaryOptionsProps {
  selectedType: SummaryType;
  onTypeSelect: (type: SummaryType) => void;
}

interface SummaryOptionItem {
  type: SummaryType;
  label: string;
  icon: React.ElementType;
  description: string;
}

const summaryOptions: SummaryOptionItem[] = [
  {
    type: 'bullet',
    label: 'Bullet points',
    icon: Target,
    description: 'Key points in a bulleted list'
  },
  {
    type: 'custom',
    label: 'Custom summary',
    icon: Zap,
    description: 'Customized to your needs'
  },
  {
    type: 'chat',
    label: 'Chat',
    icon: MessageSquareText,
    description: 'Interactive Q&A with your document'
  },
  {
    type: 'tldr',
    label: 'TL;DR',
    icon: ScanText,
    description: 'Ultra-concise overview'
  },
  {
    type: 'detailed',
    label: 'Detailed',
    icon: FileText,
    description: 'Comprehensive breakdown'
  },
  {
    type: 'sarcastic',
    label: 'Sarcastic',
    icon: Laugh,
    description: 'Summary with a sarcastic tone'
  }
];

const SummaryOptions: React.FC<SummaryOptionsProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {summaryOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedType === option.type;
        
        return (
          <Button
            key={option.type}
            variant="outline"
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm border transition-all",
              isSelected 
                ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white" 
                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            )}
            onClick={() => onTypeSelect(option.type)}
          >
            <Icon className={cn("w-4 h-4", isSelected ? "text-white" : "text-primary")} />
            <span>{option.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default SummaryOptions;
