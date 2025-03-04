"use client"
import React, { useEffect, useState } from "react"
import { signOut } from "@/actions"
import { useAuth } from "@/lib/hooks/auth"
import { Link } from "@/components/ui/link"
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDown } from "lucide-react"

const MainNav = () => {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const { authUser, isManager } = useAuth()

  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true)
    }
  }, [authUser])

  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <div className="hidden md:flex justify-between container mx-auto mt-2">
      <Link href="/">
        <h1>Compliance Tracker Dashboard</h1>
      </Link>

      {/* Menubar for Navigation */}
      <Menubar>
        {!loggedIn && (
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/login">Login</Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}

        {loggedIn && (
          <>
            {isManager && (
              <>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Link href="/dashboard">Dashboard</Link>
                  </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger>
                    <Link href="/users">Assign Users</Link>
                  </MenubarTrigger>
                </MenubarMenu>
              </>
            )}

            {/* Requirements Dropdown */}
            <MenubarMenu>
              <MenubarTrigger className="flex items-center">
                Requirements
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/requirements">View</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/my-requirements">Manage</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Trainings Dropdown */}
            <MenubarMenu>
              <MenubarTrigger>
                Trainings
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem>
                  <Link href="/trainings">View</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/mandatory-trainings">My Trainings</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/chat">🧠 EllenDyAI</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSignOut()
                  }}
                >
                  Log Out
                </Button>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        )}
      </Menubar>
    </div>
  )
}

export default MainNav
