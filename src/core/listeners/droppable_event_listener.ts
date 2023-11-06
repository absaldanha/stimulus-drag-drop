import { CustomDragEventListener } from "./custom_drag_event_listener";

import type { Controller } from "@hotwired/stimulus"
import type { DroppableEventName, DroppableMethodName } from "../types";

const droppableEventMap = new Map<DroppableEventName, DroppableMethodName>([
  ["droppable:dragenter", "dragEnter"],
  ["droppable:dragleave", "dragLeave"],
  ["droppable:dragover", "dragOver"],
  ["droppable:drop", "drop"]
])

export class DroppableEventListener extends CustomDragEventListener<
  DroppableEventName,
  DroppableMethodName
> {
  constructor(controller: Controller) {
    super(controller, droppableEventMap)
  }
}
