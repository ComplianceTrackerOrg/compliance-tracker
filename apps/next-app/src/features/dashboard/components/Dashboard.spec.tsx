import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"

import Dashboard from "./Dashboard"
import { Employee } from "@/types"

const testData: Employee[] = [
  {
    employeeId: "employeeId",
    name: "name",
    department: "department",
    training: "training",
    status: "Not Started",
    startDate: "Thu Mar 20 2025 12:19:22 GMT+0800 (Philippine Standard Time)",
    completionDate: null,
  },
]

describe("Dashboard", () => {
  test("Dashboard should render correctly", () => {
    render(<Dashboard data={testData} />)

    const avatar = document.querySelector(".avatar")
    expect(avatar).toBeDefined()
  })

  test("Dashboard should render correctly header title", async () => {
    render(<Dashboard data={[]} />)

    await screen.findByRole("heading")
    expect(screen.getByRole("heading").textContent).toBe(
      "Compliance Tracker Dashboard"
    )
  })

  test("Dashboard should display 'No results' when no data is passed", async () => {
    render(<Dashboard data={[]} />) // Pass empty data

    await screen.findByTestId("no-results")
    expect(screen.getByTestId("no-results").textContent).toBe("No results.")
  })
})
