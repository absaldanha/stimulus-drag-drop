export type DragEventName = "drag" | "dragstart" | "dragend" | "dragover" | "dragenter" | "dragleave" | "drop"

export type CustomDragEventName =
  | "draggable:drag"
  | "draggable:dragstart"
  | "draggable:dragend"
  | "droppable:dragover"
  | "droppable:dragenter"
  | "droppable:dragleave"
  | "droppable:drop"

export type CustomDragEventPrefix = "draggable" | "droppable"

export interface CustomDragEventDetail {
  originalEvent: DragEvent
}

export interface CustomDragEventInit extends CustomEventInit<CustomDragEventDetail> {
  detail: CustomDragEventDetail
}

export class CustomDragEvent extends CustomEvent<CustomDragEventDetail> {
  declare readonly type: CustomDragEventName

  protected originalEvent: DragEvent

  protected static eventPrefix: CustomDragEventPrefix

  static eventName(eventName: DragEventName) {
    return `${this.eventPrefix}:${eventName}` as CustomDragEventName
  }

  static build<T extends typeof CustomDragEvent>(
    this: T,
    event: DragEvent,
    options: CustomEventInit = { bubbles: true, cancelable: true },
  ): InstanceType<T> {
    const eventName = this.eventName(event.type as DragEventName)
    const eventOptions = { ...options, detail: { ...options.detail, originalEvent: event } }

    return new this(eventName, eventOptions) as InstanceType<T>
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
