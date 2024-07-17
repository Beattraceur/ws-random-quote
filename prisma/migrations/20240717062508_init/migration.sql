-- CreateTable
CREATE TABLE "ViewCounter" (
    "_id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ViewCounter_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ViewCounter_path_key" ON "ViewCounter"("path");
