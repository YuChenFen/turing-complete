<template>
    <div class="textarea-content" :style="{ width: width, height: height }">
        <textarea :style="{ fontSize: fontSize }" :value="value" :placeholder="placeholder" @input="input" @change="change" @keydown="keydown"></textarea>
        <div class="underline"></div>
    </div>
</template>

<script setup>
import { nextTick } from 'vue';

const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    },
    fontSize: {
        type: String,
        default: '1em'
    },
    placeholder: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(["update:value", "input", "change"]);

const input = (e) => {
    emits('update:value', e.target.value);
    emits('input', e.target.value);
}
const change = (e) => {
    emits('update:value', e.target.value);
    emits('change', e.target.value);
}

const keydown = (e) => {
    if (e.keyCode === 9) {
        e.preventDefault();
        let indent = "    ";
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        let selected = window?.getSelection()?.toString();
        selected = indent + selected?.replace(/\n/g, '\n' + indent);
        emits('update:value', e.target.value.substring(0, start) + selected + e.target.value.substring(end));
        nextTick(() => {
            e.target.setSelectionRange(start + indent.length, start + selected.length);
        })
    }
}
</script>

<style scoped>
.textarea-content {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid rgba(var(--app-color), .1);
    box-shadow: var(--app-shadow);
    border-radius: 2px;
    background-color: var(--app-background-color);
}

.textarea-content textarea {
    width: 100%;
    height: 100%;
    display: inline-block;
    padding: 8px 15px 8px 15px;
    background-color: #00000000;
    color: rgb(var(--app-color));
    letter-spacing: 1px;
    border: none;
    resize: none;
}

.textarea-content .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    border-radius: 2px;
    background-color: var(--app-highlight-background-color);
    transform: scaleX(0);
    transition: all 0.3s ease;
}

.textarea-content:has(> textarea:focus) {
    box-shadow: none;
}

.textarea-content textarea:focus~.underline {
    transform: scaleX(1);
}
</style>