"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxItemProps {
  value: string
  label: string
  icon?: React.ReactNode
}

interface ComboboxProps {
  items: ComboboxItemProps[]
  itemNotFoundMessage?: string
  placeholder?: string
  inputPlaceholder?: string
  enableSearch?: boolean
  onItemSelected?: (value: string) => void
}

export function Combobox(props: ComboboxProps) {
  const {
    enableSearch,
    inputPlaceholder,
    items,
    itemNotFoundMessage,
    placeholder,
    onItemSelected,
  } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((option) => option.value === value)?.label
            : placeholder ?? "Search"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {enableSearch && <CommandInput placeholder={inputPlaceholder} />}
          <CommandList>
            <CommandEmpty>
              {itemNotFoundMessage || "Option not found"}
            </CommandEmpty>
            <CommandGroup>
              {items &&
                items.map((item) => {
                  const { value, label, icon } = item
                  return (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)

                        if (onItemSelected) {
                          onItemSelected(currentValue)
                        }
                      }}
                    >
                      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
                      {label}
                    </CommandItem>
                  )
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
