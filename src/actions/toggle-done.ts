"use server"
import { prisma } from "@/utils/prisma"

export const updateTaskStatus = async (taskId: string) => {
  const currentTask = await prisma.tasks.findUnique({ where: { id: taskId } })
  if (!currentTask) throw new Error("Tarefa não encontrada")
  return prisma.tasks.update({ where: { id: taskId }, data: { done: !currentTask.done } })
}