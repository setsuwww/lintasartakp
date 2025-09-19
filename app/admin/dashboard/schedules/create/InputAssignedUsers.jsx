"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { Badge } from "@/components/ui/Badge"
import { Check, ChevronsUpDown } from "lucide-react"

export default function InputAssignedUsers({
  users,
  selectedUserIds,
  toggleUser,
  setAllUsers,
  clearUsers,
}) {
  const [open, setOpen] = React.useState(false)

  const selectedUsers = users.filter((u) => selectedUserIds.includes(u.id))

  return (
    <div className="space-y-3"> {/* <-- kecilin width assign user */}
      <div className="flex items-center justify-between">
        <Label className="text-zinc-700 text-sm">Assign Users</Label>
      </div>

      {/* Dropdown searchable */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open}
            className="w-full justify-between h-9 text-sm"
          >
            {selectedUsers.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedUsers.map((u) => (
                  <Badge key={u.id} className="text-xs">
                    {u.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-zinc-500">Select users...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search users..." className="text-sm" />
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => {
                const isSelected = selectedUserIds.includes(user.id)
                return (
                  <CommandItem key={user.id} onSelect={() => {
                      toggleUser(user.id)
                    }}
                    className="text-sm"
                  >
                    <Check className={`mr-2 h-4 w-4 ${isSelected ? "opacity-100" : "opacity-0"}`}/>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-zinc-500">{user.email}</span>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={setAllUsers} className="flex-1">
          Select all
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={clearUsers}
          disabled={selectedUserIds.length === 0}
          className="flex-1"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
