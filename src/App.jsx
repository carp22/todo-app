import TodoElements from "./components/TodoElements"
import {useState} from "react"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleMode = function(){
    setDarkMode(oldState => !oldState)
  }

  return (
    <div className={`App ${darkMode && "darkmode"}`}>
      <TodoElements darkMode={darkMode} toggleMode={toggleMode}/>
    </div>
  )
}

export default App
