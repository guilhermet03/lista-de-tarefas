import { SquarePen } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Tasks } from "@/generated/prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import { editTask } from "@/actions/edit-task";

type TasksProps ={
    task: Tasks
    handleGetTasks: () => void
}

const EditTask = ({task, handleGetTasks} : TasksProps) => {
    
    const [editedTask, setEditedTask] = useState(task.task)
    
    const handleEditTask = async () => {
      try {
        if(editedTask !== task.task) {
        toast.success("Você pode mandar as informações ao BD")
      } else {
        toast.error("As informações não foram alteradas")
        return
      }

      await editTask({
        idTask: task.id,
        newTask: editedTask
        })

        handleGetTasks()
      } catch (error) {
          throw error       
      }
    }


    return(
        <Dialog>
            <DialogTrigger render={
                <button type="button" aria-label="Editar tarefa" className="cursor-pointer" />}>
                <SquarePen size={16} />
            </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar tarefa</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <input 
                  placeholder="Editar tarefa" 
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <DialogClose render={<Button 
                  className="cursor-pointer"
                  onClick={handleEditTask}
                  />}>
                  Editar
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
    )
}

export default EditTask