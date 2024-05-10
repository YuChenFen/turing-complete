<template>
    <div>
        <div class="bit-storage" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="bit-storage" style="width: 30px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -100%) scale(0.5);font-size: 0.5em;">
                {{ output_a }}</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_a_position" />
        <Handle id="input_write" type="target" :connectable-start="false" connectable="single"
            :position="input_write_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: 5px;`" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single" :position="input_a_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 5px);`" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_write = toRef(() => props.data.input_write)
const input_a = toRef(() => props.data.input_a)
const output_a = ref(0);

watch(input_write, () => {
    nextTick(() => {
        if (input_write.value & 1) {
            output_a.value = input_a.value & 1;
            updateNodeData(props.id, { output_a: output_a.value });
        }
    })
})

watch(input_a, () => {
    nextTick(() => {
        if (input_write.value & 1) {
            output_a.value = input_a.value & 1;
            updateNodeData(props.id, { output_a: output_a.value });
        }
    })
})


const rotate = ref(0);
const output_a_position = ref(Position.Top);
const input_write_position = ref(Position.Bottom);
const input_a_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_a_position);
    rotateFunction(input_a_position);
    rotateFunction(input_write_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.bit-storage {
    width: 30px;
    height: 30px;
}
</style>