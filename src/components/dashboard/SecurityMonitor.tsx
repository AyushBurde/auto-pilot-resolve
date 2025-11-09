import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface SecurityEvent {
  id: string;
  type: "anomaly" | "normal" | "blocked";
  agent: string;
  description: string;
  timestamp: Date;
  riskLevel: "low" | "medium" | "high";
}

const mockSecurityEvents: SecurityEvent[] = [
  { id: "1", type: "blocked", agent: "Scheduling Agent", description: "Attempted unauthorized access to vehicle telematics data", timestamp: new Date(Date.now() - 180000), riskLevel: "high" },
  { id: "2", type: "anomaly", agent: "Data Analysis Agent", description: "Unusual API call pattern detected", timestamp: new Date(Date.now() - 360000), riskLevel: "medium" },
  { id: "3", type: "normal", agent: "Master Agent", description: "Standard orchestration workflow", timestamp: new Date(Date.now() - 540000), riskLevel: "low" },
  { id: "4", type: "normal", agent: "Customer Engagement Agent", description: "Routine customer interaction", timestamp: new Date(Date.now() - 720000), riskLevel: "low" },
  { id: "5", type: "anomaly", agent: "Diagnosis Agent", description: "Accessed service center data outside normal hours", timestamp: new Date(Date.now() - 900000), riskLevel: "medium" },
];

const SecurityMonitor = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "blocked": return "bg-destructive text-destructive-foreground";
      case "anomaly": return "bg-warning text-warning-foreground";
      case "normal": return "bg-success text-success-foreground";
      default: return "bg-muted";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-success/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Score</p>
              <p className="text-2xl font-bold">98%</p>
            </div>
            <Shield className="h-8 w-8 text-success" />
          </div>
          <Progress value={98} className="mt-3 h-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Threats Blocked</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Anomalies Detected</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Activity className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monitored Agents</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">UEBA Security Monitoring</h3>
          <Badge variant="outline" className="ml-auto">Live</Badge>
        </div>

        <div className="mb-6 p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium mb-2">What is UEBA?</p>
          <p className="text-sm text-muted-foreground">
            User and Entity Behavior Analytics (UEBA) uses advanced analytics and machine learning to establish 
            behavioral baselines for AI agents and detect anomalies that indicate potential security threats or 
            unauthorized activities in the autonomous system.
          </p>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-4 pr-4">
            {mockSecurityEvents.map((event) => (
              <Card key={event.id} className="p-4 border-l-4 border-l-primary">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <span className="text-sm font-medium">{event.agent}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Risk Level:</span>
                  <span className={`text-xs font-semibold uppercase ${getRiskColor(event.riskLevel)}`}>
                    {event.riskLevel}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Security Example: Unauthorized Access Prevention</h4>
            <p className="text-sm text-muted-foreground mb-3">
              The Scheduling Agent recently attempted to access vehicle telematics data, which it normally doesn't need 
              for appointment scheduling. UEBA immediately flagged this as anomalous behavior, blocked the access attempt, 
              and triggered an alert. This prevented potential data exposure and maintained system security.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <p className="text-lg font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground">Threats Blocked</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary">&lt;100ms</p>
                <p className="text-xs text-muted-foreground">Detection Time</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecurityMonitor;
