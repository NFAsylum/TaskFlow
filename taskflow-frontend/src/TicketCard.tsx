import { useDraggable } from '@dnd-kit/core'

import { useState } from 'react'
import { Priority, Status, type TicketCardProps } from './types'

const priorityStyle = {
  [Priority.Low]: 'bg-green-500 dark:bg-green-600 rounded text-sm p-2',
  [Priority.Medium]: 'bg-yellow-500 dark:bg-yellow-600 rounded text-sm p-2',
  [Priority.High]: 'bg-red-500 dark:bg-red-600 rounded text-sm p-2',
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

  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="flex flex-col items-center pb-4">
        <h3
          {...listeners}
          {...attributes}
          className="textx-gray-400 bg-gray-100 dark:bg-gray-700 cursor-grab text-center text-sm py-1 rounded-t-lg w-30"
        >
          {id}
        </h3>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <div>
            <label className="font-bold text-gray-600 pr-4 content-center">
              Task title
            </label>
            <input
              className="bg-gray-200 dark:bg-gray-600 rounded-4xl"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
            />
          </div>

          <div>
            <label className="font-bold text-gray-600 pr-4">Priority</label>
            <select
              className="bg-gray-200 dark:bg-gray-600 rounded-4xl cursor-pointer"
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
            <label className="font-bold text-gray-600 pr-4">Status</label>
            <select
              className="bg-gray-200 dark:bg-gray-600 rounded-4xl cursor-pointer"
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
        </div>
      ) : (
        <>
          <p className="text-gray-800 dark:text-gray-100 p-2 text-lg font-semibold text-center">
            {title}
          </p>
          <span className={priorityStyle[priority]}>{priority}</span>
        </>
      )}

      <div className="flex gap-2 mt-3">
        {isEditing ? (
          <>
            <button
              className="bg-blue-600 text-white p-1 px-3 rounded-2xl cursor-pointer text-sm"
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
            <button
              className="bg-blue-600 text-white p-1 px-3 rounded-2xl cursor-pointer text-sm"
              onClick={() => {
                setIsEditing(true)
              }}
            >
              Edit
            </button>
          </>
        )}

        <button
          className="bg-gray-400 dark:bg-gray-600 text-white p-1 rounded-2xl px-3 cursor-pointer text-sm"
          onClick={onMove}
        >
          Move
        </button>

        <button
          className="bg-red-600 dark:bg-red-900 text-white p-1 px-3 rounded-2xl cursor-pointer text-sm"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TicketCard
