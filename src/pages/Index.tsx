import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import VehicleFleetGrid from "@/components/dashboard/VehicleFleetGrid";
import AgentOrchestration from "@/components/dashboard/AgentOrchestration";
import CustomerEngagement from "@/components/dashboard/CustomerEngagement";
import AnalyticsInsights from "@/components/dashboard/AnalyticsInsights";
import SecurityMonitor from "@/components/dashboard/SecurityMonitor";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agent Orchestration</TabsTrigger>
            <TabsTrigger value="customers">Customer Engagement</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
            <TabsTrigger value="security">Security (UEBA)</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VehicleFleetGrid />
              </div>
              <div>
                <LiveActivityFeed />
              </div>
            </div>
            <AgentOrchestration />
          </TabsContent>

          <TabsContent value="agents">
            <AgentOrchestration detailed />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerEngagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsInsights />
          </TabsContent>

          <TabsContent value="security">
            <SecurityMonitor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
