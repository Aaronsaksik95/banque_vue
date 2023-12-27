<script setup lang="ts">
import { defineProps, ref } from 'vue';
import moment from 'moment';
import type { Operation } from '@/views/MyAccountsView.vue';

const props = defineProps<{ operation: Operation, accountId: string | undefined }>();
const operation = ref(props.operation);

const formatedDate = (date: string) => {
    const maDate = moment(date);
    return maDate.format("DD-MM-YYYY [à] HH:mm");
}
</script>

<template>
    <div :class="['account__operation', operation.status === 'denied' ? 'denied' : 'accepted']">
        <div class="operation__info">
            <div class="operation__info__type">
                <p class="type">{{ operation.type }}</p>
                <p :class="['status', operation.status === 'accepted' ? 'positif' : 'negatif']">{{ operation.status }}
                </p>
            </div>
            <p class="date">{{ formatedDate(operation.created_at) }}</p>
        </div>
        <div class="operation__account">
            <p v-if="operation.receivingAccount" class="account__name ">
                <span class="negatif">{{ operation.sendingAccount.name }}</span> → <span class="positif">{{
                    operation?.receivingAccount?.name }}</span>
            </p>
            <p v-else class="account__name">{{ operation.sendingAccount.name }}</p>

        </div>
        <p v-if="operation.type === 'deposit'" class="operation__amount positif">+ {{ operation.amount }} €</p>
        <p v-else-if="operation.receivingAccount && operation.receivingAccount._id === accountId"
            class="operation__amount positif">+ {{ operation.amount }} €</p>
        <p v-else class="operation__amount negatif">- {{ operation.amount }} €</p>
    </div>
</template>

<style scoped>
.account__operation {
    margin: 10px;
    padding: 20px;
    background-color: rgb(245, 245, 245);
    height: auto;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 10px;
}

.denied {
    background-color: rgb(255, 232, 232);
}

.accepted {
    background-color: rgb(232, 255, 255);
}

.operation__info__type {
    display: flex;
}

.type {
    font-size: 20px;
    margin: 10px;
    text-transform: uppercase;
    font-weight: 800;
}

.status {
    font-size: 15px;
    margin: auto 15px;
}

.date {
    font-size: 15px;
    margin: 15px 15px 0px 10px;
}

.operation__account {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
}

.account__name {
    font-size: 20px;
    font-weight: 800;
    margin: 10px;
}

.receiving {
    color: rgb(80, 184, 184);
}

.operation__amount {
    font-size: 25px;
    display: flex;
    justify-content: space-around;
    margin: auto;
}

.positif {
    color: rgb(80, 184, 184);
}

.negatif {
    color: red;

}</style>
