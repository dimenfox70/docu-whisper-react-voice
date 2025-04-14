
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VoiceControlProps {
  onVoiceInput?: (text: string) => void;
  onSpeakText?: (speak: boolean) => void;
  disabled?: boolean;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ 
  onVoiceInput, 
  onSpeakText,
  disabled = false 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  
  const toggleListening = () => {
    // This is a mock implementation. In a real app, we would use the Web Speech API
    if (isListening) {
      setIsListening(false);
      toast({
        title: "Voice input stopped",
        description: "Stopped listening for voice input.",
      });
    } else {
      setIsListening(true);
      toast({
        title: "Voice input active",
        description: "Listening for voice input...",
      });
      
      // Mock receiving voice input after 2 seconds
      setTimeout(() => {
        const mockText = "What are the main points of this document?";
        if (onVoiceInput) {
          onVoiceInput(mockText);
        }
        setIsListening(false);
        
        toast({
          title: "Voice input received",
          description: `Recognized: "${mockText}"`,
        });
      }, 2000);
    }
  };
  
  const toggleSpeaking = () => {
    const newSpeakingState = !isSpeaking;
    setIsSpeaking(newSpeakingState);
    
    if (onSpeakText) {
      onSpeakText(newSpeakingState);
    }
    
    toast({
      title: newSpeakingState ? "Text-to-speech active" : "Text-to-speech disabled",
      description: newSpeakingState ? "The app will read responses aloud." : "Text-to-speech has been turned off.",
    });
  };

  useEffect(() => {
    // Clean up any voice recognition or synthesis when component unmounts
    return () => {
      setIsListening(false);
      setIsSpeaking(false);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={disabled}
        className={`rounded-full ${isListening ? 'bg-red-100 text-red-600 border-red-200' : ''}`}
        onClick={toggleListening}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        disabled={disabled}
        className={`rounded-full ${isSpeaking ? 'bg-blue-100 text-blue-600 border-blue-200' : ''}`}
        onClick={toggleSpeaking}
      >
        {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default VoiceControl;
