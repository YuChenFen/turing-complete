<template>
    <div>
        <div class="bit-add" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="bit-add" style="width: 30px;height: 16px;"></svg-icon>
        </div>
        <Handle id="output_sum" type="source" :connectable-end="false" :position="output_sum_position"
            :style="`${output_sum_position === Position.Top || output_sum_position === Position.Bottom ? 'left' : 'top'}: 10px;`" />
        <Handle id="output_carry" type="source" :connectable-end="false" :position="output_carry_position"
            :style="`${output_sum_position === Position.Top || output_sum_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 10px);`" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single" :position="input_a_position"
            :style="`${output_sum_position === Position.Top || output_sum_position === Position.Bottom ? 'left' : 'top'}: 5px;`" />
        <Handle id="input_b" type="target" :connectable-start="false" connectable="single"
            :position="input_b_position" />
        <Handle id="input_c" type="target" :connectable-start="false" connectable="single" :position="input_c_position"
            :style="`${output_sum_position === Position.Top || output_sum_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 5px);`" />
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
function update(){
    let sum = 0;
    let flag = false;
    if(input_a.value != void 0){
        flag = true;
        sum += input_a.value & 1;
    }
    if(input_b.value != void 0){
        flag = true;
        sum += input_b.value & 1;
    }
    if(input_c.value != void 0){
        flag = true;
        sum += input_c.value & 1;
    }
    if (flag) {
        updateNodeData(props.id, { output_sum: sum & 1 });
        updateNodeData(props.id, { output_carry: (sum >> 1) & 1 });
    }else{
        updateNodeData(props.id, { output_sum: void 0 });
        updateNodeData(props.id, { output_carry: void 0 });
    }
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
const output_sum_position = ref(Position.Top);
const output_carry_position = ref(Position.Top);
const input_a_position = ref(Position.Bottom);
const input_b_position = ref(Position.Bottom);
const input_c_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_sum_position);
    rotateFunction(output_carry_position);
    rotateFunction(input_a_position);
    rotateFunction(input_b_position);
    rotateFunction(input_c_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.bit-add {
    width: 30px;
    height: 16px;
    display: flex;
    align-items: center;
}
</style>