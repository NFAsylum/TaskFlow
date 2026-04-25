import { useState } from 'react'
import { Priority, Status } from './types'

interface TicketFormProps {
  onCreate: (title: string, priority: Priority, status: Status) => void
}

function TicketForm({ onCreate }: TicketFormProps) {
  const [title, setTitle] = useState<string>('Task')
  const [priority, setPriority] = useState<Priority>(Priority.Low)
  const [status, setStatus] = useState<Status>(Status.Open)

  function handleSubmit(submitEvent: React.SubmitEvent<HTMLFormElement>) {
    submitEvent.preventDefault()
    onCreate(title, priority, status)

    setTitle('Task')
    setPriority(Priority.Low)
    setStatus(Status.Open)
  }

  return (
    <div className="m-2 p-4 border rounded-2xl bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700 max-w-md mx-auto shadow-sm">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-bold pr-4">Task title</label>
          <input
            className="bg-gray-200 dark:bg-gray-600 rounded-lg px-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold pr-4">Priority</label>
          <select
            className="bg-gray-200 dark:bg-gray-600 rounded-lg cursor-pointer px-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold pr-4">Status</label>
          <select
            className="bg-gray-200 dark:bg-gray-600 rounded-lg cursor-pointer px-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-600 text-white dark:text-gray-200 p-2 px-4 rounded-lg cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default TicketForm
