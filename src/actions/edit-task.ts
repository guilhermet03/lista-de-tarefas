"use server"
import { prisma } from "@/utils/prisma"

type EditTaskProps = { idTask: string; newTask: string }

export const editTask = async ({ idTask, newTask }: EditTaskProps) => {
  const text = newTask.trim()
  if (!idTask || !text || text.length > 200) throw new Error("Dados inválidos")
  return prisma.tasks.update({ where: { id: idTask }, data: { task: text } })
}