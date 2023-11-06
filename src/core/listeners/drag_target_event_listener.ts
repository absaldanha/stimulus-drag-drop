import { DragEventListener } from "./drag_event_listener";
import { DraggableEvent } from "../events";

import type { DragTargetEventName } from "../types";

export class DragTargetEventListener extends DragEventListener<DragTargetEventName> {
  constructor(eventTarget: EventTarget, options: AddEventListenerOptions = {}) {
    super(eventTarget, ["drag", "dragstart", "dragend"], options)
  }

  protected buildCustomDragEvent(event: DragEvent) {
    return DraggableEvent.build(event)
  }
}
