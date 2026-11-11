"use server"
import { prisma } from "@/utils/prisma"

export const NewTask = async (tarefa: string) => {
  const text = tarefa.trim()
  if (!text || text.length > 200) throw new Error("Tarefa inválida")
  return prisma.tasks.create({ data: { task: text, done: false } })
}