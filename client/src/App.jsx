import './App.css';
import { PaginatedBackLog } from './components/paginated-backlog/paginated-backlog.jsx';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Kanban Board</h1>
      </header>
      <main>
        <PaginatedBackLog />
      </main>
    </div>
  )
}

export default App;