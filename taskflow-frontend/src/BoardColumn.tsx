import { useDroppable } from '@dnd-kit/core'

import { type Ticket, Priority, Status, nextStatus } from './types'
import TicketCard from './TicketCard'

function BoardColumn({
  title,
  status,
  tickets,
  onMoveTicket,
  onDeleteTicket,
  onEditTicket,
}: {
  title: string
  status: Status
  tickets: Ticket[]
  onMoveTicket: (id: number, newStatus: Status) => void
  onDeleteTicket: (id: number) => void
  onEditTicket: (
    id: number,
    newTitle: string,
    newPriority: Priority,
    newStatus: Status,
  ) => void
}) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 dark:bg-gray-900 flex-1 h-screen"
    >
      <div className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 text-center font-bold">
        {title}
      </div>
      <div className="mx-4 flex flex-col gap-4 py-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            {...ticket}
            onMove={() => onMoveTicket(ticket.id, nextStatus(ticket.status))}
            onDelete={() => onDeleteTicket(ticket.id)}
            onEdit={(newTitle, newPriority, newStatus) =>
              onEditTicket(ticket.id, newTitle, newPriority, newStatus)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default BoardColumn
