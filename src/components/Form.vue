<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import Button from './Button.vue'

export interface Field {
    label: string;
    name: string;
    value: string;
    type: string;
    options?: Array<{ label: string, value: string }>;
}
export interface FormFields {
    [key: string]: string
}

const props = defineProps<{ fields: Field[], titleBtn: string }>();
const fields = ref(props.fields);
const emit = defineEmits(['submitForm'])

const handleSubmit = () => {
    const mappedData = fields.value.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {} as FormFields);
    emit('submitForm', mappedData);
};
</script>

<template>
    <div class="container">
        <form class="form" @submit.prevent="handleSubmit">
            <div class="form__field" v-for="(field, index) in fields" :key="index">
                <div>
                    <label class="form__label" :for="'field' + index">{{ field.label }}</label>
                    <input v-if="field.type !== 'dropdown'" :type="field.type" v-model="field.value" :id="'field' + index"
                        class="form__input" />
                    <select v-else v-model="field.value" :id="'field' + index" class="form__select">
                        <option v-for="option in field.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>
            <Button :title="titleBtn" styleBtn="large" type="submit"></Button>
        </form>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    margin: 20px;
}

.form {
    width: 500px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border-radius: 8px;
    text-align: center;
}

.form__field {
    margin-bottom: 15px;
}

.form__label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form__input {
    width: 80%;
    height: 20px;
    padding: 8px;
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
}

.form__select {
    width: 80%;
    padding: 8px;
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
}
</style>
