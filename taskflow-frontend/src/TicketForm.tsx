import { useState } from 'react'
import {Priority, Status } from './types'

interface TicketFormProps{
    onCreate: (title: string, priority: Priority, status: Status) => void
}

function TicketForm({ onCreate }: TicketFormProps){
    const [title, setTitle] = useState<string>("Task")
    const [priority, setPriority] = useState<Priority>(Priority.Low)
    const [status, setStatus] = useState<Status>(Status.Open)

    function handleSubmit(submitEvent: SubmitEvent){
        submitEvent.preventDefault();
        onCreate(title, priority, status)

        setTitle("Task")
        setPriority(Priority.Low)
        setStatus(Status.Open)
    }

    return(
        <div className="m-2 p-4 border-4 rounded-2xl bg-blue-100">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-bold pr-4">Task title</label>
                    <input className="bg-gray-200 rounded-4xl" type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>

                <div>
                    <label className="font-bold pr-4">Priority</label>
                    <select className="bg-gray-200 rounded-4xl" value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)} >
                        {Object.values(Priority).map((priority) => (
                            <option
                            key={priority}
                            value={priority}>{priority}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="font-bold pr-4">Status</label>
                    <select className="bg-gray-200 rounded-4xl" value={status}
                    onChange={(e) => setStatus(e.target.value as Status)} >
                        {Object.values(Status).map((status) => (
                            <option
                            key={status}
                            value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <button className="bg-gray-400 m-2 p-3 rounded-2xl" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default TicketForm
