import { CustomDragEventListener, type ExtendedController } from "../listeners"

import type { CustomDragEventName } from "../events"

const events: CustomDragEventName[] = [
  "draggable:drag",
  "draggable:dragstart",
  "droppable:dragenter",
  "droppable:drop",
  "droppable:dragenter",
  "droppable:dragleave",
  "droppable:dragover",
]

export class DraggableContextObserver {
  private started: boolean

  readonly controller: ExtendedController
  readonly customDragListener: CustomDragEventListener

  constructor(controller: ExtendedController) {
    this.started = false

    this.controller = controller
    this.customDragListener = new CustomDragEventListener(controller)
  }

  start() {
    if (!this.started) {
      events.forEach((eventName) => {
        this.customDragListener.attachTo(eventName)
      })

      this.started = true
    }
  }

  stop() {
    if (this.started) {
      events.forEach((eventName) => {
        this.customDragListener.detachFrom(eventName)
      })

      this.started = false
    }
  }
}
