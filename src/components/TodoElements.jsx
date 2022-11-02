import React from 'react'
import lightMode from "../../public/images/icon-sun.svg"
import darkMode from "../../public/images/icon-moon.svg"

function TodoElements(darkMode) {
  return (
    <div>
        <div className="todo-header">
            <h2>TODO</h2>
            <img src={lightMode} alt="mode" className='mode-icon'/>
        </div>
            <input type="text" className='newtodo-input' placeholder='Type'/>


    </div>
  )
}

export default TodoElements