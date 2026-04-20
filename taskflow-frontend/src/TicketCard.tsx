import { useState } from 'react'
import { Priority, Status, type TicketCardProps } from './types'

const priorityStyle = {
  [Priority.Low]: 'bg-green-500 rounded text-sm p-2',
  [Priority.Medium]: 'bg-yellow-500 rounded text-sm p-2',
  [Priority.High]: 'bg-red-500 rounded text-sm p-2',
}

function TicketCard({
  id,
  title,
  priority,
  status,
  onMove,
  onDelete,
  onEdit,
}: TicketCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [editTitle, setEditTitle] = useState<string>(title)
  const [editPriority, setEditPriority] = useState<Priority>(priority)
  const [editStatus, setEditStatus] = useState<Status>(status)

  return (
    <div className="bg-yellow-100 p-5 rounded-lg border border-amber-400">
      <button className="bg-red-500 p-1 rounded-2xl" onClick={onDelete}>
        X
      </button>
      {isEditing ? (
        <>
          <div>
            <label className="font-bold pr-4">Task title</label>
            <input
              className="bg-gray-200 rounded-4xl"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
            />
          </div>

          <div>
            <label className="font-bold pr-4">Priority</label>
            <select
              className="bg-gray-200 rounded-4xl"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
            >
              {Object.values(Priority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold pr-4">Status</label>
            <select
              className="bg-gray-200 rounded-4xl"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as Status)}
            >
              {Object.values(Status).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-purple-300 p-1 rounded-2xl"
            onClick={() => {
              onEdit(editTitle, editPriority, editStatus)
              setIsEditing(false)
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-800 p-2">{title}</p>
          <span className={priorityStyle[priority]}>{priority}</span>
          <button
            className="bg-purple-300 p-1 rounded-2xl"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            Edit
          </button>
        </>
      )}
      <h3 className="text-gray-800">{id}</h3>
      <button className="bg-gray-400" onClick={onMove}>
        {'<>'}
      </button>
    </div>
  )
}

export default TicketCard
