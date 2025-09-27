// app/admin/dashboard/schedules/page.tsx
import { DashboardHeader } from "../DashboardHeader";
import { ContentInformation } from "@/components/content/ContentInformation";
import ContentForm from "@/components/content/ContentForm";
import { Pagination } from "../Pagination";
import ScheduleCard from "./SchedulesCard";
import { getSchedules, getScheduleCount } from "@/app/api/schedules/data";
import { frequenciesLabel } from "@/constants/frequencyStyles";
<<<<<<< HEAD
import { Tag } from "lucide-react";
=======

const PAGE_SIZE = 5;

export async function getSchedules({ page = 1, search = "", frequency, shift }) {
  return await prisma.schedule.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    where: {
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(frequency && frequency !== "all" ? { frequency } : {}),
      ...(shift && shift !== "all"
        ? { shift: { type: shift } } // ✅ filter shift langsung di prisma
        : {}),
    },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      frequency: true,
      createdAt: true,
      updatedAt: true,
      shift: {
        select: { id: true, type: true, startTime: true, endTime: true },
      },
      users: {
        select: {
          user: { select: { id: true, name: true, email: true } },
        },
      },
    },
    orderBy: { startDate: "asc" },
  });
}

export async function getScheduleCount({ search = "", frequency }) {
  return await prisma.schedule.count({
    where: { ...(search
        ? { OR: [
              { title: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),...(frequency ? { frequency } : {}),
    },
  });
}
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee

export const revalidate = 60;

export default async function Page({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const frequency = searchParams?.frequency || null;

  const [schedulesRaw, total] = await Promise.all([
    getSchedules({ page, search, frequency }),
    getScheduleCount({ search, frequency }),
  ]);

<<<<<<< HEAD
  // convert tanggal biar aman di client
=======
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
  const schedules = schedulesRaw.map((s) => ({
    ...s,
    startDate: s.startDate?.toISOString() ?? null,
    endDate: s.endDate?.toISOString() ?? null,
    createdAt: s.createdAt?.toISOString() ?? null,
    updatedAt: s.updatedAt?.toISOString() ?? null,
<<<<<<< HEAD
=======
    shift: s.shift
      ? {
          ...s.shift,
          startTime: s.shift.startTime,
          endTime: s.shift.endTime,
        }
      : null,
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
  }));

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (page > totalPages && totalPages > 0) {
    return <div className="p-4">Page not found</div>;
  }

  return (
    <section>
      <DashboardHeader title="Schedules" subtitle="List of your schedules" />
      <ContentForm>
        <ContentForm.Header>
<<<<<<< HEAD
          <ContentInformation
            heading="Schedule table"
            subheading="Manage schedule more detail than calendar view"
          />
          <div className="flex items-center space-x-2 mt-4 mb-4">
            {frequenciesLabel.map((f) => (
              <div
                key={f.label}
                className={`flex items-center space-x-2 bg-${f.color}-100 border border-${f.color}-200 px-2 py-0.5 rounded-md`}
              >
                <Tag
                  strokeWidth={2}
                  className={`w-3 h-3 text-${f.color}-600`}
                />
=======
          <ContentInformation heading="Schedule table" subheading="Manage schedule more detail than calendar view"/>
          <div className="flex items-center space-x-2 mt-4 mb-4">
            {frequenciesLabel.map((f) => (
              <div key={f.label} className={`flex items-center space-x-2 bg-${f.color}-50 border border-${f.color}-100 px-2 py-0.5 rounded-md`}>
                <Tag strokeWidth={2} className={`w-3 h-3 text-${f.color}-600`}/>
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
                <span className={`text-${f.color}-600 text-sm font-base`}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </ContentForm.Header>

        <ContentForm.Body>
          <ScheduleCard data={schedules} />
        </ContentForm.Body>

<<<<<<< HEAD
        <Pagination
          page={page}
          totalPages={totalPages}
          basePath="/admin/dashboard/schedules"
        />
=======
        <Pagination page={page} totalPages={totalPages} basePath="/admin/dashboard/schedules"/>
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
      </ContentForm>
    </section>
  );
}
