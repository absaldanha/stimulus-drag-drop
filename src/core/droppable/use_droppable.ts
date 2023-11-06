import { Observer } from "./observer"

import type { Controller } from "@hotwired/stimulus"

export function useDroppable(controller: Controller) {
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
