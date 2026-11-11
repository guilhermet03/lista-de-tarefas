"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ListCheck, Plus, Trash, LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTask from "@/components/edit-task";
import { getTasks } from "@/actions/get-task";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import Filter, { FilterType } from "@/components/filter";
import { ClearTaskCompleted } from "@/actions/clear-completed-task";

const Home = () => {
  const [tasksList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();
      if (tasks) setTaskList(tasks);
    } catch {
      toast.error("Não foi possível carregar as tarefas");
    } finally {
      setLoadingList(false);
    }
  };

  const handleAddTask = async () => {
    const text = task.trim();
    if (!text) {
      toast.error("Insira uma atividade");
      return;
    }

    setLoading(true);
    try {
      await NewTask(text);
      setTask("");
      toast.success("Atividade adicionada com sucesso");
      await handleGetTasks();
    } catch {
      toast.error("Não foi possível adicionar a atividade");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      toast.warning("Atividade deletada com sucesso");
      await handleGetTasks();
    } catch {
      toast.error("Não foi possível deletar a atividade");
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const previousTasks = [...tasksList];
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
    try {
      await updateTaskStatus(taskId);
    } catch {
      setTaskList(previousTasks);
      toast.error("Não foi possível atualizar a tarefa");
    }
  };

  const clearCompletedTask = async () => {
    try {
      const remaining = await ClearTaskCompleted();
      setTaskList(remaining);
      toast.success("Tarefas concluídas removidas");
    } catch {
      toast.error("Não foi possível limpar as tarefas");
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  const completedCount = tasksList.filter((t) => t.done).length;
  const progress =
    tasksList.length > 0 ? (completedCount / tasksList.length) * 100 : 0;

  const filterTask =
    currentFilter === "pending"
      ? tasksList.filter((t) => !t.done)
      : currentFilter === "completed"
      ? tasksList.filter((t) => t.done)
      : tasksList;

  return (
    <main className="w-full min-h-screen bg-gray-100 flex justify-center items-start py-8 px-4">
      <Card className="w-full max-w-lg p-4">
        <CardHeader className="flex">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
            value={task}
          />
          <Button
            className="cursor-pointer"
            onClick={handleAddTask}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

          <div className="mt-4 border-b-1">
            {loadingList && (
              <p className="text-xs border-t-1 py-4">Carregando...</p>
            )}

            {!loadingList && tasksList.length === 0 && (
              <p className="text-xs border-t-1 py-4">
                Você não possui atividades cadastradas
              </p>
            )}

            {filterTask.map((t) => (
              <div
                className="h-14 flex justify-between items-center border-t-1"
                key={t.id}
              >
                <div
                  className={`w-1 h-full ${t.done ? "bg-green-500" : "bg-red-600"}`}
                ></div>
                <button
                  type="button"
                  className="flex-1 px-2 text-left text-sm cursor-pointer hover:text-gray-700"
                  onClick={() => handleToggleTask(t.id)}
                >
                  {t.task}
                </button>
                <div className="flex items-center gap-2">
                  <EditTask task={t} handleGetTasks={handleGetTasks} />
                  <button
                    type="button"
                    aria-label="Excluir tarefa"
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(t.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">
                Tarefas concluídas ({completedCount}/{tasksList.length})
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    className="text-xs h-7 cursor-pointer"
                    variant="outline"
                    disabled={completedCount === 0}
                  >
                    <Trash />
                    Limpar tarefas concluídas
                  </Button>
                }
              ></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir {completedCount}{" "}
                    {completedCount === 1 ? "item" : "itens"}?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="cursor-pointer" onClick={clearCompletedTask}>
                    Sim
                  </AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-end mt-2">
            <p className="text-xs">{tasksList.length} Tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;