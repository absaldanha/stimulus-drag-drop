import { Observer as DraggableObserver } from "../draggable"
import { Observer as DroppableObserver } from "../droppable"

import type { Controller } from "@hotwired/stimulus"

export class Observer {
  private started: boolean
  private draggableObserver: DraggableObserver
  private droppableObserver: DroppableObserver

  constructor(controller: Controller) {
    this.started = false
    this.draggableObserver = new DraggableObserver(controller)
    this.droppableObserver = new DroppableObserver(controller)
  }

  start() {
    if (!this.started) {
      this.draggableObserver.start()
      this.droppableObserver.start()

      this.started = true
    }
  }

  stop() {
    if (this.started) {
      this.draggableObserver.stop()
      this.droppableObserver.stop()

      this.started = false
    }
  }
}
