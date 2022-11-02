import TodoElements from "./components/TodoElements"
import {useState} from "react"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div>
      <TodoElements darkMode={darkMode} />
    </div>
  )
}

export default App
