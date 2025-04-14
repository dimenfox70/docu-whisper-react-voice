
import React from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Language {
  value: string;
  label: string;
  icon?: string;
}

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

const languages: Language[] = [
  { value: "en", label: "English", icon: "🇬🇧" },
  { value: "es", label: "Spanish", icon: "🇪🇸" },
  { value: "fr", label: "French", icon: "🇫🇷" },
  { value: "de", label: "German", icon: "🇩🇪" },
  { value: "it", label: "Italian", icon: "🇮🇹" },
  { value: "pt", label: "Portuguese", icon: "🇵🇹" },
  { value: "ru", label: "Russian", icon: "🇷🇺" },
  { value: "zh", label: "Chinese", icon: "🇨🇳" },
  { value: "ja", label: "Japanese", icon: "🇯🇵" },
  { value: "ko", label: "Korean", icon: "🇰🇷" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("en");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between text-sm"
        >
          {value ? (
            <>
              {languages.find((language) => language.value === value)?.icon}{" "}
              {languages.find((language) => language.value === value)?.label}
            </>
          ) : (
            "Select language"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {languages.map((language) => (
              <CommandItem
                key={language.value}
                value={language.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  onLanguageChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === language.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {language.icon} {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
