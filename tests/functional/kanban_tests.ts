import { test, expect } from "@playwright/test"
import { assert } from "chai"
import { nextBeat } from "../helpers"

import type { Page } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/tests/fixtures/kanban.html")
})

test("automatically sets the draggable attribute", async ({ page }) => {
  await nextBeat()

  const items = await page.locator('[data-controller="item"]').all()

  for (const item of items) {
    assert.equal(await item.getAttribute("draggable"), "true")
  }
})

test("can move items between columns", async ({ page }) => {
  await nextBeat()

  const item = getItem(page, "Setup CI")
  const todo = getColumn(page, "To Do")
  const doing = getColumn(page, "Doing")

  await item.dragTo(doing)
  await nextBeat()

  await expect(doing.getByRole("listitem")).toHaveText(["Setup CI", "CRUD Users"])
  await expect(todo.getByRole("listitem")).toHaveText(["CRUD Projects"])
})

test("shows that an item is dragging over a column", async ({ page }) => {
  await nextBeat()

  const item = getItem(page, "CRUD Users")
  const todo = getColumn(page, "To Do")
  const done = getColumn(page, "Done")

  await item.hover()
  await page.mouse.down()
  await done.hover()

  await expect(done).toHaveClass("drag-enter")

  await todo.hover()

  await expect(done).toHaveClass("")
  await expect(todo).toHaveClass("drag-enter")
})

function getItem(page: Page, name: string) {
  return page.getByTestId("item").filter({ hasText: name })
}

function getColumn(page: Page, name: string) {
  return page.getByTestId("column").filter({ hasText: name })
}
