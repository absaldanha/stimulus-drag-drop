import type { Controller } from "@hotwired/stimulus"
import type { DroppableEvent } from "./events"

export type DroppableMethodName = "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop"

export type DroppableController = Controller & {
  [key in DroppableMethodName]?: (event: DroppableEvent) => void
}
