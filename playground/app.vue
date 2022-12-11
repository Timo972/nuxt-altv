<template>
  <div>
    <h1>
      <AltPlayerName />
    </h1>
  </div>
</template>

<script setup>
import { useAlt, useNuxtApp } from '#imports'

const { close, pushToken } = useAlt()
</script>
