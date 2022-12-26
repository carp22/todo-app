import TodoElements from "./components/TodoElements"
import {useState, useEffect} from "react"
import {nanoid} from "nanoid"

function App() {
  const [darkMode, setDarkMode] = useState("light")


  const [todoList, setTodoList] = useState([])
  const [newEntry, setNewEntry] = useState([])
  const [whatToDisplay, setWhatToDisplay] = useState("all")

  
  useEffect(() => {
    document.body.className = darkMode
  }, [darkMode])
  
  const newTodoItem = function(event){
    const {value} = event.target
    setNewEntry(value)
  }
  
  const toggleMode = function(){
    if(darkMode === "light"){
      setDarkMode("dark")
    } else {
      setDarkMode("light")
    }
  }

  const createNewTodo = function(){
    const newTodo = {
      id: nanoid(),
      description: newEntry,
      isSelected: false
    }
    setNewEntry("")
    setTodoList(oldState => [newTodo, ...oldState])
  } 

  const todoStatus = function (id) { 
    setTodoList(list => list.map(item =>{
      return id === item.id ? {
        ...item,
        isSelected : !item.isSelected
      } : item
    })) 
  }
  const deleteTodo = function (){
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      if (item["isSelected"]) {
        setTodoList(list => list.filter( item => item.isSelected === false))
      }     
    }     
  }
  const allTodos = function(){
    setWhatToDisplay("all")
  }
  const completedTodo = function (){
    setWhatToDisplay("completed")
  }
  const activeTodo = function (){
    setWhatToDisplay("active")
  }

/*   const todoItems = todoList.map(item => {
    return( 
      <div className= {`todo-element ${darkMode === "light" ? "item-lgth" : "item-drk"}`} key={item.id} > 
        {
          <>
            <input type="radio" className="todo-radio" id= {`todo-${item.id}`} onClick={() => todoStatus(item.id)}/> <h3 className={`todo-label ${item.isSelected && "status"}`}>{item.description}</h3> 
          </> 
            }
      </div>
  )}) */
  const todoItems = todoList.map(item => {
      return( 
            <>
            <div className= {`todo-element ${darkMode === "light" ? "item-lgth" : "item-drk"}`} key={item.id} > 
               {
                    whatToDisplay === "all"  ? (<> 
                                                    <input type="radio" className="todo-radio" id= {`todo-${item.id}`} onClick={() => todoStatus(item.id)}/> 
                                                    <h3 className={`todo-label ${item.isSelected && "status"}`}>{item.description}</h3> 
                                                </>) : 
                      whatToDisplay === "active" ? (
                                                (<>
                                                    <input type="radio" className="todo-radio" id= {`todo-${item.id}`} onClick={() => todoStatus(item.id)}/> 
                                                    <h3 className={`todo-label ${item.isSelected && "status"}`}>{!item.isSelected && item.description}</h3> 
                                              </>)
                      ) : 
                        (
                          <> 
                                <input type="radio" className="todo-radio" id= {`todo-${item.id}`} onClick={() => todoStatus(item.id)}/> 
                                <h3 className={`todo-label ${item.isSelected && "status"}`}>{item.isSelected && item.description}</h3> 
                        </>)}
                </div>
            </>
    )}) 
  
  return (
    <div>
         
        <TodoElements 
        darkMode={darkMode} 
        toggleMode={toggleMode}
        createNewTodo={createNewTodo}
        newTodoItem= {newTodoItem}
        newEntry = {newEntry}

        />
        
        <div className="todo-container">
          { todoItems}
        <div className={`todo-settings ${darkMode === "light" ? "item-lgth" : "item-drk"}`}>

            <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={() => console.log(todoList)}>Items left</h4>
            
            <div className="todo-status">
              <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={allTodos}>All</h4>
              <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={activeTodo}>Active</h4>
              <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={completedTodo}>Completed</h4>
            </div>
            <h4 className={`${ darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={deleteTodo}>Clear completed</h4>
          </div>
        </div>

    </div>
  )
}

export default App
