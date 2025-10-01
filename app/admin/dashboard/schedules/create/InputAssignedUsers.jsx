"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { Badge } from "@/components/ui/Badge"
import { Check, ChevronsUpDown } from "lucide-react"

export default function InputAssignedUsers({ users, selectedUserIds, toggleUser, setAllUsers, clearUsers }) { 
  const [open, setOpen] = React.useState(false)
  const selectedUsers = users.filter((u) => selectedUserIds.includes(u.id))

  return (
    <div className="spgit bace-y-2 max-w-md">
      <Label className="text-zinc-700 text-sm">Assign Users</Label>

      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((u) => (
            <Badge
              key={u.id}
              className="text-xs px-2 py-0.5"
            >
              {u.name}
            </Badge>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-9 text-sm">
            {selectedUsers.length > 0 ? (
              <span className="text-zinc-700">Add more users...</span>
            ) : (
              <span className="text-zinc-500">Select users...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" side="bottom" align="start">
          <Command>
            <CommandInput
              placeholder="Search users..."
              className="text-sm"
            />
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {users.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id)
                  return (
                    <CommandItem key={user.id} onSelect={() => toggleUser(user.id)} className="text-sm flex items-start gap-2 p-2 rounded-md cursor-pointer">
                      <Check className={`h-4 w-4 mt-0.5 ${isSelected ? "opacity-100 text-green-500" : "opacity-0"}`}/>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-zinc-500">{user.email}</span>
                      </div>
                    </CommandItem>
                  )
                })}
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" size="sm" onClick={setAllUsers}>
          Select all
        </Button>
        <Button type="button" variant="destructive" size="sm" onClick={clearUsers} disabled={selectedUserIds.length === 0}>
          Clear
        </Button>
      </div>
    </div>
  )
}
