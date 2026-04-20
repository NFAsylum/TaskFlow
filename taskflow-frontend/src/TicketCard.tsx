import { Priority, type TicketCardProps } from './types'

const priorityStyle = {
    [Priority.Low]: "bg-green-500 rounded text-sm p-2",
    [Priority.Medium]: "bg-yellow-500 rounded text-sm p-2",
    [Priority.High]: "bg-red-500 rounded text-sm p-2"
}

function TicketCard({ id, title, priority, onMove, onDelete }: TicketCardProps){
    return(
        <div className="bg-yellow-100 p-5 rounded-lg border border-amber-400">
            <button className="bg-red-500 p-1 rounded-2xl" onClick={onDelete}>X</button>
            <h3 className="text-gray-800">{id}</h3>
            <p className="text-gray-800 p-2">{title}</p>
            <span className={priorityStyle[priority]}>{priority}</span>
            <button className="bg-gray-400" onClick={onMove}>{"<>"}</button>
        </div>
    )
}

export default TicketCard
