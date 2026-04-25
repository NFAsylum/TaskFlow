# TaskFlow

TaskFlow is a Kanban board for task management via tickets. TaskFlow enables fast and simple task management with drag-and-drop and edit in-place of tickets.

## Stack

**Frontend:** React 19, TypeScript, Tailwind CSS, React Router, @dnd-kit

**Backend:** ASP.NET Core (.NET 9), Entity Framework Core, SQLite

**Auth:** JWT + BCrypt

## Setup

### Backend

```bash
cd TaskFlow.Api
dotnet restore
dotnet ef database update
dotnet run -- --auto-create-jwt true
```

### Frontend

```bash
cd taskflow-frontend
npm install
npm run dev
```

The app runs at http://localhost:5173 with the API at http://localhost:5278
