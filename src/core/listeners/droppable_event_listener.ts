import type { DroppableEvent } from "../events"
import type { DroppableController, DroppableEventName, DroppableMethodName } from "../types"

export class DroppableEventListener {
  private controller: DroppableController
  private eventName: DroppableEventName
  private methodName: DroppableMethodName
  private options: AddEventListenerOptions

  constructor(
    controller: DroppableController,
    eventName: DroppableEventName,
    methodName: DroppableMethodName,
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

  handleEvent(event: DroppableEvent) {
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
