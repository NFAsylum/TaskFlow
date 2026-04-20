import { type Ticket, Priority, Status, nextStatus } from './types'
import TicketCard from './TicketCard'

function BoardColumn({
  title,
  tickets,
  onMoveTicket,
  onDeleteTicket,
  onEditTicket,
}: {
  title: string
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
  return (
    <div className="bg-blue-600 text-white">
      <div className="bg-blue-800 py-2 text-center font-bold">{title}</div>
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
