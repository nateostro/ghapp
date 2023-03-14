/*
  Warnings:

  - The primary key for the `TestData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TestData" DROP CONSTRAINT "TestData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TestData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TestData_id_seq";
