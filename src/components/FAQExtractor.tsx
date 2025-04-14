
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQExtractorProps {
  faqs: FAQ[];
  documentName?: string;
}

const FAQExtractor: React.FC<FAQExtractorProps> = ({ 
  faqs = [], 
  documentName = "Document" 
}) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    if (faqs.length === 0) return;
    
    const faqText = faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}\n\n`).join('');
    const fileName = `${documentName.replace(/\s+/g, '-').toLowerCase()}-faqs.txt`;
    
    const element = document.createElement('a');
    const file = new Blob([faqText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "FAQs Downloaded",
      description: `FAQs have been saved as ${fileName}.`,
    });
  };
  
  if (faqs.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
        <p className="text-gray-500">No FAQs extracted yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Extracted FAQs</h3>
        <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1.5">
          <Download className="h-3 w-3" />
          <span>Save FAQs</span>
        </Button>
      </div>
      
      <div className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left font-medium text-gray-800">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="px-4 py-2 text-xs text-gray-400 border-t">
        FAQs automatically extracted from your document
      </div>
    </div>
  );
};

export default FAQExtractor;
