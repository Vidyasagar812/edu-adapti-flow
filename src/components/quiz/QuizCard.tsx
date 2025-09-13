import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  completions?: number;
  bestScore?: number;
  isCompleted?: boolean;
}

export function QuizCard({
  id,
  title,
  description,
  questions,
  difficulty,
  estimatedTime,
  completions = 0,
  bestScore,
  isCompleted = false
}: QuizCardProps) {
  const difficultyColors = {
    Easy: "bg-success/20 text-success border-success/30",
    Medium: "bg-warning/20 text-warning border-warning/30", 
    Hard: "bg-destructive/20 text-destructive border-destructive/30"
  };

  return (
    <Card className="card-interactive">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {title}
          </CardTitle>
          <Badge 
            variant="outline"
            className={`${difficultyColors[difficulty]} font-medium`}
          >
            {difficulty}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quiz Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{questions} questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{completions} taken</span>
          </div>
        </div>

        {/* Progress if completed */}
        {isCompleted && bestScore !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Best Score</span>
              <span className="font-medium text-foreground">{bestScore}%</span>
            </div>
            <Progress value={bestScore} className="h-2" />
          </div>
        )}

        {/* Action Button */}
        <Link to={`/quiz/${id}`}>
          <Button className="w-full gradient-primary">
            <Play className="h-4 w-4 mr-2" />
            {isCompleted ? "Retake Quiz" : "Start Quiz"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}