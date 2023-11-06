import { CustomDragEvent } from "../events"
import { DragEventName } from "../types"

export class DragEventListener<TEventName extends DragEventName = DragEventName> implements EventListenerObject {
  readonly eventTarget: EventTarget
  readonly eventNames: TEventName[]
  readonly options: AddEventListenerOptions

  constructor(eventTarget: EventTarget, eventNames: TEventName[], options: AddEventListenerOptions = {}) {
    this.eventTarget = eventTarget
    this.eventNames = eventNames
    this.options = options
  }

  connect() {
    this.eventNames.forEach((eventName) => {
      this.eventTarget.addEventListener(eventName, this, this.options)
    })
  }

  disconnect() {
    this.eventNames.forEach((eventName) => {
      this.eventTarget.removeEventListener(eventName, this, this.options)
    })
  }

  handleEvent(event: DragEvent) {
    if (this.eventTarget !== event.target) {
      return
    }

    const customEvent = this.buildCustomDragEvent(event)

    this.eventTarget.dispatchEvent(customEvent)
  }

  protected buildCustomDragEvent(event: DragEvent) {
    return CustomDragEvent.build(event)
  }
}
