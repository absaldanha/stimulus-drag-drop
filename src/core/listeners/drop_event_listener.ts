import { DroppableEvent } from "../events"
import { buildDroppableEventName } from "../utils"

import type { DropEventName } from "../types"

interface HandledEvent extends DragEvent {
  type: DropEventName
}

export class DropEventListener implements EventListenerObject {
  readonly eventTarget: EventTarget
  readonly eventName: DropEventName
  readonly options: AddEventListenerOptions

  constructor(eventTarget: EventTarget, eventName: DropEventName, options: AddEventListenerOptions) {
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
    const droppableEvent = this.buildDroppableEvent(event)

    this.eventTarget.dispatchEvent(droppableEvent)
  }

  private buildDroppableEvent(event: HandledEvent) {
    const eventName = buildDroppableEventName(event.type)
    const detail = { originalEvent: event }

    return new DroppableEvent(eventName, { detail, bubbles: true, cancelable: true })
  }
}
