import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 5;

export async function getSchedules(page = 1) {
  return prisma.schedule.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      assignedUsers: {  // ambil semua assignment
        include: {
          user: true,   // include data user di assignment
        },
      },
      shift: true,       // include shift juga
    },
    orderBy: { startDate: "asc" },
  });
}

export async function getScheduleCount() {
  return prisma.schedule.count();
}