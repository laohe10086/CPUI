<template>
  <article
    class="cyber-blog-card"
    :class="{
      'cyber-blog-card--corrupted': status === 'corrupted',
      'cyber-blog-card--featured': status === 'featured',
    }"
    @click="$emit('click')"
  >
    <h3 class="cyber-blog-card__title">{{ title }}</h3>
    <p class="cyber-blog-card__excerpt">{{ description }}</p>
    <div class="cyber-blog-card__footer">
      <span class="cyber-blog-card__status" :class="{ 'cyber-blog-card__status--corrupted': status === 'corrupted' }">
        STATUS: {{ status || 'normal' }}
      </span>
      <button
        class="cyber-blog-card__btn"
        :class="{
          'cyber-blog-card__btn--corrupted': status === 'corrupted',
          'cyber-blog-card__btn--featured': status === 'featured',
        }"
        @click.stop="$emit('action')"
      >
        {{ status === 'corrupted' ? 'RETRY' : 'ACCESS' }}
      </button>
    </div>
    <div v-if="link" class="cyber-blog-card__link-indicator">
      <span class="cyber-blog-card__link-icon">&rarr;</span>
    </div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  status?: 'normal' | 'corrupted' | 'featured'
  link?: string
}>(), {
  description: '',
  status: 'normal',
})

defineEmits<{
  click: []
  action: []
}>()
</script>

<style lang="scss" scoped>
.cyber-blog-card {
  background: rgba(10, 10, 12, 0.8);
  border: 1px solid #333;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 240px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);

  &:hover {
    border-color: var(--cp-color-secondary);
    background: rgba(0, 240, 255, 0.05);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
  }

  &--corrupted {
    border-color: var(--cp-color-danger);
    background: rgba(255, 0, 0, 0.02);
    animation: corrupted-pulse 2s infinite;

    &:hover {
      border-color: var(--cp-color-danger);
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
    }
  }

  &--featured {
    border-color: var(--cp-color-primary);
    background: rgba(252, 232, 3, 0.02);

    &:hover {
      box-shadow: 0 10px 30px rgba(252, 232, 3, 0.15);
    }
  }
}

.cyber-blog-card__title {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.2;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.cyber-blog-card__excerpt {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.cyber-blog-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cyber-blog-card__status {
  font-size: 0.7rem;
  color: #555;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;

  &--corrupted {
    color: var(--cp-color-danger);
  }
}

.cyber-blog-card__btn {
  background: transparent;
  color: var(--cp-color-secondary);
  border: 1px solid var(--cp-color-secondary);
  padding: 0.2rem 1rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%);

  &:hover {
    background: var(--cp-color-secondary);
    color: #000;
    box-shadow: 0 0 15px var(--cp-color-secondary);
    transform: scale(1.05);
  }

  &--corrupted {
    border-color: var(--cp-color-danger);
    color: var(--cp-color-danger);

    &:hover {
      background: var(--cp-color-danger);
      color: #000;
      box-shadow: 0 0 15px var(--cp-color-danger);
    }
  }

  &--featured {
    border-color: var(--cp-color-primary);
    color: var(--cp-color-primary);

    &:hover {
      background: var(--cp-color-primary);
      color: #000;
      box-shadow: 0 0 15px var(--cp-color-primary);
    }
  }
}

.cyber-blog-card__link-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
}

.cyber-blog-card__link-icon {
  color: var(--cp-color-secondary);
  font-size: 1rem;
}

@keyframes corrupted-pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
</style>
