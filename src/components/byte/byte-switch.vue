<template>
    <div>
        <div class="byte-switch" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon v-show="!input_switch" name="byte-switch-off" style="width: 30px;height: 30px;"></svg-icon>
            <svg-icon v-show="input_switch" name="byte-switch-on" style="width: 30px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(50%, -50%);font-size: 0.5em;">
                8</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_a_position" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single"
            :position="input_a_position" />
        <Handle id="input_switch" type="target" :connectable-start="false" connectable="single"
            :position="input_switch_position" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_a = toRef(() => props.data.input_a)
const input_switch = toRef(() => props.data.input_switch)
watch(input_a, (input_a) => {
    if (input_a == void 0) {
        updateNodeData(props.id, { output_a: void 0 });
        return;
    }
    if (input_switch.value & 1) {
        updateNodeData(props.id, { output_a: input_a & 255 });
    }
})
watch(input_switch, (input_switch) => {
    if (input_switch == void 0) {
        updateNodeData(props.id, { output_a: void 0 });
        return;
    }
    if (input_switch & 1) {
        updateNodeData(props.id, { output_a: input_a.value & 255 });
    } else {
        updateNodeData(props.id, { output_a: void 0 });
    }
})

const rotate = ref(0);
const output_a_position = ref(Position.Top);
const input_a_position = ref(Position.Bottom);
const input_switch_position = ref(Position.Left);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_a_position);
    rotateFunction(input_a_position);
    rotateFunction(input_switch_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.byte-switch {
    width: 30px;
    height: 30px;
}
</style>