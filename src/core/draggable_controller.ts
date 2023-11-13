import type { Controller } from "@hotwired/stimulus"
import type { DraggableEvent } from "./events"

export type DraggableMethodName = "onDrag" | "onDragStart" | "onDragEnd"

export type DraggableController = Controller & {
  [key in DraggableMethodName]?: (event: DraggableEvent) => void
}
