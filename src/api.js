import * as Utils from 'utils'

export const DefaultMaxVisible = 5

export const Queue = {
  currentlyVisible: 0,
  maxVisible: DefaultMaxVisible,
  queue: []
}

export const Store = {}

export let Defaults = {
  type: 'alert',
  layout: 'topRight',
  theme: 'boostrap-v5',
  text: '',
  timeout: false,
  progressBar: true,
  animation: {
    open: 'noty_effects_open',
    close: 'noty_effects_close'
  },
  id: false,
  first: false,
  container: false,
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function addToQueue(ref) {
  Queue.queue.push(ref)
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function removeFromQueue(ref) {
  Queue.queue = Queue.queue.filter(i => i.id !== ref.id)
}

/**
 * @return {void}
 */
export function queueRender() {
    const noty = Queue.queue.shift()

    if (noty) noty.show()
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function ghostFix(ref) {
  const ghostID = Utils.generateID('ghost')
  let ghost = document.createElement('div')
  ghost.setAttribute('id', ghostID)
  Utils.css(ghost, {
    height: Utils.outerHeight(ref.barDom) + 'px'
  })

  ref.barDom.insertAdjacentHTML('afterend', ghost.outerHTML)

  Utils.remove(ref.barDom)
  ghost = document.getElementById(ghostID)
  Utils.addClass(ghost, 'noty_fix_effects_height')
  Utils.addListener(ghost, 'animationend', () => {
    Utils.remove(ghost)
  })
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function build(ref) {
  findOrCreateContainer(ref)

  const markup = `<div class="noty_body">${ref.options.text}</div><div class="noty_progressbar"></div>`

  ref.barDom = document.createElement('div')
  ref.barDom.setAttribute('id', ref.id)
  Utils.addClass(
    ref.barDom,
    `noty_bar noty_type__${ref.options.type} noty_theme__${ref.options.theme}`
  )

  ref.barDom.innerHTML = markup
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function findOrCreateContainer(ref) {
  if (ref.options.container) {
    ref.layoutDom = document.querySelector(ref.options.container)
    return
  }

  const layoutID = `noty_layout__${ref.options.layout}`
  ref.layoutDom = document.querySelector(`div#${layoutID}`)

  if (!ref.layoutDom) {
    ref.layoutDom = document.createElement('div')
    ref.layoutDom.setAttribute('id', layoutID)
    ref.layoutDom.setAttribute('role', 'alert')
    ref.layoutDom.setAttribute('aria-live', 'polite')
    Utils.addClass(ref.layoutDom, 'noty_layout')
    document.querySelector('body').appendChild(ref.layoutDom)
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function queueClose(ref) {
  if (ref.options.timeout) {
    if (ref.options.progressBar && ref.progressDom) {
      Utils.css(ref.progressDom, {
        transition: `width ${ref.options.timeout}ms linear`,
        width: '0%'
      })
    }

    clearTimeout(ref.closeTimer)

    ref.closeTimer = setTimeout(
      () => {
        ref.close()
      },
      ref.options.timeout
    )
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function dequeueClose(ref) {
  if (ref.options.timeout && ref.closeTimer) {
    clearTimeout(ref.closeTimer)
    ref.closeTimer = -1

    if (ref.options.progressBar && ref.progressDom) {
      Utils.css(ref.progressDom, {
        transition: 'width 0ms linear',
        width: '100%'
      })
    }
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function openFlow(ref) {
  queueClose(ref)

  Utils.addListener(ref.barDom, 'mouseenter', () => {
    dequeueClose(ref)
  })

  Utils.addListener(ref.barDom, 'mouseleave', () => {
    queueClose(ref)
  })
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function closeFlow(ref) {
  delete Store[ref.id]
  ref.closing = false
  Utils.remove(ref.barDom)

  if (
    ref.layoutDom.querySelectorAll('.noty_bar').length === 0 &&
    !ref.options.container
  ) {
    Utils.remove(ref.layoutDom)
  }

  queueRender()
}
