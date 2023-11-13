import { CustomDragEvent, type DragEventName } from "../events"
import {
  DragEventListener,
  CustomDragEventListener,
  type DragEventListenerDelegate,
  type ExtendedController,
} from "../listeners"

export class DragObserver implements DragEventListenerDelegate {
  private started: boolean

  readonly controller: ExtendedController
  readonly eventNames: DragEventName[]
  readonly dragEventListener: DragEventListener
  readonly customDragEventListener: CustomDragEventListener

  constructor(controller: ExtendedController, eventNames: DragEventName[]) {
    this.started = false

    this.controller = controller
    this.eventNames = eventNames
    this.dragEventListener = new DragEventListener(this, this.eventTarget)
    this.customDragEventListener = new CustomDragEventListener(controller)
  }

  get eventTarget() {
    return this.controller.element
  }

  start() {
    if (!this.started) {
      this.eventNames.forEach((eventName) => {
        this.dragEventListener.attachTo(eventName, true)
      })

      this.started = true
    }
  }

  stop() {
    if (this.started) {
      this.eventNames.forEach((eventName) => {
        this.dragEventListener.detachFrom(eventName, true)
      })

      this.started = false
    }
  }

  willDispatchCustomEvent(event: CustomDragEvent) {
    this.customDragEventListener.detachFrom(event.type, false)
    this.customDragEventListener.attachTo(event.type, false)
  }

  shouldHandleDragEvent(_event: DragEvent): boolean {
    return true
  }
}
