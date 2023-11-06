const DRAG_EVENT_NAMES = ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"] as const
const CUSTOM_DRAG_EVENT_NAMES = [
  "draggable:drag",
  "draggable:dragstart",
  "draggable:dragend",
  "droppable:dragover",
  "droppable:dragenter",
  "droppable:dragleave",
  "droppable:drop",
] as const
const METHOD_NAMES = ["drag", "dragStart", "dragEnd", "dragOver", "dragEnter", "dragLeave", "drop"] as const

export type DragEventName = (typeof DRAG_EVENT_NAMES)[number]

export type DragTargetEventName = Extract<DragEventName, "drag" | "dragstart" | "dragend">

export type DropTargetEventName = Extract<DragEventName, "dragover" | "dragenter" | "dragleave" | "drop">

export type CustomDragEventName = (typeof CUSTOM_DRAG_EVENT_NAMES)[number]

export type DraggableEventName = Extract<
  CustomDragEventName,
  "draggable:drag" | "draggable:dragstart" | "draggable:dragend"
>

export type DroppableEventName = Extract<
  CustomDragEventName,
  "droppable:dragover" | "droppable:dragenter" | "droppable:dragleave" | "droppable:drop"
>

export type ControllerMethodName = (typeof METHOD_NAMES)[number]

export type DraggableMethodName = Extract<ControllerMethodName, "drag" | "dragStart" | "dragEnd">

export type DroppableMethodName = Extract<ControllerMethodName, "dragOver" | "dragEnter" | "dragLeave" | "drop">
