"use server"
import { prisma } from "@/utils/prisma"

export const deleteTask = async (idTask: string) => {
  if (!idTask) throw new Error("Id inválido")
  return prisma.tasks.delete({ where: { id: idTask } })
}