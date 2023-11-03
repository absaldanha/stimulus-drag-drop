import { DragEventListener, DraggableEventListener } from "../listeners"
import { buildDraggableEventName } from "../utils"

import type { DragEventName, DraggableMethodName, DraggableController } from "../types"

export class Observer {
  private controller: DraggableController
  private started: boolean
  private dragEventListeners: Set<DragEventListener>
  private draggableEventListeners: Set<DraggableEventListener>

  static eventMap = new Map<DragEventName, DraggableMethodName>([
    ["dragstart", "dragStart"],
    ["dragend", "dragEnd"],
    ["drag", "drag"],
  ])

  constructor(controller: DraggableController) {
    this.controller = controller
    this.started = false
    this.dragEventListeners = new Set()
    this.draggableEventListeners = new Set()

    this.setup()
  }

  start() {
    if (!this.started) {
      this.connectListeners()
      this.started = true
    }
  }

  stop() {
    if (this.started) {
      this.disconnectListeners()
      this.started = false
    }
  }

  private setup() {
    for (const [dragEventName, draggableMethodName] of Observer.eventMap.entries()) {
      const method = this.controller[draggableMethodName]

      if (typeof method === "function") {
        const draggableEventType = buildDraggableEventName(dragEventName)
        const dragListener = new DragEventListener(this.element, dragEventName, { capture: true })
        const draggableListener = new DraggableEventListener(this.controller, draggableEventType, draggableMethodName)

        this.dragEventListeners.add(dragListener)
        this.draggableEventListeners.add(draggableListener)
      }
    }
  }

  private connectListeners() {
    this.dragEventListeners.forEach((listener) => listener.connect())
    this.draggableEventListeners.forEach((listener) => listener.connect())
  }

  private disconnectListeners() {
    this.dragEventListeners.forEach((listener) => listener.disconnect())
    this.draggableEventListeners.forEach((listener) => listener.disconnect())
  }

  private get element() {
    return this.controller.element
  }
}
