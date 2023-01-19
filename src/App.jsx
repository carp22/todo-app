import TodoElements from "./components/TodoElements";
import { useState, useEffect } from "react";
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
        setItemsLeft(oldState => oldState - 1)
      
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
  }).map(item => {

    return (
      <div className={`todo-element ${darkMode === "light" ? "item-lgth" : "item-drk"}`} key={item.id} >
        <>
          <input type="checkbox" className="todo-check" onClick={() =>  todoStatus(item.id) }/>
          <h3 className={`todo-label ${item.isSelected && "status"}`}>{item.description}</h3>
          <button onClick={() => deleteTodo(item.id)}>X</button>
        </>
      </div>
    );
  });

  return (
    <div>

      <TodoElements
        darkMode={darkMode}
        toggleMode={toggleMode}
        createNewTodo={createNewTodo}
        newTodoItem={newTodoItem}
        newEntry={newEntry}

      />

      <div className="todo-container">
        {todoItems}
        <div className={`todo-settings ${darkMode === "light" ? "item-lgth" : "item-drk"}`}>

          <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`}> {itemsLeft} Items left</h4>

          <div className="todo-status">
            <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={allTodos}>All</h4>
            <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={activeTodo}>Active</h4>
            <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={completedTodo}>Completed</h4>
          </div>
          <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={deleteCompletedTodos}>Clear completed</h4>
        </div>
      </div>

    </div>
  );
}

export default App;
