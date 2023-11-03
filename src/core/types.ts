import type { Controller } from "@hotwired/stimulus"
import type { DraggableEvent, DroppableEvent } from "./events"

export type DragEventName = "drag" | "dragstart" | "dragend"

export type DropEventName = "dragover" | "dragenter" | "dragleave" | "drop"

export type DraggableEventName = "draggable:drag" | "draggable:dragstart" | "draggable:dragend"

export type DroppableEventName = "droppable:dragover" | "droppable:dragenter" | "droppable:dragleave" | "droppable:drop"

export type DraggableMethodName = "drag" | "dragStart" | "dragEnd"

export type DroppableMethodName = "dragOver" | "dragEnter" | "dragLeave" | "drop"

export interface DraggableController extends Controller {
  drag?: (event: DraggableEvent) => void
  dragStart?: (event: DraggableEvent) => void
  dragEnd?: (event: DraggableEvent) => void
}

export interface DroppableController extends Controller {
  dragOver?: (event: DroppableEvent) => void
  dragEnter?: (event: DroppableEvent) => void
  dragLeave?: (event: DroppableEvent) => void
  drop?: (event: DroppableEvent) => void
}

export type ContextController = DraggableController | DroppableController
