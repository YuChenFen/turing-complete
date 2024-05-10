<template>
    <div>
        <div class="bit-three-or" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="bit-three-or" style="width: 30px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%) scale(0.5);font-size: 0.5em;">
                OR</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_a_position" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single" :position="input_a_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: 5px;`" />
        <Handle id="input_b" type="target" :connectable-start="false" connectable="single"
            :position="input_b_position" />
        <Handle id="input_c" type="target" :connectable-start="false" connectable="single" :position="input_c_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 5px);`" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_a = toRef(() => props.data.input_a)
const input_b = toRef(() => props.data.input_b)
const input_c = toRef(() => props.data.input_c)
watch(input_a, (input_a) => {
    if (input_a == void 0) {
        updateNodeData(props.id, { output_a: void 0 });
        return;
    }
    if (input_b.value != undefined && input_c.value != undefined) {
        updateNodeData(props.id, { output_a: input_a | input_b.value | input_c.value });
    }
})
watch(input_b, (input_b) => {
    if (input_b == void 0) {
        updateNodeData(props.id, { output_a: void 0 });
        return;
    }
    if (input_a.value != undefined && input_c.value != undefined) {
        updateNodeData(props.id, { output_a: input_a.value | input_b | input_c.value });
    }
})
watch(input_c, (input_c) => {
    if (input_c == void 0) {
        updateNodeData(props.id, { output_a: void 0 });
        return;
    }
    if (input_a.value != undefined && input_b.value != undefined) {
        updateNodeData(props.id, { output_a: input_a.value | input_b.value | input_c });
        return;
    }
})


const rotate = ref(0);
const output_a_position = ref(Position.Top);
const input_a_position = ref(Position.Bottom);
const input_b_position = ref(Position.Bottom);
const input_c_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_a_position);
    rotateFunction(input_a_position);
    rotateFunction(input_b_position);
    rotateFunction(input_c_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.bit-three-or {
    width: 30px;
    height: 30px;
}
</style>