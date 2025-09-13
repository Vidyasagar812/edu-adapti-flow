import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Trophy,
  Brain,
  Calendar,
  BookOpen,
  BarChart3,
  Download
} from "lucide-react";

// Mock analytics data
const performanceData = [
  { subject: "JavaScript", score: 85, trend: "up", quizzes: 8 },
  { subject: "React", score: 72, trend: "up", quizzes: 5 },
  { subject: "CSS", score: 91, trend: "neutral", quizzes: 6 },
  { subject: "HTML", score: 88, trend: "down", quizzes: 4 },
];

const recentScores = [
  { date: "Today", quiz: "JavaScript ES6", score: 85, time: "12m" },
  { date: "Yesterday", quiz: "React Hooks", score: 78, time: "15m" },
  { date: "2 days ago", quiz: "CSS Grid", score: 92, time: "10m" },
  { date: "3 days ago", quiz: "HTML Semantics", score: 88, time: "8m" },
  { date: "1 week ago", quiz: "JavaScript Basics", score: 76, time: "18m" },
];

const studyStreak = 12;
const totalQuizzes = 24;
const averageScore = 82;
const totalStudyTime = 4.2;

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Learning Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your progress and discover insights about your learning journey
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Study Streak
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studyStreak} days</div>
            <p className="text-xs text-success mt-1">+2 days this week</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quizzes
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
            <p className="text-xs text-success mt-1">+5 this week</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{averageScore}%</div>
            <p className="text-xs text-success mt-1">+3% improvement</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Study Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudyTime}h</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Subject Performance */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.map((subject, index) => (
                <div 
                  key={subject.subject}
                  className={`p-4 rounded-lg bg-muted/30 slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{subject.subject}</h3>
                      <Badge variant="outline" className="text-xs">
                        {subject.quizzes} quizzes
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{subject.score}%</span>
                      <TrendingUp className={`h-4 w-4 ${
                        subject.trend === 'up' ? 'text-success' : 
                        subject.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                  <Progress value={subject.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chart Placeholder */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Interactive chart coming soon</p>
                  <p className="text-xs text-muted-foreground">
                    Track your score trends and study patterns over time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Scores */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Recent Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentScores.map((score, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg bg-muted/20 fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{score.quiz}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{score.date}</span>
                      <span>•</span>
                      <span>{score.time}</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    score.score >= 80 ? 'text-success' : 
                    score.score >= 60 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {score.score}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg gradient-card border">
                <h4 className="font-medium text-sm mb-2">Focus on React Concepts</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Your React scores show room for improvement. Practice hooks and component patterns.
                </p>
                <Button size="sm" variant="outline" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Study Now
                </Button>
              </div>

              <div className="p-3 rounded-lg gradient-card border">
                <h4 className="font-medium text-sm mb-2">Great CSS Progress!</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  You're excelling in CSS. Consider advanced topics like animations and grid.
                </p>
                <Button size="sm" variant="outline" className="text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  Next Level
                </Button>
              </div>

              <div className="p-3 rounded-lg gradient-card border">
                <h4 className="font-medium text-sm mb-2">Study Streak Goal</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  You're 3 days away from a 15-day streak! Keep it up.
                </p>
                <Button size="sm" variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}