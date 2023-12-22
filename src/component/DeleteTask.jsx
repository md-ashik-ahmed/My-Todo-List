import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";

function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onClose };
}

function DeleteAllTask({ deleteTaskAll }) {
  const { onClose } = useToggle(false);

  return (
    <>
      <button
        className="btn text-red-400"
        onClick={() => document.getElementById("deleteAll").showModal()}
      >
        Delete All
      </button>
      <dialog id="deleteAll" className="modal">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Do you want all data deleted? </h3>

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
                <button className="btn" onClick={() => deleteTaskAll()}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function DeleteTask({ task, deleteTask }) {
  const { onClose } = useToggle(false);

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("delete").showModal()}
      >
        <RiDeleteBin6Fill />
      </button>
      <dialog id="delete" className="modal">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p>{task.body}</p>
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
                  onClick={() => deleteTask(task.id, onClose)}
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export { DeleteTask, DeleteAllTask };
