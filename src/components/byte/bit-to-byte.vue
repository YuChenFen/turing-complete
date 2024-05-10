<template>
    <div>
        <div class="bit-to-byte" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="bit-to-byte" style="width: 100px;height: 20px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -40%) scale(0.5);font-size: 0.5em;">
                集线器</p>
            <p style="position: absolute;bottom: -2px;left: 5px;transform: scale(0.5);font-size: 0.5em;">
                1</p>
            <Handle id="input_0" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 10%;" />
            <Handle id="input_1" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 20%;" />
            <Handle id="input_2" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 30%;" />
            <Handle id="input_3" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 40%;" />
            <Handle id="input_4" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 60%;" />
            <Handle id="input_5" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 70%;" />
            <Handle id="input_6" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 80%;" />
            <Handle id="input_7" type="target" :connectable-start="false" :position="Position.Bottom"
                style="left: 90%;" />
            <Handle id="output_a" type="source" :connectable-end="false" :position="Position.Top" />
        </div>
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { nextTick, ref, toRef, watch } from 'vue';

const { updateNodeData } = useVueFlow();

const props = defineProps(['id', 'data']);
const input_0 = toRef(() => props.data.input_0);
const input_1 = toRef(() => props.data.input_1);
const input_2 = toRef(() => props.data.input_2);
const input_3 = toRef(() => props.data.input_3);
const input_4 = toRef(() => props.data.input_4);
const input_5 = toRef(() => props.data.input_5);
const input_6 = toRef(() => props.data.input_6);
const input_7 = toRef(() => props.data.input_7);

function updataOutputA() {
    updateNodeData(props.id, {
        output_a:
            (input_0.value ? input_0.value : 0) + ((input_1.value ? input_1.value : 0) << 1) + ((input_2.value ? input_2.value : 0) << 2) + ((input_3.value ? input_3.value : 0) << 3) + ((input_4.value ? input_4.value : 0) << 4) + ((input_5.value ? input_5.value : 0) << 5) + ((input_6.value ? input_6.value : 0) << 6) + ((input_7.value ? input_7.value : 0) << 7)
    });
}

watch(input_0, () => {
    updataOutputA();
});
watch(input_1, () => {
    updataOutputA();
});
watch(input_2, () => {
    updataOutputA();
});
watch(input_3, () => {
    updataOutputA();
});
watch(input_4, () => {
    updataOutputA();
});
watch(input_5, () => {
    updataOutputA();
});
watch(input_6, () => {
    updataOutputA();
});
watch(input_7, () => {
    updataOutputA();
});

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
.bit-to-byte {
    width: 100px;
    height: 20px;
}
</style>