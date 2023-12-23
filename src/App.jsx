import { useState, useEffect } from "react";
import "./App.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddTask from "./component/AddTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDriveFileMoveOutline } from "react-icons/md";
import UpdateTask from "./component/UpdateTask";
import { BsThreeDotsVertical } from "react-icons/bs";

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

  const [done, setDone] = useState(
    () => JSON.parse(localStorage.getItem("done")) || []
  );

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

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

    const newTasksUpdate = tasks.map((task) => {
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
    setDone([item, ...done]);
    const filterarray = inprogress.filter((x) => x.id !== id);
    setInprogress(filterarray);
  };
  const deleteDone = (id) => {
    const filterarray = done.filter((x) => x.id !== id);
    setDone(filterarray);
  };

  useEffect(() => {}, [tasks, inprogress]);

  return (
    <div className="App min-w-full h-screen">
      <div className="container min-h-screen min-w-screen">
        <h3 className="title py-3">ToDo List App</h3>
        <div className="item-center justify-center px-auto">
          <AddTask addTask={addTask} />
        </div>

        <div className="todos_wrapper">
          <div className="todos_list">
            <h3 className="todo_title text-2xl pb-3">To-do List</h3>
            {tasks.map((task) => (
              <div className="todo_card flex" key={task.id}>
                <p className="card_text text-xl text-white p-3 texts">
                  {task.body}
                </p>
                {/* =================three dot ===================== */}
                <div className="dropdown dropdown-left cursor-pointer text-black pt-2">
                  <label tabIndex={0}>
                    <BsThreeDotsVertical />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box cursor-pointer"
                  >
                    <button
                      className="flex items-center gap-1 text-lg hover:bg-slate-200 w-full py-1 rounded-lg ps-2 font-semibold"
                      onClick={() => addToProgress(task?.id)}
                    >
                      <MdDriveFileMoveOutline />
                      Move
                    </button>
                    <UpdateTask task={task} updateTask={updateTask} />
                    <button
                      onClick={() => deleteTodo(task?.id)}
                      className="flex items-center gap-1 text-lg hover:bg-slate-200 w-full py-1 rounded-lg ps-2 font-semibold"
                    >
                      <RiDeleteBin5Line />
                      Delete
                    </button>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="todos_list">
            <h3 className="todo_title text-2xl pb-3">In-Progress</h3>
            {inprogress.map((item) => (
              <div className="progress_card flex" key={item.key}>
                <p className="card_text text-white text-xl p-3 texts">
                  {item.body}
                </p>
                {/* =================three dot ===================== */}
                <div className="dropdown dropdown-left cursor-pointer pt-2">
                  <label tabIndex={0}>
                    <BsThreeDotsVertical />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box cursor-pointer"
                  >
                    <button
                      className="flex items-center gap-1 text-lg hover:bg-slate-200 w-full py-1 rounded-lg ps-2 font-semibold"
                      onClick={() => addtoCompleted(item?.id)}
                    >
                      <MdDriveFileMoveOutline />
                      Move
                    </button>
                    <button
                      onClick={() => deleteProgress(item?.id)}
                      className="flex items-center gap-1 text-lg hover:bg-slate-200 w-full py-1 rounded-lg ps-2 font-semibold"
                    >
                      <RiDeleteBin5Line />
                      Delete
                    </button>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="todos_list texts">
            <h3 className="todo_title text-2xl pb-3">Done</h3>
            {done.map((item) => (
              <div className="completed_card flex" key={item.id}>
                <p className="card_text text-xl p-2 texts">{item.body}</p>

                {/* =================three dot ===================== */}
                <div className="dropdown dropdown-left cursor-pointer text-black">
                  <label tabIndex={0}>
                    <BsThreeDotsVertical />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box cursor-pointer"
                  >
                    <button
                      onClick={() => deleteDone(item?.id)}
                      className="flex items-center gap-1 text-lg hover:bg-slate-200 w-full py-1 rounded-lg ps-2 font-semibold"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </ul>
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
