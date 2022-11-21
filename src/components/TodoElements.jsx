import React from 'react'
import sun from "../../public/images/icon-sun.svg"
import moon from "../../public/images/icon-moon.svg"

function TodoElements({darkMode, toggleMode, createNewTodo, newEntry, newTodoItem}) {
  return (
    <>
    <div className= "todo-body">
      <h2 className='todo-title'>TODO</h2>
      <img src={darkMode ? sun : moon} alt="mode" 
          className='mode-icon'
          onClick={toggleMode}/>
      </div>
      <div className="newtodo-container">
        <input type="checkbox" className='radio' onClick={createNewTodo} />
        <input type="text" className={`newtodo-input ${darkMode === "light" ? "item-lgth" : "item-drk"}`} placeholder='Create a new todo...' value={newEntry} onChange={newTodoItem}/>
      </div>

      
    </>
  )
}

export default TodoElements