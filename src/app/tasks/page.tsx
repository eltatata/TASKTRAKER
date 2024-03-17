import TaskModel, { ITask } from "@/models/Task";
import { connectionDB } from "@/lib/database";
import { auth } from "@clerk/nextjs";

import TaskForm from "@/components/TaskForm";
import Tasks from "@/components/Tasks";
import Clock from "@/components/Clock";

const loadTasks = async () => {
  connectionDB();

  const { userId } = auth();

  let tasks: ITask[] = await TaskModel.find({ uid: userId }).lean();

  tasks = tasks.map(task => {
    task._id = task._id.toString();
    return task;
  });

  return tasks;
}

export default async function TasksPage() {
  const tasks = await loadTasks();

  return (
    <main className="flex items-start">
      <div className="flex justify-center items-center w-2/5 h-screen">
        <div className="fixed flex flex-col items-center w-2/5 gap-10 p-10">
          <Clock />
          <TaskForm />
        </div>
      </div>
      <Tasks tasks={tasks} />
    </main>
  )
}