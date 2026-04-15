import BoardColumn from './BoardColumn'

function App() {
  const title = "Ticket Board"

  return (
    <>
      <div className="bg-blue-950 p-8 text-white text-2xl">
        {title}
      </div>
      <div className="bg-gray-900 p-2 text-gray-400 text-2xl">
        by Marco
      </div>
      <div className="flex">
        <BoardColumn title="Open" />
        <BoardColumn title="In Progress" />
        <BoardColumn title="Review" />
        <BoardColumn title="Done" />
      </div>
    </>
  )
}

export default App
