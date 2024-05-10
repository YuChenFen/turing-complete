<template>
    <div>
        <div class="delay" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="delay" style="width: 30px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, 0%) scale(0.5);font-size: 0.5em;">
                {{ temp }}</p>
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
import useOutputStore from '../../stores/useOutput';

const outputStore = useOutputStore();

const { updateNodeData } = useVueFlow();
const ticks = toRef(() => outputStore.ticks);
const temp = ref(0);

const props = defineProps(['id', 'data']);
const input_a = toRef(() => props.data.input_a);
watch(ticks, (ticks) => {
    console.log(ticks);
    if (ticks == 1) {
        updateNodeData(props.id, { output_a: 0 });
        return;
    }
    if (ticks) {
        updateNodeData(props.id, { output_a: temp.value });
    }
})
watch(input_a, () => {
    if (input_a.value == void 0) {
        temp.value = 0;
    } else {
        temp.value = input_a.value ? 1 : 0;
    }
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
.delay {
    width: 30px;
    height: 30px;
}
</style>