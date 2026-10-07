<template>
  <div class="modern-tooltip" @mouseenter="show" @mouseleave="hide">
    <slot />
    <Transition name="modern-tooltip-fade">
      <div v-if="visible" class="modern-tooltip__popup" :class="`modern-tooltip__popup--${placement}`">
        {{ content }}
        <div class="modern-tooltip__arrow"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top'
})

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}
</script>

<style scoped lang="scss">
.modern-tooltip {
  position: relative;
  display: inline-block;
  
  &__popup {
    position: absolute;
    z-index: 1000;
    padding: 8px 12px;
    font-size: 13px;
    line-height: 1.4;
    color: var(--cp-text-primary);
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    pointer-events: none;
    
    &--top {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      
      .modern-tooltip__arrow {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: var(--cp-border);
        
        &::after {
          bottom: 1px;
          border-top-color: var(--cp-surface-2);
        }
      }
    }
    
    &--bottom {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);

      .modern-tooltip__arrow {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
        border-top-color: var(--cp-border);

        &::after {
          bottom: 1px;
          border-top-color: var(--cp-surface-2);
        }
      }
    }

    &--left {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);

      .modern-tooltip__arrow {
        right: -9px;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
        border-top-color: var(--cp-border);

        &::after {
          bottom: 1px;
          border-top-color: var(--cp-surface-2);
        }
      }
    }

    &--right {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);

      .modern-tooltip__arrow {
        left: -9px;
        top: 50%;
        transform: translateY(-50%) rotate(90deg);
        border-top-color: var(--cp-border);

        &::after {
          bottom: 1px;
          border-top-color: var(--cp-surface-2);
        }
      }
    }
  }
  
  &__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid;
    
    &::after {
      content: '';
      position: absolute;
      left: -5px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid;
    }
  }
}

.modern-tooltip-fade-enter-active,
.modern-tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.modern-tooltip-fade-enter-from,
.modern-tooltip-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}

.modern-tooltip__popup--left.modern-tooltip-fade-enter-from,
.modern-tooltip__popup--left.modern-tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(4px);
}

.modern-tooltip__popup--right.modern-tooltip-fade-enter-from,
.modern-tooltip__popup--right.modern-tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(-4px);
}
</style>
