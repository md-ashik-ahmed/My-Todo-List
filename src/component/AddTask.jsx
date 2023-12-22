import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTask({ addTask }) {
  const [content, setContent] = useState("");
  const [statusInput, setStatusInput] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const taskText = content.trim();

    if (!taskText) {
      toast.warning("Enter your task!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      setStatusInput(false);

      return setContent("");
    }

    const task = {
      id: nanoid(),
      body: taskText,
      check: false,
    };

    addTask(task);
    setContent("");
  }

  if (content && !statusInput) {
    setStatusInput(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex item-center justify-center px-auto">
        <input
          type="text"
          placeholder="Enter your task"
          className="input input-info input-bordered w-full max-w-xs"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <button className="btn btn-active btn-accent" type="submit">
          Add
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default AddTask;
