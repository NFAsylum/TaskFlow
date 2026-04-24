import type { Status, Ticket } from './types'

const apiPrefix = 'http://localhost:5278/api/tickets'

export async function listTickets(): Promise<Ticket[]> {
  const response = await fetch(apiPrefix)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Ticket[] = await response.json()

  return data
}

export async function getTicketById(id: number): Promise<Ticket> {
  const response = await fetch(`${apiPrefix}/${id}`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Ticket = await response.json()

  return data
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  const response = await fetch(apiPrefix, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const created: Ticket = await response.json()

  return created
}

export async function deleteTicket(id: number) {
  const response = await fetch(`${apiPrefix}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
}

export async function moveTicket(id: number, status: Status) {
  const response = await fetch(`${apiPrefix}/${id}/move`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: status,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const created: Ticket = await response.json()

  return created
}

export async function updateTicket(ticket: Ticket): Promise<Ticket> {
  const response = await fetch(`${apiPrefix}/${ticket.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
}
