import TicketCard, { type TicketCardProps } from './TicketCard'

function BoardColumn({ title, tickets }: { title: string, tickets: TicketCardProps[] }){
    return (
        <div className="bg-blue-600 text-white">
            <div className="bg-blue-800 py-2 text-center font-bold">{title}</div>
            <div className="mx-4 flex flex-col gap-4 py-4">
                {tickets.map((ticket) => (
                        <TicketCard
                        key={ticket.id}
                        id={ticket.id}
                        title={ticket.title}
                        priority={ticket.priority} />
                ))}
            </div>
        </div>
    )
}

export default BoardColumn
