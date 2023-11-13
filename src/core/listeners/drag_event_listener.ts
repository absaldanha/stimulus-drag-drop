import { DraggableEvent, type CustomDragEvent, type DragEventName, DroppableEvent } from "../events"

export interface DragEventListenerDelegate {
  shouldHandleDragEvent: (event: DragEvent) => boolean
  willDispatchCustomEvent: (event: CustomDragEvent) => void
}

export class DragEventListener implements EventListenerObject {
  readonly delegate: DragEventListenerDelegate
  readonly eventTarget: EventTarget

  constructor(delegate: DragEventListenerDelegate, eventTarget: EventTarget) {
    this.delegate = delegate
    this.eventTarget = eventTarget
  }

  attachTo(eventName: DragEventName, options: AddEventListenerOptions | boolean) {
    this.eventTarget.addEventListener(eventName, this, options)
  }

  detachFrom(eventName: DragEventName, options: AddEventListenerOptions | boolean) {
    this.eventTarget.removeEventListener(eventName, this, options)
  }

  handleEvent(event: DragEvent) {
    if (!this.delegate.shouldHandleDragEvent(event)) {
      return
    }

    const customEvent = this.buildCustomEvent(event)

    this.delegate.willDispatchCustomEvent(customEvent)

    this.eventTarget.dispatchEvent(customEvent)
  }

  private buildCustomEvent(event: DragEvent): CustomDragEvent {
    switch (event.type as DragEventName) {
      case "drag":
      case "dragstart":
      case "dragend":
        return DraggableEvent.build(event)
      default:
        return DroppableEvent.build(event)
    }
  }
}
