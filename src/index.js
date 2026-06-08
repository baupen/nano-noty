/* global VERSION */

import 'noty.scss'
import Promise from 'es6-promise'
import * as Utils from 'utils'
import * as API from 'api'

export default class Noty {
  /**
   * @param {object} options
   * @return {Noty}
   */
  constructor(options = {}) {
    this.options = Utils.deepExtend({}, API.Defaults, options)

    if (API.Store[this.options.id]) {
      return API.Store[this.options.id]
    }

    this.id = this.options.id || Utils.generateID('bar')
    this.closeTimer = -1
    this.barDom = null
    this.layoutDom = null
    this.progressDom = null
    this.showing = false
    this.shown = false
    this.closed = false
    this.closing = false
    this.promises = {
      show: null,
      close: null
    }

    return this
  }

  /**
   * @return {Noty}
   */
  show() {
    if (this.showing || this.shown) {
      return this // preventing multiple show
    }

    let queueCounts = API.Queue.queue.length

    if (
      queueCounts.current >= queueCounts.maxVisible
    ) {
      API.addToQueue(this)

      return this
    }

    API.Store[this.id] = this

    this.showing = true

    if (this.closing) {
      this.showing = false
      return this
    }

    API.build(this)

    if (this.options.first) {
      this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild)
    } else {
      this.layoutDom.appendChild(this.barDom)
    }

    this.shown = true
    this.closed = false

    this.progressDom = this.barDom.querySelector('.noty_progressbar')

    Utils.addClass(this.barDom, 'noty_close_with_click')
    Utils.addListener(
      this.barDom,
      'click',
      e => {
        Utils.stopPropagation(e)
        this.close()
      },
      false
    )

    if (this.options.timeout) Utils.addClass(this.barDom, 'noty_has_timeout')
    if (this.options.progressBar) {
      Utils.addClass(this.barDom, 'noty_has_progressbar')
    }

    if (this.options.animation.open === null) {
      this.promises.show = new Promise(resolve => {
        resolve()
      })
    } else if (typeof this.options.animation.open === 'function') {
      this.promises.show = new Promise(this.options.animation.open.bind(this))
    } else {
      Utils.addClass(this.barDom, this.options.animation.open)
      this.promises.show = new Promise(resolve => {
        Utils.addListener(this.barDom, Utils.animationEndEvents, () => {
          Utils.removeClass(this.barDom, this.options.animation.open)
          resolve()
        })
      })
    }

    this.promises.show.then(() => {
      const _t = this
      setTimeout(
        () => {
          API.openFlow(_t)
        },
        100
      )
    })

    return this
  }

  /**
   * @return {Noty}
   */
  stop() {
    API.dequeueClose(this)
    return this
  }

  /**
   * @return {Noty}
   */
  resume() {
    API.queueClose(this)
    return this
  }

  /**
   * @param {int|boolean} ms
   * @return {Noty}
   */
  setTimeout(ms) {
    this.stop()
    this.options.timeout = ms

    if (this.barDom) {
      if (this.options.timeout) {
        Utils.addClass(this.barDom, 'noty_has_timeout')
      } else {
        Utils.removeClass(this.barDom, 'noty_has_timeout')
      }

      const _t = this
      setTimeout(
        function () {
          // ugly fix for progressbar display bug
          _t.resume()
        },
        100
      )
    }

    return this
  }

  /**
   * @param {string} html
   * @param {boolean} optionsOverride
   * @return {Noty}
   */
  setText(html, optionsOverride = false) {
    if (this.barDom) {
      this.barDom.querySelector('.noty_body').innerHTML = html
    }

    if (optionsOverride) this.options.text = html

    return this
  }

  /**
   * @param {string} type
   * @param {boolean} optionsOverride
   * @return {Noty}
   */
  setType(type, optionsOverride = false) {
    if (this.barDom) {
      let classList = Utils.classList(this.barDom).split(' ')

      classList.forEach(c => {
        if (c.substring(0, 11) === 'noty_type__') {
          Utils.removeClass(this.barDom, c)
        }
      })

      Utils.addClass(this.barDom, `noty_type__${type}`)
    }

    if (optionsOverride) this.options.type = type

    return this
  }

  /**
   * @param {string} theme
   * @param {boolean} optionsOverride
   * @return {Noty}
   */
  setTheme(theme, optionsOverride = false) {
    if (this.barDom) {
      let classList = Utils.classList(this.barDom).split(' ')

      classList.forEach(c => {
        if (c.substring(0, 12) === 'noty_theme__') {
          Utils.removeClass(this.barDom, c)
        }
      })

      Utils.addClass(this.barDom, `noty_theme__${theme}`)
    }

    if (optionsOverride) this.options.theme = theme

    return this
  }

  /**
   * @return {Noty}
   */
  close() {
    if (this.closed) return this

    if (!this.shown) {
      // it's in the queue
      API.removeFromQueue(this)
      return this
    }

    this.closing = true

    if (this.options.animation.close === null || this.options.animation.close === false) {
      this.promises.close = new Promise(resolve => {
        resolve()
      })
    } else if (typeof this.options.animation.close === 'function') {
      this.promises.close = new Promise(
        this.options.animation.close.bind(this)
      )
    } else {
      Utils.addClass(this.barDom, this.options.animation.close)
      this.promises.close = new Promise(resolve => {
        Utils.addListener(this.barDom, Utils.animationEndEvents, () => {
          if (this.options.first) {
            Utils.remove(this.barDom)
          } else {
            API.ghostFix(this)
          }
          resolve()
        })
      })
    }

    this.promises.close.then(() => {
      API.closeFlow(this)
    })

    this.closed = true

    return this
  }

  // API functions

  /**
   * @return {Noty}
   */
  static closeAll() {
    Object.keys(API.Store).forEach(id => {
      API.Store[id].close()
    })
    return this
  }

  /**
   * @return {Noty}
   */
  static clearQueue() {
    API.Queue.queue = []
    return this
  }

  /**
   * @param {Object} obj
   * @return {Noty}
   */
  static overrideDefaults(obj) {
    API.Defaults = Utils.deepExtend({}, API.Defaults, obj)
    return this
  }

  /**
   * @param {int} amount
   * @return {Noty}
   */
  static setMaxVisible(amount = API.DefaultMaxVisible) {
    API.Queue.maxVisible = amount
    return this
  }
}
