import { CustomDragEvent } from "./custom_drag_event"
import { DRAGGABLE_DATA_TRANSFER_KEY, DROPPABLE_DATA_TRANSFER_KEY } from "../constants"
import { getControllerFromDataPayload, controllerDataPayload } from "../utils"

import type { Controller } from "@hotwired/stimulus"
import type { CustomDragEventInit } from "./custom_drag_event"
import type { DropTargetEventName, DroppableEventName } from "../types"

export class DroppableEvent extends CustomDragEvent {
  protected static eventPrefix = "droppable"

  static eventName(eventName: DropTargetEventName) {
    return super.eventName(eventName) as DroppableEventName
  }

  constructor(type: DroppableEventName, options: CustomDragEventInit) {
    super(type, options)
  }

  get draggable(): Controller | null {
    const payload = this.dataTransfer?.getData(DRAGGABLE_DATA_TRANSFER_KEY)

    return getControllerFromDataPayload(payload)
  }

  set droppable(controller: Controller) {
    const payload = controllerDataPayload(controller)

    this.dataTransfer?.setData(DROPPABLE_DATA_TRANSFER_KEY, payload)
  }

  get droppable(): Controller | null {
    const payload = this.dataTransfer?.getData(DROPPABLE_DATA_TRANSFER_KEY)

    return getControllerFromDataPayload(payload)
  }
}
