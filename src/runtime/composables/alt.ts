import type { Ref } from 'vue'
import { useRouter, useState } from '#imports'

type Callback = (...args: any[]) => void

const router = useRouter()

// alt:V events shim for default browsers
class EventBus {
  constructor () {
    if (isInGame()) {
      this.on('routeTo', (to: string) => {
        router.push(to)
      })
    }
  }

  public on (event: string, listener: Callback): void {
    if (isInGame()) {
      return window.alt.emit(event, listener)
    }

    // if (debug) { logger.debug('on', event, listener) }
  }

  public once (event: string, listener: Callback): void {
    if (isInGame()) {
      return window.alt.once(event, listener)
    }

    // if (debug) { logger.debug('once', event, listener) }
  }

  public off (event: string, listener: Callback): void {
    if (isInGame()) {
      return window.alt.off(event, listener)
    }
  }

  public emit (event: string, ...args: any[]): void {
    if (isInGame()) {
      return window.alt.emit(event, ...args)
    }

    // if (debug) {
    //   logger.debug('emit', event, ...args)
    // }
  }

  public getEventListeners (event: string): Callback[] {
    if (isInGame()) {
      return window.alt.getEventListeners(event)
    }

    return []
  }
}

export const events = new EventBus()

// dx wrappers around alt:V WebView API
export const isInGame = () => !process.server && ('alt' in window)
export const close = () => events.emit('closeMe')
export const pushToken = (token: string): void => events.emit('pushToken', token)
export const getPlayerName = async (): Promise<Ref<string>> => {
  const state = useState('altPlayerName', () => '')

  if (!state.value && !process.server) {
    const res = new Promise<string>(resolve => events.on('playerName', resolve))
    events.emit('requestPlayerName')
    state.value = await res
  }

  return state
}

// LocalStorage wrapper
type Listener<V> = (value: V) => void;

class LocalStorage {
  private _setEvent = 'setLocalStorage'
  private _getEvent = 'localStorage'
  private _reqEvent = 'requestLocalStorage'
  private _queue: Record<string, Listener<any>[]> = {}

  constructor () {
    events.on(this._getEvent, this.handleLocalStorage.bind(this))
  }

  private handleLocalStorage (k: string, v: any): void {
    if (!(k in this._queue)) {
      return
    }

    this._queue[k].forEach(ln => ln(v))
    delete this._queue[k]
  }

  private addLocalStorageListener<T> (k: string, ln: Listener<T>): void {
    if (!this._queue[k]) {
      this._queue[k] = [ln]

      return
    }

    this._queue[k].push(ln)
  }

  public get<T> (k: string): Promise<T> {
    return new Promise<T>((resolve) => {
      this.addLocalStorageListener<T>(k, resolve)
      events.emit(this._reqEvent, k)
    })
  }

  public set<T> (k: string, v: T): void {
    events.emit(this._setEvent, k, v)
  }
}

export const localStorage = new LocalStorage()

// composable export
export const useAlt = () => ({
  emit: events.emit,
  on: events.on,
  once: events.once,
  off: events.off,
  getEventListeners: events.getEventListeners,
  localStorage,
  /**
   * Check if alt:V API is available
   */
  isInGame,
  /**
   * Close EarlyAuth Window
   */
  close,
  /**
   * push authToken to alt:V
   * more about earlyAuth at https://docs.altv.mp/articles/earlyauth.html
   * @param token {string} authToken
   * @returns {void}
   */
  pushToken,
  /**
   * Get player name from alt:V
   * @returns {Promise<Ref<string>>}
   */
  getPlayerName
})
