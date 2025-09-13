import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload as UploadIcon, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  X,
  Loader2,
  Brain,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  questions?: number;
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      const isValidType = file.type === 'application/pdf' || file.type === 'text/plain';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not supported. Please upload PDF or TXT files only.`,
          variant: "destructive"
        });
      }

      if (!isValidSize) {
        toast({
          title: "File too large", 
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive"
        });
      }

      return isValidType && isValidSize;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach(file => {
      simulateFileProcessing(file.id);
    });
  };

  const simulateFileProcessing = async (fileId: string) => {
    // Upload phase
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Processing phase
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f
    ));

    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Completion
    const questionsGenerated = Math.floor(Math.random() * 8) + 5;
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        status: 'completed', 
        progress: 100,
        questions: questionsGenerated
      } : f
    ));

    toast({
      title: "Document processed successfully!",
      description: `Generated ${questionsGenerated} questions from your document.`,
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gradient">
          Upload Learning Materials
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your documents and let AI transform them into personalized quizzes. 
          Supports PDF and TXT files up to 10MB.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="card-elevated">
        <CardContent className="p-8">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-colors
              ${isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
              }
            `}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <input
              type="file"
              accept=".pdf,.txt"
              multiple
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <UploadIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">
                  Drop your files here, or click to browse
                </h3>
                <p className="text-muted-foreground mt-2">
                  Supports PDF and TXT files • Max 10MB per file
                </p>
              </div>
              
              <Button className="gradient-primary">
                <UploadIcon className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Processing Files ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((file, index) => (
              <div 
                key={file.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* File Icon */}
                <div className="flex-shrink-0">
                  {file.status === 'completed' ? (
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  ) : file.status === 'error' ? (
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                  ) : file.status === 'processing' ? (
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Brain className="h-5 w-5 text-primary animate-pulse" />
                    </div>
                  ) : (
                    <div className="p-2 bg-muted rounded-lg">
                      <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center space-x-2">
                      {file.questions && (
                        <Badge variant="secondary" className="flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {file.questions} questions
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{formatFileSize(file.size)}</span>
                    <Badge 
                      variant={file.status === 'completed' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {file.status === 'processing' ? 'Analyzing...' : file.status}
                    </Badge>
                  </div>

                  {file.status !== 'completed' && (
                    <Progress value={file.progress} className="h-2" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Features Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-elevated text-center">
          <CardContent className="p-6">
            <Brain className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI extracts key concepts and generates relevant questions
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-elevated text-center">
          <CardContent className="p-6">
            <Sparkles className="h-8 w-8 text-secondary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Smart Questions</h3>
            <p className="text-sm text-muted-foreground">
              Multiple choice, fill-in-the-blank, and short answer questions
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-elevated text-center">
          <CardContent className="p-6">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Instant Ready</h3>
            <p className="text-sm text-muted-foreground">
              Questions ready in seconds, start learning immediately
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}