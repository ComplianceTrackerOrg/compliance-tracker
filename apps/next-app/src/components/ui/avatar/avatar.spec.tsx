import { test, expect } from "vitest"
import { render } from "@testing-library/react"

import { Avatar } from "./avatar"

test("Avatar renders correctly", () => {
  render(<Avatar className="avatar" />)

  const avatar = document.querySelector(".avatar")
  expect(avatar).toBeDefined()
})
