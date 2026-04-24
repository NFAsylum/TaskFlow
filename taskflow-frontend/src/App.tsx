import { DndContext, type DragEndEvent } from '@dnd-kit/core'

import { useState, useEffect } from 'react'
import { Status, StatusTitle, type Priority, type Ticket } from './types'
import BoardColumn from './BoardColumn'
import TicketForm from './TicketForm'
import {
  createTicket,
  deleteTicket,
  listTickets,
  moveTicket,
  updateTicket,
} from './api'

function App() {
  const title = 'Ticket Board'

  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    async function loadTickets() {
      const data = await listTickets()
      setTickets(data)
    }
    loadTickets()
  }, [])

  async function handleAddTicket(
    title: string,
    priority: Priority,
    status: Status,
  ) {
    try {
      const newTicket = await createTicket({
        id: tickets.length + 1,
        title: title,
        priority: priority,
        status: status,
      })

      setTickets([...tickets, newTicket])
    } catch (error) {
      console.error(error)
    }
  }

  async function handleMoveTicket(id: number, newStatus: Status) {
    try {
      const movedTicket = await moveTicket(id, newStatus)

      setTickets(
        tickets.map((t) =>
          t.id === id
            ? {
                ...t,
                title: movedTicket.title,
                priority: movedTicket.priority,
                status: movedTicket.status,
              }
            : t,
        ),
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteTicket(id: number) {
    try {
      await deleteTicket(id)

      setTickets(tickets.filter((t) => t.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  async function handleEditTicket(
    id: number,
    newTitle: string,
    newPriority: Priority,
    newStatus: Status,
  ) {
    try {
      await updateTicket({
        id: id,
        title: newTitle,
        priority: newPriority,
        status: newStatus,
      })

      setTickets(
        tickets.map((t) =>
          t.id === id
            ? {
                ...t,
                title: newTitle,
                priority: newPriority,
                status: newStatus,
              }
            : t,
        ),
      )
    } catch (error) {
      console.error(error)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const ticketId = active.id as number
    const newStatus = over.id as Status

    handleMoveTicket(ticketId, newStatus)
  }

  return (
    <>
      <div className="bg-blue-950 p-8 text-white text-2xl">{title}</div>
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
