<template>
  <div class="cyber-profile-card">
    <div
      class="cyber-profile-card__avatar-box"
      @click="$emit('avatar-click')"
    >
      <img
        v-if="avatar && !imgError"
        :src="avatar"
        :alt="nickname"
        class="cyber-profile-card__img"
        :class="{ 'cyber-profile-card__img--hover': hovering }"
        @error="imgError = true"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      />
      <div v-if="!avatar || imgError" class="cyber-profile-card__error">
        <span class="cyber-profile-card__error-icon">&#128683;</span>
      </div>
      <div class="cyber-profile-card__scanline" />
      <div v-if="level" class="cyber-profile-card__level">LEVEL {{ level }}</div>
    </div>
    <h2 class="cyber-profile-card__name">
      {{ nickname }} <span class="cyber-profile-card__separator">//</span> BLOG
    </h2>
    <p v-if="bio" class="cyber-profile-card__bio">{{ bio }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  avatar?: string
  nickname?: string
  level?: string | number
  bio?: string
}>(), {
  avatar: '',
  nickname: 'GHOST',
  level: '',
  bio: '',
})

defineEmits<{
  'avatar-click': []
}>()

const imgError = ref(false)
const hovering = ref(false)
</script>

<style lang="scss" scoped>
.cyber-profile-card {
  position: relative;
  margin-bottom: 3rem;
  margin-top: 1rem;
}

.cyber-profile-card__avatar-box {
  width: 100%;
  height: 200px;
  background: #111;
  border: 2px solid var(--cp-color-secondary);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
  }
}

.cyber-profile-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;

  &--hover {
    transform: scale(1.05);
  }
}

.cyber-profile-card__error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
}

.cyber-profile-card__error-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.cyber-profile-card__scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent 50%, rgba(255, 255, 0, 0.1) 50%);
  background-size: 100% 4px;
  pointer-events: none;
}

.cyber-profile-card__level {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--cp-color-primary);
  color: #000;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: bold;
}

.cyber-profile-card__name {
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  margin-top: 1rem;
  color: white;
}

.cyber-profile-card__separator {
  color: var(--cp-color-primary);
}

.cyber-profile-card__bio {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
