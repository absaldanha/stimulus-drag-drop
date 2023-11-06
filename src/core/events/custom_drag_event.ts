import type { CustomDragEventName } from "../types"

interface CustomDragEventDetail {
  originalEvent: DragEvent
}

export interface CustomDragEventInit extends CustomEventInit<CustomDragEventDetail> {
  detail: CustomDragEventDetail
}

export class CustomDragEvent extends CustomEvent<CustomDragEventDetail> {
  declare readonly type: CustomDragEventName

  protected originalEvent: DragEvent

  protected static eventPrefix: string

  static eventName(eventName: string) {
    return `${this.eventPrefix}:${eventName}` as CustomDragEventName
  }

  static build(event: DragEvent, options: CustomEventInit = { bubbles: true, cancelable: true }) {
    const eventName = this.eventName(event.type)
    const eventOptions = { ...options, detail: { ...options.detail, originalEvent: event } }

    return new this(eventName, eventOptions)
  }

  constructor(type: CustomDragEventName, options: CustomDragEventInit) {
    super(type, options)

    const {
      detail: { originalEvent },
    } = options

    this.originalEvent = originalEvent
  }

  get dataTransfer() {
    return this.originalEvent.dataTransfer
  }

  preventDefault() {
    super.preventDefault()
    this.originalEvent.preventDefault()
  }

  stopPropagation() {
    super.stopPropagation()
    this.originalEvent.stopPropagation()
  }

  stopImmediatePropagation() {
    super.stopImmediatePropagation()
    this.originalEvent.stopImmediatePropagation()
  }
}
