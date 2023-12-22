import { useState, useEffect } from "react";
import "./App.css";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import AddTask from "./component/AddTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDriveFileMoveOutline } from "react-icons/md";
import UpdateTask from "./component/UpdateTask";

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [inprogress, setInprogress] = useState(
    () => JSON.parse(localStorage.getItem("inprogress")) || []
  );

  useEffect(() => {
    localStorage.setItem("inprogress", JSON.stringify(inprogress));
  }, [inprogress]);

  const [completed, setCompleted] = useState(
    () => JSON.parse(localStorage.getItem("completed")) || []
  );

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);
  // const [input, setInput] = useState("");

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  }

  function deleteTaskAll() {
    setTasks([]);
  }

  function checkTask(id) {
    const newTasksCheck = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });
    setTasks(newTasksCheck);
  }

  function updateTask(id, body, onClose) {
    const info = body.trim();

    if (!info) {
      toast.warning("Enter your task!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });

      return;
    }

    const newTasksUpdate = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });

    setTasks(newTasksUpdate);

    onClose();
  }

  function addTask(task) {
    setTasks([task, ...tasks]);
  }

  // const addTodo = () => {
  //   const todo = {
  //     id: Math.floor(Math.random() * 1000),
  //     text: input,
  //   };
  //   setTodos([todo, ...todos]);
  // };
  const addToProgress = (id) => {
    const item = tasks.find((x) => x.id === id);
    setInprogress([item, ...inprogress]);
    const filterarray = tasks.filter((x) => x.id !== id);
    setTasks(filterarray);
  };

  const deleteProgress = (id) => {
    const filterarray = inprogress.filter((x) => x.id !== id);
    setInprogress(filterarray);
  };
  const deleteTodo = (id) => {
    const filterarray = tasks.filter((x) => x.id !== id);
    setTasks(filterarray);
  };
  const addtoCompleted = (id) => {
    const item = inprogress.find((x) => x.id === id);
    setCompleted([item, ...completed]);
    const filterarray = inprogress.filter((x) => x.id !== id);
    setInprogress(filterarray);
  };
  const deleteDone = (id) => {
    const filterarray = completed.filter((x) => x.id !== id);
    setCompleted(filterarray);
  };

  useEffect(() => {}, [tasks, inprogress]);

  return (
    <div className="App">
      <div className="container">
        <h3 className="title py-3">ToDo List App</h3>
        <div className="item-center justify-center px-auto">
          <AddTask addTask={addTask} />
        </div>

        {/* <form className="form_todo">
          <input
            type="text"
            placeholder="Enter your task"
            className="input input-info input-bordered w-full max-w-xs"
            onChange={(e) => setInput(e.target.value)}
            // value={content}
          />
          <button type="button" className="btn" onClick={() => addTodo()}>
            Add
          </button>
        </form> */}
        <div className="todos_wrapper">
          <div className="todos_list">
            <h3 className="todo_title pb-3">To-do List</h3>
            {tasks.map((task, index) => (
              <div className="todo_card" key={task.id}>
                <p className="card_text text-black p-3">{task.body}</p>
                <hr />
                <div className="space-x-12 inline-flex justify-around p-2">
                  <MdDriveFileMoveOutline
                    onClick={() => addToProgress(task.id)}
                  />

                  <UpdateTask task={task} updateTask={updateTask} />
                  <FaTrash onClick={() => deleteTodo(task.id)} />
                </div>
              </div>
            ))}
          </div>
          <div className="todos_list">
            <h3 className="todo_title pb-3">In-Progress</h3>
            {inprogress.map((item, index) => (
              <div className="progress_card" key={item.key}>
                <p className="card_text p-3">{item.body}</p>
                <div className="space-x-12 inline-flex justify-around">
                  <MdDriveFileMoveOutline
                    onClick={() => addtoCompleted(item.id)}
                  />
                  <FaTrash onClick={() => deleteProgress(item.id)} />
                </div>
              </div>
            ))}
          </div>
          <div className="todos_list">
            <h3 className="todo_title pb-3">Done</h3>
            {completed.map((item, index) => (
              <div className="completed_card" key={item.id}>
                <p className="card_text p-2">{item.body}</p>
                <div className="space-x-12 inline-flex justify-around">
                  <FaTrash onClick={() => deleteDone(item.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
