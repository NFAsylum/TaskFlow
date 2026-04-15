import TicketCard, { type TicketCardProps } from './TicketCard'

const tasks: TicketCardProps[] = [
    { id: 1, title: "Task 1", priority: "low"},
    { id: 2, title: "Task 2", priority: "medium"},
    { id: 3, title: "Task 3", priority: "high"}
]

function BoardColumn({ title }: { title: string}){
    return (
        <div className="bg-blue-600 text-white">
            <div className="bg-blue-800 py-2 text-center font-bold">{title}</div>
            <div className="mx-4 flex flex-col gap-4 py-4">
                {tasks.map((task) => (
                        <TicketCard key={task.id} id={task.id} title={task.title} priority={task.priority} />
                ))}
            </div>
        </div>
    )
}

export default BoardColumn
