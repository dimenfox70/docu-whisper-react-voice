
import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import SummaryOptions, { SummaryType } from '@/components/SummaryOptions';
import SummaryDisplay from '@/components/SummaryDisplay';
import VoiceControl from '@/components/VoiceControl';
import LanguageSelector from '@/components/LanguageSelector';
import CustomizationOptions from '@/components/CustomizationOptions';
import ChatInterface from '@/components/ChatInterface';
import FAQExtractor from '@/components/FAQExtractor';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil } from 'lucide-react';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summaryType, setSummaryType] = useState<SummaryType>('bullet');
  const [activeTab, setActiveTab] = useState('summary');
  
  // Mock FAQs for demonstration
  const mockFAQs = [
    {
      id: "1",
      question: "What are the work hours during the probation period?",
      answer: "The work hours during the probation period are Monday to Friday, 11:00 AM to 6:00 PM."
    },
    {
      id: "2",
      question: "What activities are reserved for Saturdays during the probation period?",
      answer: "Saturdays are reserved for 2 hours of learning and activities during the probation period."
    },
    {
      id: "3",
      question: "Is there a stipend provided during the probation period?",
      answer: "No, the document explicitly mentions that no stipend is provided during the probation period."
    },
    {
      id: "4",
      question: "How long is the internship program?",
      answer: "The internship program is 6 months long at Brandzaha Creative Agency."
    },
    {
      id: "5",
      question: "When does the probation period start and end?",
      answer: "The probation period is from December 2, 2024, to January 1, 2025."
    }
  ];
  
  // Mock summary content for demonstration
  const getMockSummaryContent = (): string => {
    switch (summaryType) {
      case 'bullet':
        return "- 6-month internship program at Brandzaha Creative Agency\n- Probation period from December 2, 2024, to January 1, 2025\n- Work hours: Monday to Friday, 11:00 AM to 6:00 PM\n- Saturday reserved for 2 hours of learning and activities\n- No stipend provided during the probation period";
      case 'custom':
        return "This document is an Internship Offer Letter from Brandzaha Creative Agency. It details a 6-month internship program with a probation period from December 2, 2024, to January 1, 2025. Working hours are Monday to Friday, 11:00 AM to 6:00 PM, with Saturdays reserved for 2 hours of learning activities. The letter explicitly mentions that no stipend will be provided during the probation period.";
      case 'chat':
        return "Hello! A sentence from the document is: \"We are pleased to welcome you to the 6-month Internship Program at Brandzaha Creative Agency, commencing from Monday, Dec 2, 2024.\"";
      case 'tldr':
        return "6-month unpaid internship at Brandzaha Creative Agency starting Dec 2024, Mon-Fri 11AM-6PM, with 2hrs of Saturday activities.";
      case 'detailed':
        return "The document is an Internship Offer Letter from Brandzaha Creative Agency. It outlines a 6-month internship program that will commence on December 2, 2024. The letter specifies a probation period that will run from December 2, 2024, to January 1, 2025.\n\nRegarding the work schedule, interns are expected to work Monday through Friday from 11:00 AM to 6:00 PM. Additionally, Saturdays are designated for 2 hours of learning and activities, which suggests a focus on professional development beyond regular work duties.\n\nImportantly, the letter explicitly states that no stipend will be provided during the probation period. This indicates that the initial month of the internship is unpaid, though it does not specify compensation arrangements for the period following probation.";
      case 'sarcastic':
        return "Oh joy, another unpaid internship! Brandzaha Creative Agency is generously offering you the privilege of working for them for FREE from December to January. Lucky you! You'll get to work Monday to Friday, 11AM to 6PM, AND they're throwing in bonus unpaid Saturday learning time. What a steal! Who needs money when you have experience, right? I'm sure your landlord accepts \"exposure\" as payment.";
      default:
        return "This document is an Internship Offer Letter detailing a 6-month program at Brandzaha Creative Agency.";
    }
  };
  
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // In a real app, this would trigger processing
  };

  const handleLanguageChange = (language: string) => {
    console.log(`Language changed to: ${language}`);
    // In a real app, this would trigger translation
  };

  return (
    <>
      <div className="app-container">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Any<span className="text-primary">Summary</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze and summarize long interview audio or video files quickly. Get the key points, highlights and insights from your files in just a few minutes.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left sidebar with file upload and customization */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-container p-5">
              <h2 className="text-xl font-semibold mb-4">
                {file ? (
                  <div className="flex justify-between items-center">
                    <span className="truncate">{file.name}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ) : (
                  "Summarize any file with AI"
                )}
              </h2>
              
              <FileUploader onFileSelect={handleFileSelect} />
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500">Powered by ChatGPT <Pencil className="inline h-3 w-3" /></p>
                <div className="flex items-center gap-2">
                  <VoiceControl />
                  <LanguageSelector onLanguageChange={handleLanguageChange} />
                </div>
              </div>
            </div>
            
            <CustomizationOptions 
              onLengthChange={(length) => console.log(`Length changed to: ${length}`)}
              onStyleChange={(style) => console.log(`Style changed to: ${style}`)}
              onSimplifyToggle={(simplify) => console.log(`Simplify toggled: ${simplify}`)}
            />
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="card-container">
              <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold">Summary</h2>
                <SummaryOptions selectedType={summaryType} onTypeSelect={setSummaryType} />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-4 sm:p-6">
                  <TabsContent value="summary" className="mt-0">
                    <SummaryDisplay 
                      type={summaryType}
                      content={getMockSummaryContent()}
                      fileName={file?.name}
                    />
                  </TabsContent>
                  
                  <TabsContent value="chat" className="mt-0">
                    <ChatInterface documentTitle={file?.name || "Document"} />
                  </TabsContent>
                  
                  <TabsContent value="faq" className="mt-0">
                    <FAQExtractor 
                      faqs={mockFAQs}
                      documentName={file?.name || "Document"}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Index;
