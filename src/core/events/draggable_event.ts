import { DRAGGABLE_DATA_TRANSFER_KEY } from "../constants"
import { controllerDataPayload, getControllerFromDataPayload } from "../utils"

import type { Controller } from "@hotwired/stimulus"
import type { DraggableEventName } from "../types"

interface DraggableEventDetail {
  originalEvent: DragEvent
}

interface DraggableEventInit extends CustomEventInit<DraggableEventDetail> {
  detail: DraggableEventDetail
}

export class DraggableEvent extends CustomEvent<DraggableEventDetail> {
  private originalEvent: DragEvent

  constructor(type: DraggableEventName, options: DraggableEventInit) {
    super(type, options)

    const {
      detail: { originalEvent },
    } = options

    this.originalEvent = originalEvent
  }

  get dataTransfer() {
    return this.originalEvent.dataTransfer
  }

  set draggable(controller: Controller) {
    const payload = controllerDataPayload(controller)

    this.dataTransfer?.setData(DRAGGABLE_DATA_TRANSFER_KEY, payload)
  }

  get draggable(): Controller | null {
    const payload = this.dataTransfer?.getData(DRAGGABLE_DATA_TRANSFER_KEY)

    return getControllerFromDataPayload(payload)
  }

  preventDefault() {
    super.preventDefault()
    this.originalEvent.preventDefault()
  }

  stopPropagation() {
    super.stopPropagation()
    this.originalEvent.stopPropagation()
  }

  stopImmediatePropagation() {
    super.stopImmediatePropagation()
    this.originalEvent.stopImmediatePropagation()
  }
}
