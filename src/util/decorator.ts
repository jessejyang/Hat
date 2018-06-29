import Vue from 'vue'

import { noop } from '@/util'

// not capture and passive

// event decorate self
export function self (
  target: Vue,
  name: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) {
  let method = descriptor.value || noop

  descriptor.value = function (...args: any[]) {
    const e = args.find(a => a instanceof Event)
    if (!e) console.warn('event not exist')
    if (e && e.target !== e.currentTarget) return
    return method.apply(this, args)
  }

  return descriptor
}

// event decorate stop
export function stop (
  target: Vue,
  name: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) {
  let method = descriptor.value || noop

  descriptor.value = function (...args: any[]) {
    const e: Event = args.find(a => a instanceof Event)
    e ? e.stopPropagation() : console.warn('event not exist')

    return method.apply(this, args)
  }

  return descriptor
}

// event decorate prevent
export function prevent (
  target: Vue,
  name: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) {
  let method = descriptor.value || noop

  descriptor.value = function (...args: any[]) {
    const e: Event = args.find(a => a instanceof Event)
    e ? e.preventDefault() : console.warn('event not exist')

    return method.apply(this, args)
  }

  return descriptor
}

// event decorate once
export function once (
  target: Vue,
  name: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  let method = descriptor.value || noop

  descriptor.value = function () {
    let result = method.apply(this, arguments)
    method = noop

    return result
  }

  return descriptor
}
