"use client"

import { SquarePen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Tasks } from "@/generated/prisma/client"
import { editTask } from "@/actions/edit-task"

type Props = {
  task: Tasks
  handleGetTasks: () => Promise<void>
}

const EditTask = ({ task, handleGetTasks }: Props) => {
  const [open, setOpen] = useState(false)
  const [editedTask, setEditedTask] = useState(task.task)

  const handleEditTask = async () => {
    const text = editedTask.trim()

    if (!text) {
      toast.error("A tarefa não pode ficar vazia")
      return
    }
    if (text === task.task) {
      toast.error("As informações não foram alteradas")
      return
    }

    try {
      await editTask({ idTask: task.id, newTask: text })
      toast.success("Atividade editada com sucesso")
      setOpen(false)
      await handleGetTasks()
    } catch {
      toast.error("Não foi possível editar a atividade")
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (isOpen) setEditedTask(task.task)
      }}
    >
      <DialogTrigger
        render={<button type="button" aria-label="Editar tarefa" className="cursor-pointer" />}
      >
        <SquarePen size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleEditTask()
          }}
        >
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <Button type="submit" className="cursor-pointer">Editar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask