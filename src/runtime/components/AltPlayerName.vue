<script setup lang="ts">
import { useAlt } from '../composables/alt'

const { getPlayerName } = useAlt()

const playerName = await getPlayerName()
</script>

<template>
    <ClientOnly>
        <span>{{ playerName }}</span>
    </ClientOnly>
</template>
