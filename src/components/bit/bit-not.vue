<template>
    <div>
        <div class="bit-not" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="bit-not" style="width: 30px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, 0%) scale(0.5);font-size: 0.5em;">
                NOT</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_a_position" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single"
            :position="input_a_position" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_a = toRef(() => props.data.input_a)
watch(input_a, (input_a) => {
    if (input_a == void 0) {
        updateNodeData(props.id, { output_a: void 0 });
        return;
    }
    updateNodeData(props.id, { output_a: input_a ? 0 : 1 });
})

const rotate = ref(0);
const output_a_position = ref(Position.Top);
const input_a_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_a_position);
    rotateFunction(input_a_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.bit-not {
    width: 30px;
    height: 30px;
}
</style>