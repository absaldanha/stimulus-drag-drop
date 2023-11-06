import { DraggableEventListener, DroppableEventListener } from "../listeners"

import type { Controller } from "@hotwired/stimulus"

export class Observer {
  private started: boolean
  private draggableListener: DraggableEventListener
  private droppableListener: DroppableEventListener

  constructor(controller: Controller) {
    this.started = false
    this.draggableListener = new DraggableEventListener(controller)
    this.droppableListener = new DroppableEventListener(controller)
  }

  start() {
    if (!this.started) {
      this.draggableListener.connect()
      this.droppableListener.connect()

      this.started = true
    }
  }

  stop() {
    if (this.started) {
      this.draggableListener.disconnect()
      this.droppableListener.disconnect()

      this.started = false
    }
  }
}
