import type { Controller } from "@hotwired/stimulus"

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
