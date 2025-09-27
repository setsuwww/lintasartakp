import { FolderInput, Trash2, Search } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SchedulesActionHeader({
  search, setSearch,
<<<<<<< HEAD
  filterFrequency, onFilterChange,
  selectedCount,
=======
  selectedCount, totalCount,
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
  onDeleteSelected, onDeleteAll,
  onExportPDF,
  filterShift, onFilterShiftChange,
  filterFrequency, onFilterFrequencyChange
}) {
  return (
<<<<<<< HEAD
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-x-1">
        <Input placeholder="Search schedule..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-64 bg-white py-1.5" />

        <Select value={filterFrequency} onValueChange={onFilterChange}>
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
=======
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex items-center gap-2 w-full">
        <Select value={filterFrequency} onValueChange={onFilterFrequencyChange} defaultValue="all">
          <SelectTrigger className="w-auto px-3 whitespace-nowrap">
            <span className="font-semibold text-zinc-600 mr-1">Frequency:</span>
            <SelectValue />
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

        <Select value={filterShift} onValueChange={onFilterShiftChange} defaultValue="all">
          <SelectTrigger className="w-auto px-3 whitespace-nowrap">
            <span className="font-semibold text-zinc-600 mr-1">Shift:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="MORNING">Morning</SelectItem>
            <SelectItem value="AFTERNOON">Afternoon</SelectItem>
            <SelectItem value="EVENING">Evening</SelectItem>
            <SelectItem value="NIGHT">Night</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schedules..."
          className="min-w-[180px] max-w-[250px] w-auto"
        />
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
      </div>

      {/* Actions */}
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" size="sm" className="text-red-500"
<<<<<<< HEAD
          onClick={onDeleteSelected} disabled={selectedCount === 0}>
=======
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
        >
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
          Delete Selected
        </Button>

        <Button variant="ghost" size="sm" className="bg-red-50 hover:bg-red-100 text-red-500"
<<<<<<< HEAD
          onClick={onDeleteAll}>
=======
          onClick={onDeleteAll}
        >
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
          <Trash2 size={16} /> Delete All
        </Button>

        <Button variant="ghost" size="sm" className="bg-green-100 hover:bg-green-200 text-green-700"
<<<<<<< HEAD
          onClick={onExportPDF}>
=======
          onClick={onExportPDF}
        >
>>>>>>> 8c2e1abf2af9e12b65d175730299d578d19ddbee
          <FolderInput size={16} /> Export
        </Button>
      </div>
    </div>
  );
}
