import UpdateTask from "./UpdateTask";
import { DeleteTask, DeleteAllTask } from "./DeleteTask";
import img from "../assets/todo.png";

function TaskList({ tasks, updateTask, deleteTask, deleteTaskAll, checkTask }) {
  if (!tasks.length) {
    return (
      <>
        <div className="max-w-80">
          <img src={img} alt="Your list is empty" />
        </div>
      </>
    );
  }
  return (
    <>
      <section>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`opacity-${task.check === true ? "20" : "100"}`}
          >
            <div
              className="flex justify-around  border-cyan-600"
              onClick={() => checkTask(task.id)}
            >
              <div className="w-full p-4 rounded-md bg-fuchsia-500 text">
                {task.body}
              </div>
            </div>

            <DeleteTask
              task={task}
              deleteTask={deleteTask}
              deleteTaskAll={deleteTaskAll}
            />
            <UpdateTask task={task} updateTask={updateTask} />
          </div>
        ))}
      </section>

      <div className="pt-10">
        <DeleteAllTask deleteTaskAll={deleteTaskAll} />
      </div>
    </>
  );
}

export default TaskList;
