import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Header } from '@/hooks/use-header'

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
