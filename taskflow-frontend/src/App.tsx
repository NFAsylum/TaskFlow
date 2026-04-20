import { useState } from 'react'
import { Status, type Priority, type Ticket } from './types'
import BoardColumn from './BoardColumn'
import TicketForm from './TicketForm'

function App() {
  const title = "Ticket Board"

  const [tickets, setTickets] = useState<Ticket[]>([])

  function addTicket(newTicket: Ticket){
      setTickets([...tickets, newTicket])
  }

  function createTicket(title: string, priority: Priority, status: Status){
    addTicket({
      id: tickets.length+1,
      title: title,
      priority: priority,
      status: status
      })
  }

  function moveTicket(id: number, newStatus: Status){
    setTickets(tickets.map((t) => t.id === id ? { ...t, status: newStatus } : t ))
  }

  return (
    <>
      <div className="bg-blue-950 p-8 text-white text-2xl">
        {title}
      </div>
      <div className="bg-gray-900 p-2 text-gray-400 text-2xl">
        by Marco
      </div>
      <TicketForm onCreate={createTicket} />
      <div className="flex">
        <BoardColumn title="Open" tickets={tickets.filter((t) => t.status == Status.Open)} onMoveTicket={moveTicket} />
        <BoardColumn title="In Progress" tickets={tickets.filter((t) => t.status == Status.InProgress)} onMoveTicket={moveTicket} />
        <BoardColumn title="Review" tickets={tickets.filter((t) => t.status == Status.Review)} onMoveTicket={moveTicket} />
        <BoardColumn title="Done" tickets={tickets.filter((t) => t.status == Status.Done)} onMoveTicket={moveTicket} />
      </div>
    </>
  )
}

export default App
