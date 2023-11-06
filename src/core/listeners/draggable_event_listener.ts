import { CustomDragEventListener } from "./custom_drag_event_listener"

import type { Controller } from "@hotwired/stimulus"
import type { DraggableEventName, DraggableMethodName } from "../types"

const draggableEventMap = new Map<DraggableEventName, DraggableMethodName>([
  ["draggable:drag", "drag"],
  ["draggable:dragstart", "dragStart"],
  ["draggable:dragend", "dragEnd"],
])

export class DraggableEventListener extends CustomDragEventListener<DraggableEventName, DraggableMethodName> {
  constructor(controller: Controller) {
    super(controller, draggableEventMap)
  }
}
