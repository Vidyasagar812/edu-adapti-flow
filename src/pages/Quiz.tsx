import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Flag
} from "lucide-react";

interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

// Mock quiz data
const mockQuiz = {
  id: "1",
  title: "JavaScript ES6 Features",
  description: "Test your knowledge of modern JavaScript syntax and features",
  questions: [
    {
      id: "1",
      type: "multiple-choice" as const,
      question: "Which of the following is the correct syntax for arrow functions in ES6?",
      options: [
        "function() => { return value; }",
        "() => { return value; }",
        "=> { return value; }",
        "function => { return value; }"
      ],
      correctAnswer: "() => { return value; }",
      explanation: "Arrow functions use the syntax () => {} where parentheses contain parameters and the arrow leads to the function body."
    },
    {
      id: "2", 
      type: "fill-blank" as const,
      question: "The _____ operator allows you to extract values from arrays and objects into distinct variables.",
      correctAnswer: "destructuring",
      explanation: "Destructuring assignment allows unpacking values from arrays or properties from objects into distinct variables."
    },
    {
      id: "3",
      type: "multiple-choice" as const,
      question: "What is the purpose of the 'let' keyword in ES6?",
      options: [
        "It creates global variables only",
        "It creates block-scoped variables", 
        "It's identical to 'var'",
        "It creates constants"
      ],
      correctAnswer: "It creates block-scoped variables",
      explanation: "'let' declares block-scoped variables, unlike 'var' which is function-scoped."
    }
  ]
};

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const quiz = mockQuiz; // In real app, fetch based on id
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load saved answer for current question
    setSelectedAnswer(answers[question.id] || "");
  }, [currentQuestion, answers, question.id]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers(prev => ({
      ...prev,
      [question.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const isHighScore = score >= 80;

    return (
      <div className="max-w-4xl mx-auto space-y-8 fade-in">
        <Card className="card-elevated">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className={`p-4 rounded-full ${isHighScore ? 'bg-success/10' : 'bg-warning/10'}`}>
                {isHighScore ? (
                  <CheckCircle className="h-12 w-12 text-success" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-warning" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold">Quiz Completed!</h1>
            <p className="text-muted-foreground">Here are your results for {quiz.title}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score Summary */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-gradient">{score}%</div>
              <Badge 
                variant={isHighScore ? "default" : "secondary"}
                className="text-lg px-4 py-2"
              >
                {isHighScore ? "Excellent!" : "Good Effort!"}
              </Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {quiz.questions.filter(q => 
                    answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
                  ).length}
                </div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-destructive">
                  {quiz.questions.length - quiz.questions.filter(q => 
                    answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
                  ).length}
                </div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate("/analytics")}>
                View Analytics
              </Button>
              <Button 
                className="gradient-primary"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                  setTimeElapsed(0);
                }}
              >
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatTime(timeElapsed)}
          </div>
          <Badge variant="outline">
            {currentQuestion + 1} of {quiz.questions.length}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{quiz.title}</span>
          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question Card */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit">
              Question {currentQuestion + 1}
            </Badge>
            <h2 className="text-xl font-semibold leading-relaxed">
              {question.question}
            </h2>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Answer Options */}
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`
                    quiz-option w-full text-left
                    ${selectedAnswer === option ? 'quiz-option-selected' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium
                      ${selectedAnswer === option 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted-foreground'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.type === 'fill-blank' && (
            <div className="space-y-4">
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 border border-muted rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Flag
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!selectedAnswer.trim()}
                className="gradient-primary"
              >
                {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Question Progress</span>
            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`
                    w-8 h-8 rounded-full text-xs font-medium transition-colors
                    ${index === currentQuestion 
                      ? 'bg-primary text-primary-foreground' 
                      : answers[quiz.questions[index].id]
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}