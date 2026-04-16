import { useState } from 'react'
import {type TicketCardProps, Priority} from './TicketCard'
import BoardColumn from './BoardColumn'

function App() {
  const title = "Ticket Board"

  const [tickets, setTickets] = useState<TicketCardProps[]>([])

  function addTicket(newTicket: TicketCardProps){
      setTickets([...tickets, newTicket])
  }

  function addRandomTicket(){
    addTicket({
      id: tickets.length+1,
      title: `Task ${tickets.length+1}`,
      priority:Object.values(Priority)[Math.floor(Math.random() * Object.values(Priority).length)]
      })
  }

  return (
    <>
      <div className="bg-blue-950 p-8 text-white text-2xl">
        {title}
      </div>
      <div className="bg-gray-900 p-2 text-gray-400 text-2xl">
        by Marco
      </div>
      <button onClick={addRandomTicket}>Add ticket</button>
      <div className="flex">
        <BoardColumn title="Open" tickets={tickets} />
        <BoardColumn title="In Progress" tickets={tickets} />
        <BoardColumn title="Review" tickets={tickets} />
        <BoardColumn title="Done" tickets={tickets} />
      </div>
    </>
  )
}

export default App
