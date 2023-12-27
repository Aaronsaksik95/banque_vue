<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ title: string | undefined, typeAmount: string, amount: number | undefined }>();
</script>

<template>
    <div class="account__pres">
        <h1 class="account__title">{{ title }}</h1>
        <div class="ee">
            <small class="type__amount">{{ typeAmount }}</small>
            <h2 :class="['account__amount', amount && amount < 0 ? 'negatif' : 'positif']">{{ amount }} €
            </h2>
        </div>
    </div>
</template>

<style scoped>
.account__pres {
    position: fixed;
    width: 90%;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 0.5px solid rgb(155, 155, 155);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.948);
    border-radius: 20px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
}

.account__title {
    margin: 40px 130px;
    align-items: center;
}

.ee {
    text-align: center;
}

.account__amount {
    font-size: 60px;
    text-decoration: underline;
    margin: 0px 130px 40px 130px;
}

.negatif {
    color: red;
}

.positif {
    color: rgb(77, 153, 153);
}

.type__amount {
    margin: auto;
}
</style>
