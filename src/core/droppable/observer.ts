import { DropEventListener, DroppableEventListener } from "../listeners"
import { buildDroppableEventName } from "../utils"

import type { DropEventName, DroppableController, DroppableMethodName } from "../types"

export class Observer {
  private controller: DroppableController
  private started: boolean
  private dropEventListeners: Set<DropEventListener>
  private droppableEventListeners: Set<DroppableEventListener>

  static eventMap = new Map<DropEventName, DroppableMethodName>([
    ["dragenter", "dragEnter"],
    ["dragleave", "dragLeave"],
    ["dragover", "dragOver"],
    ["drop", "drop"],
  ])

  constructor(controller: DroppableController) {
    this.controller = controller
    this.started = false
    this.dropEventListeners = new Set()
    this.droppableEventListeners = new Set()

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
    for (const [dropEventName, droppableMethodName] of Observer.eventMap.entries()) {
      const method = this.controller[droppableMethodName]

      if (typeof method === "function") {
        const droppableEventName = buildDroppableEventName(dropEventName)
        const dropListener = new DropEventListener(this.element, dropEventName, { capture: true })
        const droppableListener = new DroppableEventListener(this.controller, droppableEventName, droppableMethodName)

        this.dropEventListeners.add(dropListener)
        this.droppableEventListeners.add(droppableListener)
      }
    }
  }

  private connectListeners() {
    this.dropEventListeners.forEach((listener) => listener.connect())
    this.droppableEventListeners.forEach((listener) => listener.connect())
  }

  private disconnectListeners() {
    this.dropEventListeners.forEach((listener) => listener.disconnect())
    this.droppableEventListeners.forEach((listener) => listener.disconnect())
  }

  private get element() {
    return this.controller.element
  }
}
