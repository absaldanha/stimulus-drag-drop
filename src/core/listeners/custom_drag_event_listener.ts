import { CustomDragEvent, type CustomDragEventName } from "../events"

import type { DraggableController, DraggableMethodName } from "../draggable_controller"
import type { DroppableController, DroppableMethodName } from "../droppable_controller"

export type ExtendedController = DraggableController & DroppableController

export type ExtendedControllerMethodName = DraggableMethodName | DroppableMethodName

const eventMap = new Map<CustomDragEventName, ExtendedControllerMethodName>([
  ["draggable:drag", "onDrag"],
  ["draggable:dragstart", "onDragStart"],
  ["draggable:dragend", "onDragEnd"],
  ["droppable:drop", "onDrop"],
  ["droppable:dragenter", "onDragEnter"],
  ["droppable:dragleave", "onDragLeave"],
  ["droppable:dragover", "onDragOver"],
])

export class CustomDragEventListener implements EventListenerObject {
  readonly controller: ExtendedController

  constructor(controller: ExtendedController) {
    this.controller = controller
  }

  get eventTarget() {
    return this.controller.element
  }

  attachTo(eventName: CustomDragEventName, options?: AddEventListenerOptions | boolean) {
    this.eventTarget.addEventListener(eventName, this, options)
  }

  detachFrom(eventName: CustomDragEventName, options?: AddEventListenerOptions | boolean) {
    this.eventTarget.removeEventListener(eventName, this, options)
  }

  handleEvent(event: CustomDragEvent) {
    const method = this.getControllerMethodForEvent(event)

    if (typeof method === "function") {
      method.call(this.controller, event)
    }
  }

  private getControllerMethodForEvent(event: CustomDragEvent) {
    const methodName = eventMap.get(event.type)

    if (!methodName) {
      return
    }

    return this.controller[methodName] as Function
  }
}
