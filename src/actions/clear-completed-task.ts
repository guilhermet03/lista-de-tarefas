"use server"

import { prisma } from "@/utils/prisma"

export const ClearTaskCompleted = async () => {

    try {
        await prisma.tasks.deleteMany({
            where: {done: true }
        })

        return prisma.tasks.findMany({orderBy: {createdAt: "asc"}})

    } catch (error) {
        throw error
    }
}