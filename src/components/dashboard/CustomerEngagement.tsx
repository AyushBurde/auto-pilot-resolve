import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, CheckCircle, Clock, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Engagement {
  id: string;
  customerName: string;
  vehicle: string;
  type: "voice" | "chat" | "notification";
  status: "scheduled" | "in-progress" | "completed" | "declined";
  issue: string;
  sentiment: "positive" | "neutral" | "negative";
  timestamp: string;
}

const mockEngagements: Engagement[] = [
  { id: "1", customerName: "Vikram Singh", vehicle: "TN05IJ7890", type: "voice", status: "in-progress", issue: "Transmission fluid low", sentiment: "neutral", timestamp: "2 min ago" },
  { id: "2", customerName: "Priya Patel", vehicle: "MH02CD5678", type: "voice", status: "completed", issue: "Brake pad wear", sentiment: "positive", timestamp: "15 min ago" },
  { id: "3", customerName: "Amit Kumar", vehicle: "DL03EF9012", type: "notification", status: "scheduled", issue: "Routine maintenance due", sentiment: "positive", timestamp: "1 hour ago" },
  { id: "4", customerName: "Sneha Reddy", vehicle: "KA04GH3456", type: "voice", status: "completed", issue: "Engine oil degradation", sentiment: "positive", timestamp: "2 hours ago" },
];

const CustomerEngagement = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-accent text-accent-foreground";
      case "scheduled": return "bg-warning text-warning-foreground";
      case "declined": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-success";
      case "neutral": return "text-muted-foreground";
      case "negative": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "voice": return <Phone className="h-4 w-4" />;
      case "chat": return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Customer Engagement Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-accent/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Engagements</p>
                <p className="text-2xl font-bold">247</p>
              </div>
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-4 bg-success/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-4 bg-warning/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">32s</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>
          
          <Card className="p-4 bg-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Voice Calls</p>
                <p className="text-2xl font-bold">189</p>
              </div>
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Customer Interactions</h3>
        
        <div className="space-y-4">
          {mockEngagements.map((engagement) => (
            <Card key={engagement.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {getTypeIcon(engagement.type)}
                  </div>
                  <div>
                    <p className="font-semibold">{engagement.customerName}</p>
                    <p className="text-sm text-muted-foreground">{engagement.vehicle}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(engagement.status)}>
                  {engagement.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Issue:</span>
                  <span className="font-medium">{engagement.issue}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sentiment:</span>
                  <span className={`font-medium capitalize ${getSentimentColor(engagement.sentiment)}`}>
                    {engagement.sentiment}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{engagement.timestamp}</span>
                </div>
              </div>

              {engagement.status === "in-progress" && (
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium mb-2">🎙️ Live Conversation</p>
                  <p className="text-sm text-muted-foreground italic">
                    "Hello Mr. Singh, our diagnostic system has detected low transmission fluid in your vehicle. 
                    This can lead to serious issues if not addressed soon. Would you like to schedule a service appointment?"
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CustomerEngagement;
