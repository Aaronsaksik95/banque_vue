<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{ title: string, type: 'submit' | 'reset' | 'button', styleBtn: string }>();
const emit = defineEmits(['onclick'])

const validationButton = () => {
    emit('onclick')
}
</script>

<template>
    <button :class="['button', styleBtn === 'small' ? 'small' : 'large']" :type="type" @click="validationButton">{{ title
    }}</button>
</template>

<style scoped>
button {
    border: none;
    background-color: rgb(80, 184, 184);
    color: white;
    border-radius: 10px;
    cursor: pointer;
}

button:hover {
    background-color: rgb(77, 153, 153);
}

.small {
    width: 30%;
    font-size: 14px;
    padding: 10px 10px;
}

.large {
    width: 100%;
    font-size: 20px;
    padding: 15px 10px;
}</style>
