import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export const Route = createFileRoute("/_app/test/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            This is a test notifications page to demonstrate the header with back
            navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page demonstrates the iOS-style header behavior:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>The header shows a back button on the left</li>
            <li>The page title "Notifications" is centered</li>
            <li>Clicking back will return to the previous page</li>
          </ul>
        </CardContent>
      </Card>

      {/* Example notifications */}
      {[1, 2, 3].map((item) => (
        <Card key={item}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">New message received</CardTitle>
            <CardDescription className="text-xs">2 hours ago</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              You have a new message from John Doe. Check your inbox to see the details.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
