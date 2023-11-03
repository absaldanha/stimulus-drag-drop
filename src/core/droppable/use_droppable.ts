import { Observer } from "./observer"
import type { DroppableController } from "../types"

export function useDroppable(controller: DroppableController) {
  const observer = new Observer(controller)
  const controllerDisconnect = controller.disconnect

  const disconnect = () => {
    observer.stop()
    controllerDisconnect.call(controller)
  }

  Object.assign(controller, { disconnect })

  observer.start()

  return [observer.start, observer.stop] as const
}
