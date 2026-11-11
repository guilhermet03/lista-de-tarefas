"use server"
import { prisma } from "@/utils/prisma"

export const getTasks = async () => {
  return prisma.tasks.findMany({ orderBy: { createdAt: "asc" } })
}