import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose };
}

function UpdateTask({ task, updateTask }) {
  console.log(task);
  const [body, setBody] = useState("");
  const { onClose } = useToggle(false);

  return (
    <>
      <button onClick={() => document.getElementById("edit").showModal()}>
        <div className="flex items-center gap-1 text-lg hover:bg-slate-200 w-full py-1 rounded-lg ps-2 font-semibold">
          <FaRegEdit className="h-6 w-5  text-black rounded-lg cursor-pointer " />
          Edit
        </div>
      </button>
      <dialog id="edit" className="modal">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg pb-3">Update Your Task !</h3>

          <input
            type="text"
            placeholder="Enter your task"
            className="input input-info w-full max-w-xs "
            onChange={(e) => setBody(e.target.value)}
            defaultValue={task.body}
          />
          <div className="flex justify-around">
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={onClose}>
                  Close
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => updateTask(task?.id, body)}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default UpdateTask;
