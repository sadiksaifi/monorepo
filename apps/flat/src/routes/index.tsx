import { ListProperties } from '@/components/list-property'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <ListProperties className="p-6" />
}
