import { DragEventListener } from "./drag_event_listener"
import { DroppableEvent } from "../events"

import type { DropTargetEventName } from "../types"

export class DropTargetEventListener extends DragEventListener<DropTargetEventName> {
  constructor(eventTarget: EventTarget, options: AddEventListenerOptions = {}) {
    super(eventTarget, ["dragenter", "dragleave", "dragover", "drop"], options)
  }

  protected buildCustomDragEvent(event: DragEvent) {
    return DroppableEvent.build(event)
  }
}
