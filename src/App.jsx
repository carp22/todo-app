import TodoElements from "./components/TodoElements";
import Footer from "./components/Footer";
import crossIcon from "../public/images/icon-cross.svg"

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { nanoid } from "nanoid";


function App() {
  
  const [darkMode, setDarkMode] = useState("light");
  const [todoList, setTodoList] = useState( JSON.parse(localStorage.getItem("todoList")) || []);
  const [newEntry, setNewEntry] = useState("");
  const [whatToDisplay, setWhatToDisplay] = useState("all");
  const [itemsLeft, setItemsLeft] = useState( JSON.parse(localStorage.getItem("itemsLeft"))|| 0 )

  useEffect(() => {
    document.body.className = darkMode;
    localStorage.setItem("todoList", JSON.stringify(todoList))
    localStorage.setItem("itemsLeft", JSON.stringify(itemsLeft))
    
  }, [darkMode, todoList ]);
  
  const styles = {
    color: darkMode === "light" ? "hsl(236, 9%, 61%)": "hsl(233, 14%, 35%)",
    transition: "all 1s ease"
  }

  const reorderTodos = (list, startIndex, endIndex) => {
    
    const reorderList = [...list];
    const [removed] = reorderList.splice(startIndex, 1);
    reorderList.splice(endIndex, 0, removed)
    return reorderList
  }

  const createNewTodo = function () {
    const decomposeEntry = newEntry.split("").every(item => item == "")

    if(decomposeEntry){
      return alert("A blank TODO is not allowed")
    }

    const newTodo = {
      id: nanoid(),
      description: newEntry,
      isSelected: false
    };
    setNewEntry("");
    setTodoList(oldState => [newTodo, ...oldState]);
    setItemsLeft(oldState => oldState + 1)
  };

  const newTodoItem = function (event) {
    const { value } = event.target;
    setNewEntry(value);
  };

  const toggleMode = function () {
    if (darkMode === "light") {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  };

  const todoStatus = function (id) {
    todoList.map(item=> {
      if (id === item.id) {
        if (event.target.checked) {
          setItemsLeft(oldState => oldState - 1)
        } else {
          setItemsLeft(oldState => oldState + 1)
        }
      } 
    })

    setTodoList(list => list.map(item => {
      return id === item.id ? 
      {
        ...item,
        isSelected: !item.isSelected
      } : item;
    }))
  }

  const deleteCompletedTodos = function () {
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      if (item["isSelected"]) {
        setTodoList(list => list.filter(item => item.isSelected === false));
      }
    }
  };

  const deleteTodo = (id) => {
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      if (item["id"] === id) {
        setTodoList(list => list.filter(item => item.id != id));
        if(!item.isSelected){
          setItemsLeft(oldState => oldState - 1)  
        }
    }

  }
  }
  const allTodos = function () {
    setWhatToDisplay("all");
  };
  const completedTodo = function () {
    setWhatToDisplay("completed");
  };
  const activeTodo = function () {
    setWhatToDisplay("active");
  };

  const todoItems = todoList.filter(item => {
    if (whatToDisplay === "all") return true;
    if (whatToDisplay === "completed") return item.isSelected;
    if (whatToDisplay === "active") return !item.isSelected;
  }).map((item, index) => {

    return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className={`todo-element ${darkMode === "light" ? "light" : "dark"}`} > 
                  <>
                    <label className={`todo-label ${darkMode === "light" ? "item-lgth" : "item-drk"} ${item.isSelected && "status"}`}  >
                      <input type="checkbox" className="todo-check" defaultChecked={item.isSelected ? true : false} onClick={() =>  todoStatus(item.id) }/>
                        <span className="checkbox-custom"></span>
                      {item.description}
                    </label>
                    <img src={crossIcon} alt="delete-button"  className="crossicon" onClick={() => deleteTodo(item.id)} />  
                  </>
              </div>
            )}
          </Draggable>
    )
  });

  return (
    <div className="app">

      <DragDropContext onDragEnd={(result) => {
        const {source, destination} = result;
        if(!destination) {
          return
        }
        if (source.index === destination.index && source.droppableId === destination.droppableId){
          return
        }

        setTodoList(oldState => reorderTodos(oldState, source.index, destination.index))

        }}>

        <TodoElements
          darkMode={darkMode}
          toggleMode={toggleMode}
          createNewTodo={createNewTodo}
          newTodoItem={newTodoItem}
          newEntry={newEntry}
        />

        <div className="todo-container" >

          <Droppable key={nanoid()} droppableId="to-dos">
            {(provided) => 
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoItems}
                {provided.placeholder}
              </div>
            }
          </Droppable>

          <div className=  {`todo-settings ${darkMode === "light" ? "light" : "dark"}`} >

            <h3 style={styles}>{itemsLeft} Items left</h3>

            <div className="todo-status">
              <button className={`filter ${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={allTodos}>All</button>
              <button className={`filter ${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={activeTodo}>Active</button>
              <button className={`filter ${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={completedTodo}>Completed</button>
            </div>

            <h3  className={`filter ${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={deleteCompletedTodos}>Clear completed</h3>
          </div>
        </div>

      </DragDropContext>

      <Footer darkMode={darkMode} styles={styles}/>  
      
    </div>
  );
}

export default App;
