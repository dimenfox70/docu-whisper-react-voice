
import React from 'react';
import { Copy, Download, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SummaryType } from './SummaryOptions';

interface SummaryDisplayProps {
  type: SummaryType;
  content: string | React.ReactNode;
  fileName?: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ type, content, fileName }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (typeof content === 'string') {
      navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "The summary has been copied to your clipboard.",
      });
    }
  };

  const handleDownload = () => {
    if (typeof content === 'string') {
      const element = document.createElement('a');
      const file = new Blob([content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${fileName || 'summary'}-${type}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Downloaded summary",
        description: `${fileName || 'Summary'} has been downloaded.`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share && typeof content === 'string') {
      navigator.share({
        title: `${fileName || 'Document'} Summary`,
        text: content,
      })
      .catch(() => {
        toast({
          title: "Share failed",
          description: "Couldn't share the summary. Try copying instead.",
          variant: "destructive"
        });
      });
    } else {
      handleCopy();
      toast({
        title: "Ready to share",
        description: "Summary copied to clipboard for sharing.",
      });
    }
  };

  const renderContent = () => {
    if (typeof content === 'string') {
      if (type === 'bullet') {
        const bulletPoints = content.split('\n');
        return (
          <ul className="list-disc pl-5 space-y-2 text-left">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        );
      }
      
      if (type === 'chat') {
        return (
          <div className="text-left">
            <div className="bg-gray-100 p-3 rounded-lg mb-3">
              {content}
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-gray-500 text-sm mb-2">Example questions you could ask about the document:</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>What are the main points of this document?</li>
                <li>Can you explain more about the second paragraph?</li>
                <li>What are the key dates mentioned?</li>
              </ol>
            </div>
          </div>
        );
      }
      
      return <div className="text-left whitespace-pre-line">{content}</div>;
    }
    
    return content;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
      <div className="mb-6 min-h-[200px] max-h-[400px] overflow-y-auto">
        {renderContent()}
      </div>
      
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={handleCopy}
        >
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default SummaryDisplay;
