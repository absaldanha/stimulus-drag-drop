import { DropTargetEventListener, DroppableEventListener } from "../listeners"

import type { Controller } from "@hotwired/stimulus"

export class Observer {
  private started: boolean
  private dragListener: DropTargetEventListener
  private droppableListener: DroppableEventListener

  constructor(controller: Controller) {
    this.started = false
    this.dragListener = new DropTargetEventListener(controller.element, { capture: true })
    this.droppableListener = new DroppableEventListener(controller)
  }

  start() {
    if (!this.started) {
      this.dragListener.connect()
      this.droppableListener.connect()

      this.started = true
    }
  }

  stop() {
    if (this.started) {
      this.dragListener.disconnect()
      this.droppableListener.disconnect()

      this.started = false
    }
  }
}
