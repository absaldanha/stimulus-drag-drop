import { DraggableObserver } from "./observers"

import type { DraggableController } from "./draggable_controller"

export function useDraggable(controller: DraggableController) {
  const observer = new DraggableObserver(controller)
  const controllerDisconnect = controller.disconnect

  controller.element.setAttribute("draggable", "true")

  const disconnect = () => {
    observer.stop()
    controllerDisconnect.call(controller)
  }

  Object.assign(controller, { disconnect })

  observer.start()

  return [observer.start, observer.stop] as const
}
