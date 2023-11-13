import { Application, Controller } from "@hotwired/stimulus"
import { useDraggable, useDroppable, useDraggableContext } from "../../dist/stimulus-drag-drop-esm.js"

class BoardController extends Controller {}

class ColumnController extends Controller {
  connect() {
    useDroppable(this)
  }

  onDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  onDragEnter() {
    this.element.classList.add("drag-enter")
  }

  onDragLeave() {
    this.element.classList.remove("drag-enter")
  }

  onDrop(event) {
    event.preventDefault()

    const item = event.draggable

    this.element.getElementsByTagName("ul")[0].prepend(item.element)
  }
}

class ItemController extends Controller {
  connect() {
    useDraggable(this)
  }

  onDragStart(event) {
    event.dataTransfer.effectAllowed = "move"
    event.draggable = this
  }
}

const application = Application.start()

application.register("board", BoardController)
application.register("column", ColumnController)
application.register("item", ItemController)

window.Stimulus = application
