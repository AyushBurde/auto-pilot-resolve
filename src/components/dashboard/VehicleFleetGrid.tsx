import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Car, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface Vehicle {
  id: string;
  model: string;
  owner: string;
  health: number;
  status: "healthy" | "warning" | "critical";
  predictedIssue: string | null;
  nextService: string;
  mileage: number;
}

const mockVehicles: Vehicle[] = [
  { id: "MH01AB1234", model: "Maruti Swift 2022", owner: "Rahul Sharma", health: 95, status: "healthy", predictedIssue: null, nextService: "45 days", mileage: 12500 },
  { id: "MH02CD5678", model: "Hyundai Creta 2023", owner: "Priya Patel", health: 72, status: "warning", predictedIssue: "Brake pad wear", nextService: "15 days", mileage: 28300 },
  { id: "DL03EF9012", model: "Tata Nexon EV 2023", owner: "Amit Kumar", health: 88, status: "healthy", predictedIssue: null, nextService: "30 days", mileage: 8700 },
  { id: "KA04GH3456", model: "Honda City 2021", owner: "Sneha Reddy", health: 45, status: "critical", predictedIssue: "Engine oil degradation", nextService: "Immediate", mileage: 45600 },
  { id: "TN05IJ7890", model: "Mahindra Scorpio 2022", owner: "Vikram Singh", health: 68, status: "warning", predictedIssue: "Transmission fluid low", nextService: "10 days", mileage: 35200 },
  { id: "GJ06KL2345", model: "Kia Seltos 2023", owner: "Ananya Desai", health: 92, status: "healthy", predictedIssue: null, nextService: "60 days", mileage: 6800 },
];

const VehicleFleetGrid = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(v => ({
        ...v,
        health: Math.max(0, Math.min(100, v.health + (Math.random() - 0.5) * 2))
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-success text-success-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-4 w-4" />;
      case "warning": return <Clock className="h-4 w-4" />;
      case "critical": return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Vehicle Fleet Status</h2>
        <Badge variant="outline" className="text-sm">
          {vehicles.length} Active Vehicles
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{vehicle.id}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                </div>
              </div>
              <Badge className={getStatusColor(vehicle.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(vehicle.status)}
                  {vehicle.status}
                </span>
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Vehicle Health</span>
                  <span className="font-semibold">{Math.round(vehicle.health)}%</span>
                </div>
                <Progress value={vehicle.health} className="h-2" />
              </div>

              {vehicle.predictedIssue && (
                <div className="bg-warning/10 border border-warning/20 rounded-md p-2">
                  <p className="text-xs font-medium text-warning-foreground flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Predicted: {vehicle.predictedIssue}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Owner</p>
                  <p className="font-medium">{vehicle.owner}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next Service</p>
                  <p className="font-medium">{vehicle.nextService}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default VehicleFleetGrid;
