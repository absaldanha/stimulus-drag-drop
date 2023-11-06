import type { Controller } from "@hotwired/stimulus"
import type { CustomDragEvent } from "../events"
import type { ControllerMethodName, CustomDragEventName } from "../types"

export class CustomDragEventListener<
  TEventName extends CustomDragEventName = CustomDragEventName,
  TMethodName extends ControllerMethodName = ControllerMethodName
> implements EventListenerObject {
  readonly controller: Controller
  readonly eventMap: Map<TEventName, TMethodName>
  readonly options: AddEventListenerOptions

  constructor(controller: Controller, eventMap: Map<TEventName, TMethodName>, options: AddEventListenerOptions = {}) {
    this.controller = controller
    this.eventMap = eventMap
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

  handleEvent(event: CustomDragEvent) {
    const method = this.getMethodForEvent(event)

    if (typeof method === "function") {
      method.call(this.controller, event)
    }
  }

  get eventTarget() {
    return this.controller.element
  }

  get eventNames(): TEventName[] {
    return Array.from(this.eventMap.keys())
  }

  get methodNames(): TMethodName[] {
    return Array.from(this.eventMap.values())
  }

  private getMethodForEvent(event: CustomDragEvent) {
    const methodName = this.eventMap.get(event.type as TEventName)

    if (!methodName) {
      return
    }

    return (this.controller as any)[methodName] as Function
  }
}
