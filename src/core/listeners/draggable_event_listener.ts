import type { DraggableEvent } from "../events"
import type { DraggableMethodName, DraggableEventName, DraggableController } from "../types"

export class DraggableEventListener {
  private controller: DraggableController
  private eventName: DraggableEventName
  private methodName: DraggableMethodName
  private options: AddEventListenerOptions

  constructor(
    controller: DraggableController,
    eventName: DraggableEventName,
    methodName: DraggableMethodName,
    options: AddEventListenerOptions = {},
  ) {
    this.controller = controller
    this.eventName = eventName
    this.methodName = methodName
    this.options = options
  }

  connect() {
    this.element.addEventListener(this.eventName, this, this.options)
  }

  disconnect() {
    this.element.removeEventListener(this.eventName, this, this.options)
  }

  handleEvent(event: DraggableEvent) {
    if (typeof this.method === "function") {
      this.method.call(this.controller, event)
    }
  }

  private get element() {
    return this.controller.element
  }

  private get method() {
    return this.controller[this.methodName]
  }
}
