export interface TicketCardProps{
    id : number
    title: string
    priority: ("low" | "medium" | "high")
}

const priorityStyle = {
    low: "bg-green-500 rounded text-sm p-2",
    medium: "bg-yellow-500 rounded text-sm p-2",
    high: "bg-red-500 rounded text-sm p-2"
}

function TicketCard({ id, title, priority }: TicketCardProps){
    return(
        <div className="bg-yellow-100 p-5 rounded-lg border border-amber-400">
            <h3 className="text-gray-800">{id}</h3>
            <p className="text-gray-800 p-2">{title}</p>
            <span className={priorityStyle[priority]}>{priority}</span>
        </div>
    )
}

export default TicketCard