<script setup lang="ts">
import { defineProps } from 'vue';
import Button from './Button.vue'

defineProps({
    isVisible: Boolean
});
const emit = defineEmits(['update:isVisible']);

const close = () => {
    emit('update:isVisible', false);
};
</script>


<template>
    <div v-if="isVisible" class="popup">
        <div class="popup__content">
            <slot></slot>
            <Button title="Fermer" type="button" styleBtn="small" @onclick="close"></Button>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
}

.popup__content {
    background-color: white;
    padding: 20px;
    width: 40%;
    border-radius: 10px;
}
</style>
  