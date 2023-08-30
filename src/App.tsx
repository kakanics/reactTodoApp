import { useState } from "react";
import { useEffect } from "react";
import inputField from "./inputField";
import TodoElement from "./todoElement";
import listColumn from "./listColumn";

function App() {
  const [todo, setTodo] = useState([""]);
  const [done, setDone] = useState([""]);
  const [todoText, setTodoText] = useState("");
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);
  useEffect(() => {
    setTodoEle(todo.map((Todo: string) => TodoElement(Todo, markAsDone, 0)));
  }, [todo]);

  useEffect(() => {
    setDoneEle(done.map((Done: string) => TodoElement(Done, markAsDone, 1)));
  }, [done]);
  const [todoEle, setTodoEle] = useState(
    todo.map((Todo: string) => TodoElement(Todo, markAsDone, 0))
  );
  const [DoneEle, setDoneEle] = useState(
    todo.map((Done: string) => TodoElement(Done, markAsDone, 1))
  );

  function saveDataToLocalStorage() {
    // console.log("saved data to local storage");
    const doneJSON = JSON.stringify(done);
    const todoJSON = JSON.stringify(todo);

    localStorage.setItem("done", doneJSON);
    localStorage.setItem("todo", todoJSON);
  }
  function saveMarkedAsReadDone(filteredArray: string[], x: string) {
    const doneJSON = JSON.stringify(filteredArray);
    const todoJSON = JSON.stringify([...todo, x]);
    //console.log("todo", [...todo, x], "done", filteredArray);

    localStorage.setItem("done", doneJSON);
    localStorage.setItem("todo", todoJSON);
  }
  function saveMarkedAsReadTodo(filteredArray: string[], x: string) {
    const doneJSON = JSON.stringify([...done, x]);
    const todoJSON = JSON.stringify(filteredArray);
    //console.log("todo", filteredArray, "done", [...done, x]);

    localStorage.setItem("done", doneJSON);
    localStorage.setItem("todo", todoJSON);
  }
  function loadDataFromLocalStorage() {
    //console.log("received data from local storage");
    const doneJSON = localStorage.getItem("done");
    const todoJSON = localStorage.getItem("todo");

    if (doneJSON === null || todoJSON === null) return;
    const doneArray = JSON.parse(doneJSON);
    const todoArray = JSON.parse(todoJSON);

    setDone(doneArray);
    setTodo(todoArray);

    setTodoEle(todo.map((Todo: string) => TodoElement(Todo, markAsDone, 0)));
    setDoneEle(done.map((Done: string) => TodoElement(Done, markAsDone, 1)));
  }
  function clearDone() {
    while (done.length > 0) {
      done.pop(); //for some reason, done.pop() leaves one element in the array, I ran it twice to fix it
    }
    setDoneEle(done.map((Done: string) => TodoElement(Done, markAsDone, 1)));
    addTodo("Enter");
    saveDataToLocalStorage();
  }
  function addTodo(e: string) {
    if (e !== "Enter") {
      if (e === "Backspace") {
        setTodoText(todoText.slice(0, -1)); // Remove the last character
      } else if (e.length > 1) {
      } else setTodoText(todoText + e);
      return;
    }
    todo.push(todoText);
    if (todoText === "") todo.pop();
    setTodoText("");
    setTodoEle(todo.map((Todo: string) => TodoElement(Todo, markAsDone, 0)));
    saveDataToLocalStorage();
  }
  function markAsDone(id: number, text: string) {
    //console.log(todo);
    if (id == 0) {
      const changedArr = todo.filter((value) => value !== text);
      setTodo(changedArr);
      setDone([...done, text]);
      setTodoEle(todo.map((Todo: string) => TodoElement(Todo, markAsDone, 0)));
      setDoneEle(done.map((Done: string) => TodoElement(Done, markAsDone, 1)));
      saveMarkedAsReadTodo(changedArr, text);
    } else if (id == 1) {
      const changedArr = done.filter((value) => value !== text);
      setDone(changedArr);
      setTodo([...todo, text]);
      setTodoEle(todo.map((Todo: string) => TodoElement(Todo, markAsDone, 0)));
      setDoneEle(done.map((Done: string) => TodoElement(Done, markAsDone, 1)));
      saveMarkedAsReadDone(changedArr, text);
    }
  }

  return (
    <div
      className="text-bg-dark p-3"
      style={{
        display: "flex",
        fontFamily: "ubuntu",
        flexDirection: "column",
        height: "100vh",
        margin: 0,
        maxWidth: "100%",
      }}
    >
      {inputField(addTodo, todoText)}
      <div className="container text-center">
        <div className="row">
          {listColumn("Todo", todoEle)}
          {listColumn("Done", DoneEle)}
          <div className="col-1 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => clearDone()}
              style={{
                width: "100px",
                height: "100px",
                marginLeft: "47%",
              }}
            >
              <img
                src="./del.png"
                width={80}
                height={80}
                alt="Delete All Completed Tasks"
                style={{ padding: 10 }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
