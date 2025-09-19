// app/admin/dashboard/schedules/page.tsx
import { DashboardHeader } from "../DashboardHeader";
import { ContentInformation } from "@/components/content/ContentInformation";
import ContentForm from "@/components/content/ContentForm";
import { Pagination } from "../Pagination";
import ScheduleCard from "./SchedulesCard";
import { getSchedules, getScheduleCount } from "@/app/api/schedules/data";
import { frequenciesLabel } from "@/constants/frequencyStyles";
import { Tag } from "lucide-react";

export const revalidate = 60;

export default async function Page({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  const [schedulesRaw, total] = await Promise.all([
    getSchedules(page),
    getScheduleCount(),
  ]);

  // convert tanggal biar aman di client
  const schedules = schedulesRaw.map((s) => ({
    ...s,
    startDate: s.startDate?.toISOString() ?? null,
    endDate: s.endDate?.toISOString() ?? null,
    createdAt: s.createdAt?.toISOString() ?? null,
    updatedAt: s.updatedAt?.toISOString() ?? null,
  }));

  const totalPages = Math.ceil(total / 5);

  if (page > totalPages && totalPages > 0) {
    return <div className="p-4">Page not found</div>;
  }

  return (
    <section>
      <DashboardHeader title="Schedules" subtitle="List of your schedules" />
      <ContentForm>
        <ContentForm.Header>
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

        <Pagination
          page={page}
          totalPages={totalPages}
          basePath="/admin/dashboard/schedules"
        />
      </ContentForm>
    </section>
  );
}
