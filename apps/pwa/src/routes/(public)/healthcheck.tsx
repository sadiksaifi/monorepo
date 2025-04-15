import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, Server, Database, Globe, Cloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Badge } from "@workspace/ui/components/badge";
export const Route = createFileRoute("/(public)/healthcheck")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(new Date());
  const [services, setServices] = useState([
    { name: "API Server", status: "healthy", icon: Server },
    { name: "Database", status: "healthy", icon: Database },
    { name: "CDN", status: "healthy", icon: Globe },
    { name: "Storage", status: "healthy", icon: Cloud },
  ]);

  const checkHealth = () => {
    setIsChecking(true);

    // Simulate health check with random results
    setTimeout(() => {
      const updatedServices = services.map((service) => ({
        ...service,
        status: Math.random() > 0.2 ? "healthy" : "error",
      }));

      setServices(updatedServices);
      setIsChecking(false);
      setLastChecked(new Date());
    }, 1500);
  };

  return (
    <div className="container py-10 flex justify-center items-center h-screen">
      <Card className="w-md">
        <CardHeader>
          <CardTitle className="text-2xl">System Health Status</CardTitle>
          <CardDescription>Monitor the health of your system components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.map((service, index) => (
            <div key={service.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <service.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{service.name}</span>
                </div>
                <Badge variant={service.status === "healthy" ? "success" : "destructive"}>
                  {service.status === "healthy" ? "Healthy" : "Error"}
                </Badge>
              </div>
              {index < services.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {lastChecked
              ? `Last checked: ${lastChecked.toLocaleTimeString()}`
              : "Not checked yet"}
          </div>
          <Button onClick={checkHealth} disabled={isChecking}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            {isChecking ? "Checking..." : "Check Health"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
