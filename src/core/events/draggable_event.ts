import {
  CustomDragEvent,
  type CustomDragEventPrefix,
  type DragEventName,
  type CustomDragEventName,
} from "./custom_drag_event"
import { DRAGGABLE_DATA_TRANSFER_KEY } from "../constants"
import { controllerDataPayload, getControllerFromDataPayload } from "../utils"

import type { Controller } from "@hotwired/stimulus"

export type DragTargetEventName = Extract<DragEventName, "drag" | "dragstart" | "dragend">

export type DraggableEventName = Extract<
  CustomDragEventName,
  "draggable:drag" | "draggable:dragstart" | "draggable:dragend"
>

export class DraggableEvent extends CustomDragEvent {
  declare readonly type: DraggableEventName

  protected static eventPrefix: CustomDragEventPrefix = "draggable"

  static eventName(eventName: DragTargetEventName) {
    return super.eventName(eventName) as DraggableEventName
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
