import { CustomDragEvent } from "./custom_drag_event"
import { DRAGGABLE_DATA_TRANSFER_KEY } from "../constants"
import { controllerDataPayload, getControllerFromDataPayload } from "../utils"

import type { Controller } from "@hotwired/stimulus"
import type { CustomDragEventInit } from "./custom_drag_event"
import type { DragTargetEventName, DraggableEventName } from "../types"

export class DraggableEvent extends CustomDragEvent {
  protected static eventPrefix = "draggable"

  static eventName(eventName: DragTargetEventName) {
    return super.eventName(eventName) as DraggableEventName
  }

  constructor(type: DraggableEventName, options: CustomDragEventInit) {
    super(type, options)
  }

  set draggable(controller: Controller) {
    const payload = controllerDataPayload(controller)

    this.dataTransfer?.setData(DRAGGABLE_DATA_TRANSFER_KEY, payload)
  }

  get draggable(): Controller | null {
    const payload = this.dataTransfer?.getData(DRAGGABLE_DATA_TRANSFER_KEY)

    return getControllerFromDataPayload(payload)
  }
}
