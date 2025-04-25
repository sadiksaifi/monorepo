import { AppHeader } from "@/lib/components/app-header";
import { AppSidebar } from "@/lib/components/app-sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth/sign-in" });
    }
  },
  loader: async ({ context }) => {
    return { user: context.user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          name: user!.name,
          email: user!.email,
          avatar: user!.image!,
        }}
      />
      <SidebarInset>
        <AppHeader />
        <main className="p-4 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
