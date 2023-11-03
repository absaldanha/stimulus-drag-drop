import { DRAGGABLE_DATA_TRANSFER_KEY, DROPPABLE_DATA_TRANSFER_KEY } from "../constants"
import { getControllerFromDataPayload, controllerDataPayload } from "../utils"
import type { Controller } from "@hotwired/stimulus"
import type { DroppableEventName } from "../types"

interface DroppableEventDetail {
  originalEvent: DragEvent
}

interface DroppableEventInit extends CustomEventInit<DroppableEventDetail> {
  detail: DroppableEventDetail
}

export class DroppableEvent extends CustomEvent<DroppableEventDetail> {
  private originalEvent: DragEvent

  constructor(type: DroppableEventName, options: DroppableEventInit) {
    super(type, options)

    const {
      detail: { originalEvent },
    } = options

    this.originalEvent = originalEvent
  }

  get dataTransfer() {
    return this.originalEvent.dataTransfer
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
