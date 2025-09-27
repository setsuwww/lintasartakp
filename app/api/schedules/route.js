import { getUserFromToken } from "@/lib/auth";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  try {
<<<<<<< HEAD
    const body = await req.json();
    const { title, description, userIds, dates } = body;

    if (!title || !userIds?.length || !dates?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const createdSchedules = [];

    for (const dateInfo of dates) {
      // Schedule utama
      const schedule = await prisma.schedule.create({
        data: {
          title,
          description,
          startDate: new Date(dateInfo.date),
          endDate: new Date(dateInfo.date),
          shiftId: Number(dateInfo.shiftId),
        },
      });

      // Assign semua user ke schedule
      await prisma.scheduleAssignment.createMany({
        data: userIds.map((uid) => ({
          scheduleId: schedule.id,
          userId: uid,
          assignedAt: new Date(),
        })),
      });

      createdSchedules.push(schedule);

      // Schedule kedua (jika ada second shift)
      if (dateInfo.secondShiftId) {
        const secondSchedule = await prisma.schedule.create({
          data: {
            title: `${title} (Second Shift)`,
            description,
            startDate: new Date(dateInfo.date),
            endDate: new Date(dateInfo.date),
            shiftId: Number(dateInfo.secondShiftId),
          },
        });

        await prisma.scheduleAssignment.createMany({
          data: userIds.map((uid) => ({
            scheduleId: secondSchedule.id,
            userId: uid,
            assignedAt: new Date(),
          })),
        });

        createdSchedules.push(secondSchedule);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Schedule created successfully",
      totalEntries: createdSchedules.length,
      data: createdSchedules,
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
=======
    const body = await req.json()
    const { title, description, frequency, userIds, dates } = body

    if (!title || !description || !userIds?.length || !dates?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.create({
      data: {
        title,
        description,
        frequency,
        // relasi ke user (pivot table ScheduleUser)
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
        // relasi ke scheduleDates
        dates: {
          create: dates.map((d) => ({
            date: new Date(d.date),
            shiftId: parseInt(d.shiftId),
            secondShiftId: d.secondShiftId ? parseInt(d.secondShiftId) : null,
          })),
        },
      },
      include: {
        users: { include: { user: true } },
        dates: { include: { shift: true } },
      },
    })

    return NextResponse.json(schedule, { status: 201 })
  } catch (err) {
    console.error("Error creating schedule:", err)
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    )
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
  }
}

export async function DELETE(req) {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json().catch(() => ({}));
    const ids = body.ids;

    if (ids && ids.length > 0) {
      await prisma.schedule.deleteMany({
        where: { id: { in: ids }, userId: user.id },
      });
      return NextResponse.json({ message: "Selected schedules deleted" });
    } else {
      await prisma.schedule.deleteMany({
        where: { userId: user.id },
      });
      return NextResponse.json({ message: "All schedules deleted" });
    }
  }
  catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

