import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Factory, AlertCircle, CheckCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const serviceDemandData = [
  { month: "Jan", demand: 45, capacity: 60 },
  { month: "Feb", demand: 52, capacity: 60 },
  { month: "Mar", demand: 58, capacity: 60 },
  { month: "Apr", demand: 49, capacity: 60 },
  { month: "May", demand: 63, capacity: 60 },
  { month: "Jun", demand: 71, capacity: 70 },
];

const failurePredictionData = [
  { component: "Brake Pads", occurrences: 45 },
  { component: "Engine Oil", occurrences: 38 },
  { component: "Transmission", occurrences: 22 },
  { component: "Battery", occurrences: 18 },
  { component: "Tires", occurrences: 15 },
];

const manufacturingInsights = [
  { id: "1", issue: "Engine oil degradation in vehicles >40,000 km", severity: "high", recommendation: "Review oil viscosity specs for high-mileage engines", status: "In Review" },
  { id: "2", issue: "Brake pad wear pattern inconsistent across batches", severity: "medium", recommendation: "Audit brake pad supplier quality control process", status: "Implemented" },
  { id: "3", issue: "Transmission fluid leaks in 2022 models", severity: "high", recommendation: "Redesign transmission seal assembly", status: "In Progress" },
  { id: "4", issue: "Battery degradation faster in hot climates", severity: "medium", recommendation: "Improve battery thermal management system", status: "Planned" },
];

const AnalyticsInsights = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Implemented": return "bg-success text-success-foreground";
      case "In Progress": return "bg-accent text-accent-foreground";
      case "In Review": return "bg-warning text-warning-foreground";
      case "Planned": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Service Demand Forecasting</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={serviceDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="demand" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="capacity" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">Top Predicted Failures</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={failurePredictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="component" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occurrences" fill="hsl(var(--warning))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Factory className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Manufacturing Quality Insights (RCA/CAPA)</h3>
        </div>

        <div className="space-y-4">
          {manufacturingInsights.map((insight) => (
            <Card key={insight.id} className="p-4 border-l-4 border-l-primary">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSeverityColor(insight.severity)}>
                      {insight.severity} severity
                    </Badge>
                    <Badge className={getStatusColor(insight.status)}>
                      {insight.status}
                    </Badge>
                  </div>
                  <p className="font-semibold mb-2">{insight.issue}</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Recommendation:</span> {insight.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Manufacturing Feedback Loop Impact</h4>
            <p className="text-sm text-muted-foreground mb-3">
              By analyzing predicted failures and correlating them with RCA/CAPA records, we've identified 12 recurring defects. 
              These insights have been shared with the manufacturing team, leading to design improvements and a projected 23% reduction in warranty claims.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">23%</p>
                <p className="text-xs text-muted-foreground">Defect Reduction</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Issues Identified</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="text-xs text-muted-foreground">Solutions Implemented</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsInsights;
