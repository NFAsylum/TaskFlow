import type { Status, Ticket } from './types'

const apiBase = import.meta.env.VITE_API_URL || ''
const ticketApiPrefix = `${apiBase}/api/tickets`

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export async function listTickets(): Promise<Ticket[]> {
  const response = await fetch(ticketApiPrefix, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Ticket[] = await response.json()

  return data
}

export async function getTicketById(id: number): Promise<Ticket> {
  const response = await fetch(`${ticketApiPrefix}/${id}`, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Ticket = await response.json()

  return data
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  const response = await fetch(ticketApiPrefix, {
    method: 'POST',
    headers: authHeaders(),
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
  const response = await fetch(`${ticketApiPrefix}/${id}`, {
    headers: authHeaders(),
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
}

export async function moveTicket(id: number, status: Status) {
  const response = await fetch(`${ticketApiPrefix}/${id}/move`, {
    method: 'PATCH',
    headers: authHeaders(),
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

export async function updateTicket(ticket: Ticket) {
  const response = await fetch(`${ticketApiPrefix}/${ticket.id}`, {
    method: 'PUT',
    headers: authHeaders(),
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

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${apiBase}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data = await response.json()
  const token: string = data.token

  return token
}
