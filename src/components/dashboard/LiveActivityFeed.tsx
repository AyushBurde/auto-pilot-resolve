import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle, Phone, Calendar, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface Activity {
  id: string;
  type: "alert" | "success" | "call" | "appointment" | "insight";
  message: string;
  timestamp: Date;
  vehicle?: string;
}

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", type: "alert", message: "Brake pad wear detected on MH02CD5678", timestamp: new Date(Date.now() - 120000), vehicle: "MH02CD5678" },
    { id: "2", type: "call", message: "Voice agent contacted Vikram Singh", timestamp: new Date(Date.now() - 300000), vehicle: "TN05IJ7890" },
    { id: "3", type: "appointment", message: "Service scheduled for KA04GH3456", timestamp: new Date(Date.now() - 480000), vehicle: "KA04GH3456" },
    { id: "4", type: "success", message: "Preventive maintenance completed on DL03EF9012", timestamp: new Date(Date.now() - 600000), vehicle: "DL03EF9012" },
    { id: "5", type: "insight", message: "RCA report generated for engine oil issues", timestamp: new Date(Date.now() - 720000) },
  ]);

  useEffect(() => {
    const messages = [
      { type: "alert", message: "Transmission fluid low on TN05IJ7890", vehicle: "TN05IJ7890" },
      { type: "call", message: "Customer engagement initiated for MH02CD5678", vehicle: "MH02CD5678" },
      { type: "success", message: "Diagnostic scan completed on GJ06KL2345", vehicle: "GJ06KL2345" },
      { type: "insight", message: "Manufacturing feedback loop updated" },
    ];

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setActivities(prev => [
        {
          id: Date.now().toString(),
          type: randomMessage.type as Activity["type"],
          message: randomMessage.message,
          timestamp: new Date(),
          vehicle: randomMessage.vehicle,
        },
        ...prev.slice(0, 9)
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "success": return <CheckCircle className="h-4 w-4 text-success" />;
      case "call": return <Phone className="h-4 w-4 text-accent" />;
      case "appointment": return <Calendar className="h-4 w-4 text-primary" />;
      case "insight": return <TrendingUp className="h-4 w-4 text-primary" />;
      default: return null;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Live Activity Feed</h2>
        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-relaxed">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</span>
                  {activity.vehicle && (
                    <Badge variant="outline" className="text-xs">{activity.vehicle}</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default LiveActivityFeed;
