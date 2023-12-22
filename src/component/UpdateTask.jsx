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
  const [body, setBody] = useState("");
  const { onClose } = useToggle(false);

  return (
    <>
      <button onClick={() => document.getElementById("edit").showModal()}>
        <FaRegEdit className="h-7 w-6  text-white rounded-lg " />
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
                  onClick={() => updateTask(task.id, body, onClose)}
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
