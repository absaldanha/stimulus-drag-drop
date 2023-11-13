import { DraggableEvent, DroppableEvent } from "../index"
import { assert } from "@open-wc/testing"
import * as sinon from "sinon"

test("builds custom event correctly from native drag event", async () => {
  const nativeDragTargetEvents = [new DragEvent("drag"), new DragEvent("dragstart"), new DragEvent("dragend")]

  const nativeDropTargetEvents = [
    new DragEvent("drop"),
    new DragEvent("dragenter"),
    new DragEvent("dragleave"),
    new DragEvent("dragover"),
  ]

  nativeDragTargetEvents.forEach((event) => {
    const draggableEvent = DraggableEvent.build(event)

    assert.equal(draggableEvent.type, `draggable:${event.type}`)
    assert.equal(draggableEvent.detail.originalEvent, event)
  })

  nativeDropTargetEvents.forEach((event) => {
    const droppableEvent = DroppableEvent.build(event)

    assert.equal(droppableEvent.type, `droppable:${event.type}`)
    assert.equal(droppableEvent.detail.originalEvent, event)
  })
})

test("prevents default of original event", async () => {
  const dragEvent = new DragEvent("drag", { cancelable: true })
  const dropEvent = new DragEvent("drop", { cancelable: true })

  const draggableEvent = DraggableEvent.build(dragEvent)
  const droppableEvent = DroppableEvent.build(dropEvent)

  draggableEvent.preventDefault()
  droppableEvent.preventDefault()

  assert.equal(dragEvent.defaultPrevented, true)
  assert.equal(dropEvent.defaultPrevented, true)
  assert.equal(draggableEvent.defaultPrevented, true)
  assert.equal(droppableEvent.defaultPrevented, true)
})

test("prevents propagation of original event", async () => {
  const dragEvent = new DragEvent("drag", { cancelable: true })
  const dropEvent = new DragEvent("drop", { cancelable: true })

  const fakeDragEvent = sinon.replace(dragEvent, "stopPropagation", sinon.fake())
  const fakeDropEvent = sinon.replace(dropEvent, "stopPropagation", sinon.fake())

  const draggableEvent = DraggableEvent.build(dragEvent)
  const droppableEvent = DroppableEvent.build(dropEvent)

  draggableEvent.stopPropagation()
  droppableEvent.stopPropagation()

  assert.equal(fakeDragEvent.callCount, 1)
  assert.equal(fakeDropEvent.callCount, 1)
})

test("prevents immediate propagation of original event", async () => {
  const dragEvent = new DragEvent("drag", { cancelable: true })
  const dropEvent = new DragEvent("drop", { cancelable: true })

  const fakeDragEvent = sinon.replace(dragEvent, "stopImmediatePropagation", sinon.fake())
  const fakeDropEvent = sinon.replace(dropEvent, "stopImmediatePropagation", sinon.fake())

  const draggableEvent = DraggableEvent.build(dragEvent)
  const droppableEvent = DroppableEvent.build(dropEvent)

  draggableEvent.stopImmediatePropagation()
  droppableEvent.stopImmediatePropagation()

  assert.equal(fakeDragEvent.callCount, 1)
  assert.equal(fakeDropEvent.callCount, 1)
})
