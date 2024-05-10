<template>
    <div>
        <div class="dec38" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="dec38" style="width: 100px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(40%, -50%) scale(0.8);font-size: 0.5em;">
                DEC</p>
            <p style="position: absolute;bottom: 2px;right: 1px;transform: scale(0.5);font-size: 0.5em;">
                1</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 15px);`" />
        <Handle id="output_b" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 25px);`" />
        <Handle id="output_c" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 35px);`" />
        <Handle id="output_d" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 45px);`" />
        <Handle id="output_e" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 55px);`" />
        <Handle id="output_f" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 65px);`" />
        <Handle id="output_g" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 75px);`" />
        <Handle id="output_h" type="source" :connectable-end="false" :position="output_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 85px);`" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single" :position="input_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 5px);`" />
        <Handle id="input_b" type="target" :connectable-start="false" connectable="single" :position="input_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 15px);`" />
        <Handle id="input_c" type="target" :connectable-start="false" connectable="single" :position="input_position"
            :style="`${output_position === Position.Top || output_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 25px);`" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_a = toRef(() => props.data.input_a);
const input_b = toRef(() => props.data.input_b);
const input_c = toRef(() => props.data.input_c);
function update() {
    let sum = (input_a.value ? (input_a.value & 1) : 0) + ((input_b.value ? (input_b.value & 1) : 0) << 1) + ((input_c.value ? (input_c.value & 1) : 0) << 2);
    let outputIdList = ['output_a', 'output_b', 'output_c', 'output_d', 'output_e', 'output_f', 'output_g', 'output_h']
    let outputValueList = {}
    console.log(sum);
    for (let i = 0; i < 8; i++) {
        if (i == sum) {
            outputValueList[outputIdList[i]] = 1
        } else {
            outputValueList[outputIdList[i]] = 0
        }
    }
    updateNodeData(props.id, { ...outputValueList })
}
watch(input_a, () => {
    update();
})
watch(input_b, () => {
    update();
})
watch(input_c, () => {
    update();
})

const rotate = ref(0);
const output_position = ref(Position.Top);
const input_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_position);
    rotateFunction(input_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.dec38 {
    width: 100px;
    height: 30px;
}
</style>