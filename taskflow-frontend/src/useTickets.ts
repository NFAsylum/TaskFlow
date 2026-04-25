import { useState, useEffect } from 'react'
import type { Priority, Status, Ticket } from './types'
import {
  createTicket,
  deleteTicket,
  listTickets,
  moveTicket,
  updateTicket,
} from './api'

export function useTickets() {
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

  return {
    tickets,
    handleAddTicket,
    handleMoveTicket,
    handleDeleteTicket,
    handleEditTicket,
  }
}
