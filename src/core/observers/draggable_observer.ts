import { DragObserver } from "./drag_observer"

import type { DraggableController } from "../draggable_controller"

export class DraggableObserver extends DragObserver {
  constructor(controller: DraggableController) {
    super(controller, ["drag", "dragstart", "dragend"])
  }

  shouldHandleDragEvent(event: DragEvent) {
    return this.eventTarget === event.target
  }
}
