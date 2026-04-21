<script lang="ts">
import { defineComponent, h } from 'vue'
import { CyberBracketLabel } from '@cp-ui/index'

export default defineComponent({
  props: { tag: String, title: String },
  setup(props, { slots }) {
    return () => h('section', { class: 'showcase__section' }, [
      h('div', { class: 'showcase__section-header' }, [
        h(CyberBracketLabel, { text: props.tag || '', variant: 'accent' }),
        h('span', { class: 'showcase__section-title' }, props.title),
      ]),
      slots.default?.(),
    ])
  },
})
</script>
