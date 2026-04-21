<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
})
</script>

<template>
  <div class="demo-block">
    <div v-if="title" class="demo-block__title">{{ title }}</div>
    <div v-if="description" class="demo-block__desc">{{ description }}</div>
    <div class="demo-block__preview">
      <slot />
    </div>
    <slot name="code" />
  </div>
</template>

<style scoped>
.demo-block {
  margin-bottom: 32px;
  border: 1px solid var(--cp-border-dim);
  background: var(--cp-bg-panel);
}
.demo-block__title {
  padding: 12px 16px 0;
  font-family: var(--cp-font-mono);
  font-size: 15px;
  font-weight: 600;
  color: var(--cp-text-primary);
  letter-spacing: 0.03em;
}
.demo-block__desc {
  padding: 4px 16px 12px;
  font-size: 12px;
  color: var(--cp-text-dim);
  line-height: 1.6;
}
.demo-block__preview {
  padding: 20px 16px;
  border-top: 1px solid var(--cp-border-dim);
  border-bottom: 1px solid var(--cp-border-dim);
}
</style>
