
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomizationOptionsProps {
  onLengthChange: (length: number) => void;
  onStyleChange: (style: string) => void;
  onSimplifyToggle: (simplify: boolean) => void;
}

const CustomizationOptions: React.FC<CustomizationOptionsProps> = ({
  onLengthChange,
  onStyleChange,
  onSimplifyToggle,
}) => {
  return (
    <div className="space-y-6 bg-white p-5 rounded-lg shadow-sm border">
      <h3 className="font-medium text-lg mb-4">Customize your summary</h3>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="summary-length">Summary Length</Label>
            <span className="text-sm text-gray-500">Medium</span>
          </div>
          <Slider
            id="summary-length"
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(values) => onLengthChange(values[0])}
            className="my-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <Label htmlFor="summary-style">Writing Style</Label>
          <Select defaultValue="neutral" onValueChange={onStyleChange}>
            <SelectTrigger id="summary-style" className="w-full">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="simplify-toggle" className="cursor-pointer">Simplify Language</Label>
          <Switch 
            id="simplify-toggle"
            onCheckedChange={onSimplifyToggle}
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mt-4">
        Bullet points, quotes or a full abstract? Choose the format that works best for you. Provide your own summary instructions or let our AI do the work for you.
      </p>
    </div>
  );
};

export default CustomizationOptions;
