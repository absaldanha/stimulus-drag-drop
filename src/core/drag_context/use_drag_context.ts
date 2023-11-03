import { Observer } from "./observer"
import type { ContextController } from "../types"

export function useDragContext(controller: ContextController) {
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
