import { FolderInput, Trash2 } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SchedulesActionHeader({
  search, setSearch,
  sortOrder, onSortChange,
  selectedCount, totalCount,
  onDeleteSelected, onDeleteAll,
  onExportPDF
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-x-1">
        <Input placeholder="Search schedule..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-64 bg-white py-1.5" />

        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className="w-auto px-3 whitespace-nowrap">
            <span className="font-semibold text-zinc-600 mr-1">Frequency:</span>
            <SelectValue placeholder="all" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="DAILY">Daily</SelectItem>
            <SelectItem value="WEEKLY">Weekly</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
            <SelectItem value="ONCE">Once</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" size="sm" className="text-red-500"
          onClick={onDeleteSelected} disabled={selectedCount === 0}>
          Delete Selected
        </Button>

        <Button variant="ghost" size="sm" className="bg-red-50 hover:bg-red-100 text-red-500"
          onClick={onDeleteAll}>
          <Trash2 size={16} /> Delete All
        </Button>

        <Button variant="ghost" size="sm" className="bg-green-100 hover:bg-green-200 text-green-700"
          onClick={onExportPDF}>
          <FolderInput size={16} /> Export
        </Button>
      </div>
    </div>
  );
}
