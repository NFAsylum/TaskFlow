import { DndContext, type DragEndEvent } from '@dnd-kit/core'

import { Status, StatusTitle } from './types'
import BoardColumn from './BoardColumn'
import TicketForm from './TicketForm'
import { useTickets } from './useTickets'
import { useAuth } from './AuthContext'

function App() {
  const {
    tickets,
    handleAddTicket,
    handleMoveTicket,
    handleDeleteTicket,
    handleEditTicket,
  } = useTickets()

  const title = 'Ticket Board'

  const { userName } = useAuth()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const ticketId = active.id as number
    const newStatus = over.id as Status

    handleMoveTicket(ticketId, newStatus)
  }

  return (
    <>
      <div className="bg-blue-950 p-8 text-white text-2xl">
        <h6>{title}</h6>
        <h6>User: {userName}</h6>
      </div>
      <div className="bg-gray-900 p-2 text-gray-400 text-2xl">by Marco</div>
      <TicketForm onCreate={handleAddTicket} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex">
          <BoardColumn
            title={StatusTitle[Status.Open]}
            status={Status.Open}
            tickets={tickets.filter((t) => t.status == Status.Open)}
            onMoveTicket={handleMoveTicket}
            onDeleteTicket={handleDeleteTicket}
            onEditTicket={handleEditTicket}
          />
          <BoardColumn
            title={StatusTitle[Status.InProgress]}
            status={Status.InProgress}
            tickets={tickets.filter((t) => t.status == Status.InProgress)}
            onMoveTicket={handleMoveTicket}
            onDeleteTicket={handleDeleteTicket}
            onEditTicket={handleEditTicket}
          />
          <BoardColumn
            title={StatusTitle[Status.Review]}
            status={Status.Review}
            tickets={tickets.filter((t) => t.status == Status.Review)}
            onMoveTicket={handleMoveTicket}
            onDeleteTicket={handleDeleteTicket}
            onEditTicket={handleEditTicket}
          />
          <BoardColumn
            title={StatusTitle[Status.Done]}
            status={Status.Done}
            tickets={tickets.filter((t) => t.status == Status.Done)}
            onMoveTicket={handleMoveTicket}
            onDeleteTicket={handleDeleteTicket}
            onEditTicket={handleEditTicket}
          />
        </div>
      </DndContext>
    </>
  )
}

export default App
