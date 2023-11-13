import { DroppableObserver } from "./observers"

import type { DroppableController } from "./droppable_controller"

export function useDroppable(controller: DroppableController) {
  const observer = new DroppableObserver(controller)
  const controllerDisconnect = controller.disconnect

  const disconnect = () => {
    observer.stop()
    controllerDisconnect.call(controller)
  }

  Object.assign(controller, { disconnect })

  observer.start()

  return [observer.start, observer.stop] as const
}
