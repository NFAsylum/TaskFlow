import { DndContext, type DragEndEvent } from '@dnd-kit/core'

import { Status, StatusTitle } from './types'
import BoardColumn from './BoardColumn'
import TicketForm from './TicketForm'
import { useTickets } from './useTickets'
import { useAuth } from './AuthContext'
import { useThemes } from './useThemes'
import { useNavigate } from 'react-router-dom'

function App() {
  const {
    tickets,
    loading,
    error,
    handleAddTicket,
    handleMoveTicket,
    handleDeleteTicket,
    handleEditTicket,
  } = useTickets()

  const { userName, logout } = useAuth()
  const { toggleDarkMode } = useThemes()
  const navigate = useNavigate()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const title = 'Ticket Board'

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const ticketId = active.id as number
    const newStatus = over.id as Status

    handleMoveTicket(ticketId, newStatus)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 p-8 text-gray-800 dark:text-white text-2xl flex justify-between items-center">
        <h6>{title}</h6>
        <div className="flex items-center gap-4">
          <span className="text-sm">{userName}</span>
          <button
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg self-end p-2 cursor-pointer"
            onClick={toggleDarkMode}
          >
            Theme
          </button>
          <button
            className="bg-red-600 text-white p-2 rounded-lg cursor-pointer text-sm"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <TicketForm onCreate={handleAddTicket} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-y-2 min-h-screen">
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
    </div>
  )
}

export default App
