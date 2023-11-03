import type { Controller } from "@hotwired/stimulus"
import type { DragEventName, DraggableEventName, DropEventName, DroppableEventName } from "./types"

type Prefix = "draggable" | "droppable"

type EventName = DraggableEventName | DroppableEventName

export function buildDraggableEventName(eventName: DragEventName) {
  return prefixEvent("draggable", eventName) as DraggableEventName
}

export function buildDroppableEventName(eventName: DropEventName) {
  return prefixEvent("droppable", eventName) as DroppableEventName
}

export function controllerDataPayload(controller: Controller) {
  const data = { elementId: controller.element.id, identifier: controller.identifier }

  return JSON.stringify(data)
}

export function getControllerFromDataPayload(payload?: string) {
  if (!payload) {
    return null
  }

  const { elementId, identifier } = JSON.parse(payload)
  const element = document.getElementById(elementId)

  if (!element || !window.Stimulus) {
    return null
  }

  return window.Stimulus.getControllerForElementAndIdentifier(element, identifier)
}

function prefixEvent(prefix: Prefix, eventName: DragEventName | DropEventName) {
  return `${prefix}:${eventName}` as EventName
}
