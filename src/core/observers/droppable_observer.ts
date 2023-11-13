import { DragObserver } from "./drag_observer"

import type { DroppableController } from "../droppable_controller"

export class DroppableObserver extends DragObserver {
  constructor(controller: DroppableController) {
    super(controller, ["drop", "dragenter", "dragleave", "dragover"])
  }
}
