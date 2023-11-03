import { DraggableEvent } from "../events"
import { buildDraggableEventName } from "../utils"

import type { DragEventName } from "../types"

interface HandledEvent extends DragEvent {
  type: DragEventName
}

export class DragEventListener implements EventListenerObject {
  readonly eventTarget: EventTarget
  readonly eventName: DragEventName
  readonly options: AddEventListenerOptions

  constructor(eventTarget: EventTarget, eventName: DragEventName, options: AddEventListenerOptions) {
    this.eventTarget = eventTarget
    this.eventName = eventName
    this.options = options
  }

  connect() {
    this.eventTarget.addEventListener(this.eventName, this, this.options)
  }

  disconnect() {
    this.eventTarget.removeEventListener(this.eventName, this, this.options)
  }

  handleEvent(event: HandledEvent) {
    if (this.eventTarget !== event.target) {
      return
    }

    const draggableEvent = this.buildDraggableEvent(event)

    this.eventTarget.dispatchEvent(draggableEvent)
  }

  private buildDraggableEvent(event: HandledEvent) {
    const eventName = buildDraggableEventName(this.eventName)
    const detail = { originalEvent: event }

    return new DraggableEvent(eventName, { detail, bubbles: true, cancelable: true })
  }
}
