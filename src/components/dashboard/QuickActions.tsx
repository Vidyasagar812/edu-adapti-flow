import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Play, BarChart3, BookOpen, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Upload Document",
    description: "Add new learning materials",
    icon: Upload,
    href: "/upload",
    variant: "default" as const,
    gradient: "gradient-primary"
  },
  {
    title: "Take Quiz",
    description: "Start learning session",
    icon: Play,
    href: "/quiz",
    variant: "secondary" as const,
    gradient: "gradient-secondary"
  },
  {
    title: "View Analytics",
    description: "Track your progress",
    icon: BarChart3,
    href: "/analytics",
    variant: "outline" as const,
    gradient: ""
  },
  {
    title: "Study Materials",
    description: "Browse uploaded docs",
    icon: BookOpen,
    href: "/materials",
    variant: "outline" as const,
    gradient: ""
  }
];

export function QuickActions() {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action, index) => (
          <Link key={action.title} to={action.href}>
            <Button
              variant={action.variant}
              className={`w-full justify-start h-auto p-4 fade-in ${
                action.gradient ? action.gradient : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3 w-full">
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm opacity-80">{action.description}</div>
                </div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}