<template>
    <div>
        <div class="if-equal" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="if-equal" style="width: 30px;height: 16px;" :style="`fill: ${color};`"></svg-icon>
            <p v-if="color == 'red'"
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size: 0.5em;color: red;">
                !</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_a_position" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single" :position="input_a_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: 5px;`" />
        <Handle id="input_b" type="target" :connectable-start="false" connectable="single" :position="input_b_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 5px);`" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const color = ref('#000');
const input_a = toRef(() => props.data.input_a)
const input_b = toRef(() => props.data.input_b)

watch(input_a, (input_a) => {
    color.value = '#000';
    if (input_a == void 0) {
        if (input_b.value != undefined) {
            updateNodeData(props.id, { output_a: input_b.value });
        } else {
            updateNodeData(props.id, { output_a: void 0 });
        }
        return;
    }
    if (input_b.value != undefined) {
        if (input_b.value != input_a) {
            updateNodeData(props.id, { output_a: void 0 });
            color.value = 'red';
        } else {
            updateNodeData(props.id, { output_a: input_a });
        }
    } else {
        updateNodeData(props.id, { output_a: input_a });
    }
})

watch(input_b, (input_b) => {
    color.value = '#000';
    if (input_b == void 0) {
        if (input_a.value != undefined) {
            updateNodeData(props.id, { output_a: input_a.value });
        } else {
            updateNodeData(props.id, { output_a: void 0 });
        }
        return;
    }
    if (input_a.value != undefined) {
        if (input_a.value != input_b) {
            updateNodeData(props.id, { output_a: void 0 });
            color.value = 'red';
        } else {
            updateNodeData(props.id, { output_a: input_b });
        }
    } else {
        updateNodeData(props.id, { output_a: input_b });
    }
})

const rotate = ref(0);
const output_a_position = ref(Position.Top);
const input_a_position = ref(Position.Bottom);
const input_b_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_a_position);
    rotateFunction(input_a_position);
    rotateFunction(input_b_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.if-equal {
    width: 30px;
    height: 16px;
    display: flex;
    align-items: center;
}
</style>