import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Target, Trophy } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "quiz_completed",
    title: "JavaScript Fundamentals Quiz",
    score: 85,
    time: "2 hours ago",
    icon: Trophy,
    status: "completed"
  },
  {
    id: 2,
    type: "document_uploaded",
    title: "React Components Guide.pdf",
    time: "5 hours ago", 
    icon: FileText,
    status: "processed"
  },
  {
    id: 3,
    type: "quiz_generated",
    title: "Database Design Quiz",
    questions: 8,
    time: "1 day ago",
    icon: Target,
    status: "ready"
  }
];

export function RecentActivity() {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className={`flex items-center space-x-4 p-3 rounded-lg bg-muted/30 fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <activity.icon className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">{activity.time}</p>
                {activity.score && (
                  <Badge variant="secondary" className="text-xs">
                    Score: {activity.score}%
                  </Badge>
                )}
                {activity.questions && (
                  <Badge variant="outline" className="text-xs">
                    {activity.questions} questions
                  </Badge>
                )}
              </div>
            </div>

            <Badge 
              variant={activity.status === "completed" ? "default" : "secondary"}
              className="capitalize"
            >
              {activity.status}
            </Badge>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  );
}