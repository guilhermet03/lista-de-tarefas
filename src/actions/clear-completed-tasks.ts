"use server"

import { prisma } from "@/utils/prisma"

export const ClearTaskCompleted = async () => {

    try {
        await prisma.tasks.deleteMany({
            where: {done: true }
        })

        const allTasks = await prisma.tasks.findMany()

        if(!allTasks)
        
            return allTasks

    } catch (error) {
        throw error
    }
}