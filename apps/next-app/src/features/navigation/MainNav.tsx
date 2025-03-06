"use client"
import React, { useEffect, useState } from "react"
import { useAuth } from "@/lib/hooks/auth"
import { signOut } from "@/actions"
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
  const [isMounted, setIsMounted] = useState(false)
  const [loggedIn, setIsLoggedIn] = useState(false)
  const { authUser, isManager } = useAuth()
  useEffect(() => {
    setIsMounted(true) // ✅ Ensure client-side rendering
  }, [])
  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true)
    }
  }, [authUser])

  if (!isMounted) return null

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
                  <MenubarTrigger className="flex items-center">
                    Users
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link href="/user-list">Manage</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href="/users">Assign</Link>
                    </MenubarItem>
                  </MenubarContent>
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
                  <Link href="/requirements">Manage</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/my-requirements">View</Link>
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
                  <Link href="/trainings">Manage</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/mandatory-trainings">View</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/chat">🧠 EllenDyAI</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault()
                  handleSignOut()
                }}
              >
                Log Out
              </Button>
            </MenubarMenu>
          </>
        )}
      </Menubar>
    </div>
  )
}

export default MainNav
