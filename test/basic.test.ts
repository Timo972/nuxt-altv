import { describe, it, expect, vi } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, useTestContext } from '@nuxt/test-utils'
import { useAlt } from "#imports"

describe('altv module', async () => {
    window.alt = {
        emit(eventName: string, ...args: any[]): void { },
        once(eventName: string, listener: (...args: any[]) => void): void { },
    }

    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
        browser: false,
        server: true
    })

    it('renders the index page', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/')
        expect(html).toContain('<div>basic</div>')
    })

    it("sends pushToken", () => {
        useAlt().pushToken("test")

        expect(window.alt.emit).toHaveBeenCalledWith("pushToken", "test")
    })
})