import TodoElements from "./components/TodoElements"
import {useState} from "react"
import {nanoid} from "nanoid"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const [todoList, setTodoList] = useState([])
  
  const createNewTodo = function(){
    const newTodo = {
      id: nanoid(),
      description: "Hola",
      isSelected: false
    }
    setTodoList(oldState => [newTodo, ...oldState])
    console.log(newTodo)
  }

  const toggleMode = function(){
    setDarkMode(oldState => !oldState)
  }

  const todoItems = todoList.map(item => {
    return( 
      <div className= {`todo-elmenent ${darkMode ? "item-darkmode" : "item-lightmode"}`} key={item.id} > 
        <input type="radio" className="todo-radio" id= {`todo-${item.id}`}/> 
        <label htmlFor={`todo-${item.id}`}>{item.description}</label>
      </div>
  )})

  return (
    <div className={`App ${darkMode ? "darkmode" : "lightmode"}`}>

      <TodoElements 
        darkMode={darkMode} 
        toggleMode={toggleMode}
        createNewTodo={createNewTodo}/>
        
        <div className="todo-container">
          {todoItems}
        </div>

        <div className="todo-settings">

            <h4 className={`${ darkMode ? "setting-drk" : "setting-lght"}`}>Items left</h4>
            
            <div className="todo-status">
              <h4 className={`${ darkMode ? "setting-drk" : "setting-lght"}`}>All</h4>
              <h4 className={`${ darkMode ? "setting-drk" : "setting-lght"}`}>Active</h4>
              <h4 className={`${ darkMode ? "setting-drk" : "setting-lght"}`}>Completed</h4>
            </div>
            <h4 className={`${ darkMode ? "setting-drk" : "setting-lght"}`}>Clear completed</h4>
          </div>
    </div>
  )
}

export default App
