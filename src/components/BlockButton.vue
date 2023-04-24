<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  index: {
    type: String,
    required: false,
    default: ''
  },
  clickFunc: {
    type: Function,
    required: false
  }
})
const router = useRouter()
const handleClick = () => {
  if (props.index !== '') {
    router.push(props.index)
  } else if (props.clickFunc) {
    props.clickFunc()
  }
}
</script>

<template>
  <div class="block-button" @click="handleClick">
    <i>
      <slot name="icon"></slot>
    </i>
    <div>
      <h3>
        <slot></slot>
      </h3>
      <div class="details">
        <slot name="details"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block-button {
  margin-top: 2rem;
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  min-height: 80px;
  align-items: center;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
}

.block-button:focus {
  outline: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2), 0px 0px 0px 4px rgba(0, 0, 0, 0.1);
}

.block-button:active {
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}

.details {
  display: none;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  min-width: 80px;
  height: 80px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .block-button {
    min-width: 500px;
  }
  .details {
    display: inline;
    margin-left: 0;
  }
}
</style>
