import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, MessageSquare, Calendar, ThumbsUp, Factory, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  type: "master" | "worker";
  status: "active" | "idle" | "processing";
  icon: any;
  currentTask: string;
  tasksCompleted: number;
  efficiency: number;
}

interface AgentOrchestrationProps {
  detailed?: boolean;
}

const AgentOrchestration = ({ detailed = false }: AgentOrchestrationProps) => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "master-1", name: "Master Agent", type: "master", status: "active", icon: Brain, currentTask: "Orchestrating 4 worker agents", tasksCompleted: 156, efficiency: 98 },
    { id: "data-1", name: "Data Analysis Agent", type: "worker", status: "processing", icon: Database, currentTask: "Analyzing vehicle MH02CD5678 telematics", tasksCompleted: 342, efficiency: 94 },
    { id: "diagnosis-1", name: "Diagnosis Agent", type: "worker", status: "processing", icon: Shield, currentTask: "Running predictive model on KA04GH3456", tasksCompleted: 298, efficiency: 96 },
    { id: "engagement-1", name: "Customer Engagement Agent", type: "worker", status: "active", icon: MessageSquare, currentTask: "Voice call with Vikram Singh", tasksCompleted: 189, efficiency: 91 },
    { id: "scheduling-1", name: "Scheduling Agent", type: "worker", status: "idle", icon: Calendar, currentTask: "Awaiting confirmation", tasksCompleted: 267, efficiency: 89 },
    { id: "feedback-1", name: "Feedback Agent", type: "worker", status: "idle", icon: ThumbsUp, currentTask: "Ready for post-service follow-up", tasksCompleted: 178, efficiency: 92 },
    { id: "manufacturing-1", name: "Manufacturing Insights Agent", type: "worker", status: "processing", icon: Factory, currentTask: "Generating RCA/CAPA report", tasksCompleted: 145, efficiency: 95 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        efficiency: Math.max(85, Math.min(100, agent.efficiency + (Math.random() - 0.5) * 2))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "processing": return "bg-accent text-accent-foreground";
      case "idle": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Agent Orchestration System</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time AI agent coordination and task management</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {agents.filter(a => a.status !== "idle").length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isMaster = agent.type === "master";
          
          return (
            <Card key={agent.id} className={`p-4 ${isMaster ? "border-2 border-primary" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${isMaster ? "bg-primary" : "bg-accent"}`}>
                  <Icon className={`h-6 w-6 ${isMaster ? "text-primary-foreground" : "text-accent-foreground"}`} />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{agent.name}</h3>
                        {isMaster && <Badge variant="default" className="text-xs">Master</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.currentTask}</p>
                    </div>
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>

                  {detailed && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Tasks Completed</p>
                          <p className="text-sm font-semibold">{agent.tasksCompleted}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
                          <div className="flex items-center gap-2">
                            <Progress value={agent.efficiency} className="h-2 flex-1" />
                            <span className="text-sm font-semibold">{Math.round(agent.efficiency)}%</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default AgentOrchestration;
