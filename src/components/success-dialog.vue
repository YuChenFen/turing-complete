<template>
    <customize-dialog width="80%" v-model:open="isOpenDialog" @ok="ok" @no="no">
        <template #body>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;text-align: center;">
                    完成
                </header>
                <p>
                    {{ message }}
                </p>
            </div>
        </template>
    </customize-dialog>
</template>

<script setup>
import customizeDialog from './FengUI/dialog/customizeDialog.vue';
import { ref } from 'vue';

const props = defineProps(['router', 'callback', 'message']);
const isOpenDialog = ref(true);

function ok() {
    props.callback();
    props.router.push({ path: '/' });
}

function no() {
    isOpenDialog.value = false;
    props.callback();
}
</script>

<style scoped></style>