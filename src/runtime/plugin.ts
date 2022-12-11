import { defineNuxtPlugin } from '#app'
import { useAlt } from './composables/alt'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('alt', useAlt())
})
