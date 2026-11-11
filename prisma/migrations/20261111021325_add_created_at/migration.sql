-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
