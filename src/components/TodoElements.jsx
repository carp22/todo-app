import React from 'react'
import sun from "../../public/images/icon-sun.svg"
import moon from "../../public/images/icon-moon.svg"

import lightBg from "../../public/images/bg-desktop-light.jpg"
import darkBg from "../../public/images/bg-desktop-dark.jpg"

function TodoElements({darkMode, toggleMode, createNewTodo}) {
  return (
    <div className= {`todo-body ${darkMode ? "darkbg-image" : "lightbg-image"}`}>
        <div className="todo-header">
            <h2 className='todo_label'>TODO</h2>
        </div>
        <div className="modeicon-container">
            <img src={darkMode ? sun : moon} alt="mode" 
                className='mode-icon'
                onClick={toggleMode}/>
        </div>
        <div className="newtodo-container">
          <input type="radio" className='radio' onClick={createNewTodo}/>
            <input type="text" 
                  className={`newtodo-input ${darkMode && "darkmode"}`} 
                  placeholder='Create a new todo...'/>
        </div>


    </div>
  )
}

export default TodoElements