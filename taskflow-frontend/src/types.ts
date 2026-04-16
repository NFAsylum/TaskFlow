export const Priority = {
    Low: "low",
    Medium: "medium",
    High: "high"
} as const

export type Priority = typeof Priority[keyof typeof Priority]

export const Status = {
    Open: "open",
    InProgress: "in-progress",
    Review: "review",
    Done: "done"
} as const

export type Status = typeof Status[keyof typeof Status]

const statusOrder = [Status.Open, Status.InProgress, Status.Review, Status.Done]

export function nextStatus(currentStatus: Status): Status{
    const index = statusOrder.indexOf(currentStatus)
    return statusOrder[Math.min(index+1, statusOrder.length-1)]
}

export interface Ticket{
    id : number
    title: string
    priority: Priority
    status: Status
}

export interface TicketCardProps extends Ticket{
    onMove: () => void
}