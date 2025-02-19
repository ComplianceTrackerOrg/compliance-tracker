"use client"

import React, { useEffect, useState } from "react"
import { signOut } from "@/actions"
import { useAuth } from "@/lib/hooks/auth"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "@/components/ui/link"
import { Button } from "@/components/ui/button"

//TODO: hide/display links based on user role
const MainNav = () => {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const { authUser } = useAuth()

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
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/users" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Assign Users
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/requirements" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Requirements
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/my-requirements" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Requirements
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/trainings" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Trainings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/mandatory-trainings" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Trainings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {!loggedIn && (
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {loggedIn && (
            <NavigationMenuItem>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault()
                  handleSignOut()
                }}
              >
                Log Out
              </Button>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default MainNav
