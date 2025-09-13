import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { QuizCard } from "@/components/quiz/QuizCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const recentQuizzes = [
  {
    id: "1",
    title: "JavaScript ES6 Features",
    description: "Modern JavaScript syntax and features including arrow functions, destructuring, and modules",
    questions: 12,
    difficulty: "Medium" as const,
    estimatedTime: "15 min",
    completions: 156,
    bestScore: 85,
    isCompleted: true
  },
  {
    id: "2", 
    title: "React Component Patterns",
    description: "Advanced React patterns including HOCs, render props, and custom hooks",
    questions: 8,
    difficulty: "Hard" as const,
    estimatedTime: "12 min",
    completions: 89,
    isCompleted: false
  },
  {
    id: "3",
    title: "CSS Grid Layout",
    description: "Complete guide to CSS Grid including grid containers, items, and responsive design",
    questions: 10,
    difficulty: "Easy" as const,
    estimatedTime: "10 min", 
    completions: 203,
    bestScore: 92,
    isCompleted: true
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="gradient-hero rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-medium opacity-90">AI-Powered Learning</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            Welcome back to EdApt!
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Transform your learning with personalized quizzes and intelligent analytics. 
            Upload documents and let AI create the perfect study experience for you.
          </p>
          <Link to="/upload">
            <Button size="lg" variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <BookOpen className="h-5 w-5 mr-2" />
              Start Learning
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Quizzes Completed"
          value={24}
          change="+12% from last week"
          icon={Target}
          trend="up"
        />
        <StatsCard
          title="Average Score"
          value="87%"
          change="+5% improvement"
          icon={Trophy}
          trend="up"
        />
        <StatsCard
          title="Study Time"
          value="4.2h"
          change="This week"
          icon={Clock}
          trend="neutral"
        />
        <StatsCard
          title="Documents Processed"
          value={8}
          change="+3 this month"
          icon={BookOpen}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Quizzes */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Recommended Quizzes
              </CardTitle>
              <Link to="/quizzes">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {recentQuizzes.slice(0, 2).map((quiz, index) => (
                  <div 
                    key={quiz.id}
                    className="slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <QuizCard {...quiz} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>JavaScript Mastery</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>React Development</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "60%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CSS Styling</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}