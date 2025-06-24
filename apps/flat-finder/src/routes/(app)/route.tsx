import { Header } from '@/hooks/use-header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="mt-16 min-h-[calc(100vh-8rem)] max-w-2xl mx-auto">
        <Outlet />
      </div>
    </>
  )
}
