"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Check, List, ListCheck, Plus, Trash, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTask from "@/components/edit-tank";
import { getTasks } from "@/actions/gat-tanks-from.db";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";



const Home = () => {
  const [tasksList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    try {
      if (task.length === 0 || !task) {
        return;
      }
      const myNewTask = await NewTask(task);

      if (!myNewTask) return;
        setTask('')
      toast.success('Atividade adicionado com sucesso')
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {

      if(!id) return

      const deletedTask = await deleteTask(id)

      if(!deletedTask) return
      toast.warning('Atividade deletada com sucesso')
      
    } catch (error) {
      throw error
    }
    await handleGetTasks()
  }

  const handleToggleTask = async (taskId: string) => {
    const priviousTasks = [...tasksList] 
    setTaskList((prev) => {
      const updateTaskList = prev.map(task => {
        if(task.id === taskId){
          return {
            ...task,
            done: !task.done
          }
        } else {
          return task
        }
      })
      return updateTaskList
    })

  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            <Plus /> Cadrastrar{" "}
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2 ">
            <Badge className="cursor-pointer" variant="default">
              <List />
              Lista
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <X />
              Não Concluidas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check />
              Concluidas
            </Badge>
          </div>

          <div className="mt-4 border-b-1">

            {tasksList.map((task) => (
              <div
                className="h-14 flex justify-between items-center  border-t-1"
                key={task.id}
              >
                <div className={`${task.done ? 'w-1 h-full bg-green-500' : 'w-1 h-full bg-red-600'}`}></div>
                <p className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                onClick={() => handleToggleTask(task.id)}>
                  {task.task}</p>
                <div className="flex items-center gap-2">
                  <EditTask></EditTask>

                  <Trash size={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluidas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    className="text-xs h-7 cursor-pointer"
                    variant="outline"
                  >
                    <Trash />
                    Limpar tarefas concluidas
                  </Button>
                }
              ></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x itens?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "56%" }}
            ></div>
          </div>
          <div className="flex justify-end mt-2">
            <p className="text-xs">3 Tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
