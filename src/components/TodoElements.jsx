import React from 'react'
import sun from "../../public/images/icon-sun.svg"
import moon from "../../public/images/icon-moon.svg"

function TodoElements({darkMode, toggleMode, createNewTodo, newEntry, newTodoItem}) {
  return (
    <>
      <div className= {`todo-body ${darkMode === "light" ? "lght-background" : "drk-background"}`} >
        <h2 className='todo-title'>TODO</h2>
        <img src={darkMode === "light" ? moon : sun} alt="mode" 
            className='mode-icon'
            onClick={toggleMode}/>
        <div className="newtodo-container">
          <input type="button" className='buttonNewTodo' onClick={createNewTodo} />
          <input type="text" className={`newtodo-input ${darkMode === "light" ? "item-lgth" : "item-drk"}`} placeholder='Create a new to-do...' value={newEntry} onChange={newTodoItem}/>
        </div>
      </div>
    </>
  )
}

export default TodoElements