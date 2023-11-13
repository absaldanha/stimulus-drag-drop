import { DraggableContextObserver } from "./observers"

import type { ExtendedController } from "./listeners"

export function useDraggableContext(controller: ExtendedController) {
  const observer = new DraggableContextObserver(controller)
  const controllerDisconnect = controller.disconnect

  const disconnect = () => {
    observer.stop()
    controllerDisconnect.call(controller)
  }

  Object.assign(controller, { disconnect })

  observer.start()

  return [observer.start, observer.stop] as const
}
