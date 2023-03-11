import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addImportsDir, useLogger, addComponentsDir } from '@nuxt/kit'

export interface ModuleOptions {
  addPlugin: boolean;
  addComposable: boolean;
  addComponents: boolean;
  debug: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-altv',
    configKey: 'altv',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    addPlugin: true,
    addComposable: true,
    addComponents: true,
    debug: false
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('nuxt-altv')

    if (options.debug) { logger.debug('options', options) }

    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))
    }

    if (options.addComposable) {
      addImportsDir(resolve('./runtime/composables'))

      if (options.debug) {
        logger.debug('addImportsDir', resolve('./runtime/composables'))
      }
    }

    if (options.addComponents) {
      addComponentsDir({
        path: resolve('./runtime/components'),
        global: true,
        transpile: true
      })
      // const p = resolve('./runtime/components')
      // const pushDir = (dirs: (string | ComponentsDir)[]) => {
      //   dirs.push(p)
      // }
      // nuxt.hook('components:dirs', pushDir)
      // nuxt.hook('imports:dirs', pushDir)
    }
  }
})
