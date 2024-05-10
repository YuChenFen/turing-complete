<template>
    <div>
        <div class="byte-to-bit" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="byte-to-bit" style="width: 100px;height: 20px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -40%) scale(0.5);font-size: 0.5em;">
                分线器</p>
            <p style="position: absolute;top: 2px;left: 5px;transform: scale(0.5);font-size: 0.5em;">
                1</p>
            <Handle id="input_a" type="target" :connectable-start="false" :position="Position.Bottom" />
            <Handle id="output_0" type="source" :connectable-end="false" :position="Position.Top" style="left: 10%;" />
            <Handle id="output_1" type="source" :connectable-end="false" :position="Position.Top" style="left: 20%;" />
            <Handle id="output_2" type="source" :connectable-end="false" :position="Position.Top" style="left: 30%;" />
            <Handle id="output_3" type="source" :connectable-end="false" :position="Position.Top" style="left: 40%;" />
            <Handle id="output_4" type="source" :connectable-end="false" :position="Position.Top" style="left: 60%;" />
            <Handle id="output_5" type="source" :connectable-end="false" :position="Position.Top" style="left: 70%;" />
            <Handle id="output_6" type="source" :connectable-end="false" :position="Position.Top" style="left: 80%;" />
            <Handle id="output_7" type="source" :connectable-end="false" :position="Position.Top" style="left: 90%;" />
        </div>
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_a = toRef(() => props.data.input_a)
watch(input_a, (input_a) => {
    if (input_a == void 0) {
        for (let i = 0; i < 8; i++) {
            updateNodeData(props.id, { [`output_${i}`]: 0 });
        }
        return;
    }
    for (let i = 0; i < 8; i++) {
        updateNodeData(props.id, { [`output_${i}`]: ( input_a >> i ) & 1 });
    }
})

const rotate = ref(0);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.byte-to-bit {
    width: 100px;
    height: 20px;
}
</style>