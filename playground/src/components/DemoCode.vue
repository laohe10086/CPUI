<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    code: { type: String, required: true },
  },
  setup(props) {
    const copied = ref(false)
    function copy() {
      navigator.clipboard.writeText(props.code).then(() => {
        copied.value = true
        setTimeout(() => { copied.value = false }, 1500)
      })
    }
    return { copied, copy }
  },
})
</script>

<template>
  <div class="demo-code">
    <button class="demo-code__copy" @click="copy">
      {{ copied ? '✓ 已复制' : '复制代码' }}
    </button>
    <pre class="demo-code__pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.demo-code {
  position: relative;
  margin-top: 12px;
  border: 1px solid var(--cp-border-dim);
  background: rgba(0, 0, 0, 0.3);
}
.demo-code__copy {
  position: absolute;
  top: 6px;
  right: 6px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  color: var(--cp-text-muted);
  font-family: var(--cp-font-mono);
  font-size: 10px;
  padding: 3px 8px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.15s;
}
.demo-code__copy:hover {
  color: var(--cp-color-secondary);
  border-color: var(--cp-color-secondary);
}
.demo-code__pre {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  font-family: var(--cp-font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--cp-text-secondary);
}
</style>
