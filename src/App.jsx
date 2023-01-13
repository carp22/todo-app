import TodoElements from "./components/TodoElements";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  
  const [darkMode, setDarkMode] = useState("light");
  const [todoList, setTodoList] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [whatToDisplay, setWhatToDisplay] = useState("all");

  const [itemsLeft, setItemsLeft] = useState(0)

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


  useEffect(() => {
    document.body.className = darkMode;
  }, [darkMode]);

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

  const deleteTodo = function () {
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      if (item["isSelected"]) {
        setTodoList(list => list.filter(item => item.isSelected === false));
      }
    }
  };

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
          <input type="checkbox" className="todo-radio" id={`todo-${item.id}`} onClick={() =>  todoStatus(item.id) }/>
          <h3 className={`todo-label ${item.isSelected && "status"}`}>{item.description}</h3>
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

          <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={() => console.log(todoList)}> {itemsLeft} Items left</h4>

          <div className="todo-status">
            <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={allTodos}>All</h4>
            <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={activeTodo}>Active</h4>
            <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={completedTodo}>Completed</h4>
          </div>
          <h4 className={`${darkMode === "light" ? "setting-lght" : "setting-drk"}`} onClick={deleteTodo}>Clear completed</h4>
        </div>
      </div>

    </div>
  );
}

export default App;
