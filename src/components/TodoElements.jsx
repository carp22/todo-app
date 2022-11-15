import React from 'react'
import sun from "../../public/images/icon-sun.svg"
import moon from "../../public/images/icon-moon.svg"

function TodoElements({darkMode, toggleMode, createNewTodo}) {
  return (
    <>
    <div className= "todo-body">
      <h2 className='todo-title'>TODO</h2>
      <img src={darkMode ? sun : moon} alt="mode" 
          className='mode-icon'
          onClick={toggleMode}/>
      </div>
      <div className="newtodo-container">
        <input type="radio" className='radio' onClick={createNewTodo}/>
        <input type="text" className={`newtodo-input ${darkMode === "light" ? "item-lgth" : "item-drk"}`} placeholder='Create a new todo...'/>
      </div>

      
    </>
  )
}

export default TodoElements