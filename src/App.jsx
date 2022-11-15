import TodoElements from "./components/TodoElements"
import {useState, useEffect} from "react"
import {nanoid} from "nanoid"

function App() {
  const [darkMode, setDarkMode] = useState("light")


  const [todoList, setTodoList] = useState([])

  const toggleMode = function(){
    if(darkMode === "light"){
      setDarkMode("dark")
    } else {
      setDarkMode("light")
    }
  }

  useEffect(() => {
    document.body.className = darkMode
  }, [darkMode])
  

  const createNewTodo = function(){
    const newTodo = {
      id: nanoid(),
      description: "Hola",
      isSelected: false
    }
    setTodoList(oldState => [newTodo, ...oldState])
    console.log(newTodo)
  }


  const todoItems = todoList.map(item => {
    return( 
      <div className= {`todo-element ${darkMode === "light" ? "item-lgth" : "item-drk"}`} key={item.id} > 
        <input type="radio" className="todo-radio" id= {`todo-${item.id}`}/> <h3 className="todo-label">{item.description}</h3>
      </div>
  )})

  return (
    <div>

      <TodoElements 
        darkMode={darkMode} 
        toggleMode={toggleMode}
        createNewTodo={createNewTodo}/>
        
        <div className="todo-container">
          {todoItems}
        <div className={`todo-settings ${darkMode === "light" ? "item-lgth" : "item-drk"}`}>

            <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`}>Items left</h4>
            
            <div className="todo-status">
              <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`}>All</h4>
              <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`}>Active</h4>
              <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`}>Completed</h4>
            </div>
            <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`}>Clear completed</h4>
          </div>
        </div>

    </div>
  )
}

export default App
