
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, FileImage, FileAudio, Film, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  }, [onFileSelect, toast]);

  const removeFile = () => {
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'video/mp4': ['.mp4'],
      'audio/mpeg': ['.mp3'],
      'text/plain': ['.txt']
    }
  });

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="w-6 h-6 text-green-500" />;
      case 'mp3':
      case 'wav':
        return <FileAudio className="w-6 h-6 text-purple-500" />;
      case 'mp4':
      case 'mov':
        return <Film className="w-6 h-6 text-orange-500" />;
      default:
        return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-md p-3 mb-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                {getFileIcon(selectedFile.name)}
                <div className="ml-3 text-sm text-left">
                  <p className="font-medium truncate max-w-[250px]">{selectedFile.name}</p>
                  <p className="text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Click or drop to replace file</p>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 mx-auto text-primary/60 mb-4" />
            <div className="text-xl font-medium mb-2">Drop any document here to get started</div>
            <p className="text-gray-500 mb-6">or click to browse</p>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileText className="w-4 h-4 text-red-400" /> .pdf
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileText className="w-4 h-4 text-blue-400" /> .docx
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileImage className="w-4 h-4 text-green-400" /> .jpg
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileImage className="w-4 h-4 text-green-400" /> .png
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Film className="w-4 h-4 text-orange-400" /> .mov
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileAudio className="w-4 h-4 text-purple-400" /> .mp3
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileText className="w-4 h-4 text-gray-400" /> .mp4
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileText className="w-4 h-4 text-gray-400" /> .txt
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-400">
              Max. file size 100MB
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
