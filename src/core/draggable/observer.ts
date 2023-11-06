import { DragTargetEventListener, DraggableEventListener } from "../listeners"

import type { Controller } from "@hotwired/stimulus"

export class Observer {
  private started: boolean
  private dragListener: DragTargetEventListener
  private draggableListener: DraggableEventListener

  constructor(controller: Controller) {
    this.started = false
    this.dragListener = new DragTargetEventListener(controller.element, { capture: true })
    this.draggableListener = new DraggableEventListener(controller)
  }

  start() {
    if (!this.started) {
      this.dragListener.connect()
      this.draggableListener.connect()

      this.started = true
    }
  }

  stop() {
    if (this.started) {
      this.dragListener.disconnect()
      this.draggableListener.disconnect()

      this.started = false
    }
  }
}
