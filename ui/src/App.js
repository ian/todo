import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import NewList from "./pages/NewChecklist"
import TodoList from "./pages/Checklist"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/checklists/:id">
          <TodoList />
        </Route>

        <Route path="/">
          <NewList />
        </Route>
      </Switch>
    </Router>
  )
  return
}

export default App
