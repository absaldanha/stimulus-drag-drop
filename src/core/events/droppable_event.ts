import {
  CustomDragEvent,
  type CustomDragEventPrefix,
  type DragEventName,
  type CustomDragEventName,
} from "./custom_drag_event"
import { DRAGGABLE_DATA_TRANSFER_KEY, DROPPABLE_DATA_TRANSFER_KEY } from "../constants"
import { getControllerFromDataPayload, controllerDataPayload } from "../utils"

import type { Controller } from "@hotwired/stimulus"

export type DropTargetEventName = Extract<DragEventName, "dragover" | "dragenter" | "dragleave" | "drop">

export type DroppableEventName = Extract<
  CustomDragEventName,
  "droppable:dragover" | "droppable:dragenter" | "droppable:dragleave" | "droppable:drop"
>

export class DroppableEvent extends CustomDragEvent {
  declare readonly type: DroppableEventName

  protected static eventPrefix: CustomDragEventPrefix = "droppable"

  static eventName(eventName: DropTargetEventName) {
    return super.eventName(eventName) as DroppableEventName
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
