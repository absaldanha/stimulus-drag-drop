import { Observer } from "./observer"
import { DraggableController } from "../types"

export function useDraggable(controller: DraggableController) {
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
