<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: { label: String },
  setup(props, { slots }) {
    return () => h('div', { class: 'showcase__block' }, [
      h('div', { class: 'showcase__block-label' }, props.label),
      h('div', { class: 'showcase__block-content' }, slots.default?.()),
    ])
  },
})
</script>
