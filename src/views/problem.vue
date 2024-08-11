<template>
    <div style="height: 100vh;width: 100vw;overflow: hidden;" id="problem">
        <VueFlow v-model:nodes="nodes" v-model:edges="edges" :nodes-draggable="false" @node-click="onNodeClick"
            style="cursor: none!important;">
            <template #node-level="levelNodeProps">
                <level-node v-bind="levelNodeProps"></level-node>
            </template>
        </VueFlow>
        <div class="big-circle">
            <div ref="circle" class="circle"></div>
            <div ref="dot" class="dot"></div>
        </div>
    </div>
</template>

<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import levelNode from '../components/problem/level-node.vue';

const router = useRouter();
const left = window.innerWidth / 2;
const top = window.innerHeight / 2;
const circle = ref(void 0);
const dot = ref(void 0);

const nodes = ref([
    { id: '1', position: { x: (left - 75), y: (top - 35) }, type: 'level', label: '输入与输出', data: { to: 'level/1' } },
    { id: '2', position: { x: (left - 75), y: (top - 200) }, type: 'level', label: '与非门', data: { to: 'level/2' } },
    { id: '3', position: { x: (left - 75), y: (top - 355) }, type: 'level', label: '非门', data: { to: 'level/3' } },
    { id: '4-1', position: { x: (left - 285), y: (top - 510) }, type: 'level', label: '与门', data: { to: 'level/4-1' } },
    { id: '4-2', position: { x: (left - 75), y: (top - 510) }, type: 'level', label: '或非门', data: { to: 'level/4-2' } },
    { id: '4-3', position: { x: (left + 135), y: (top - 510) }, type: 'level', label: '或门', data: { to: 'level/4-3' } },
    { id: '5', position: { x: (left - 75), y: (top - 650) }, type: 'level', label: '高电平', data: { to: 'level/5' } },
    { id: '6', position: { x: (left - 75), y: (top - 800) }, type: 'level', label: '第二刻', data: { to: 'level/6' } },
    { id: '7', position: { x: (left - 75), y: (top - 950) }, type: 'level', label: '异或门', data: { to: 'level/7' } },
    { id: '8-1', position: { x: (left - 265), y: (top - 1100) }, type: 'level', label: '三路与门', data: { to: 'level/8-1' } },
    { id: '8-2', position: { x: (left + 115), y: (top - 1100) }, type: 'level', label: '三路或门', data: { to: 'level/8-2' } },
    { id: '9', position: { x: (left - 75), y: (top - 1250) }, type: 'level', label: '同或门', data: { to: 'level/9' } },
    { id: '10-1', position: { x: (left - 265), y: (top - 1400) }, type: 'level', label: '成对的麻烦', data: { to: 'level/10-1' } },
    { id: '10-2', position: { x: (left - 75), y: (top - 1400) }, type: 'level', label: '奇数个信号', data: { to: 'level/10-2' } },
    { id: '10-3', position: { x: (left - 455), y: (top - 1400) }, type: 'level', label: '二进制', data: { to: 'level/10-3' } },
    { id: '11-1', position: { x: (left - 265), y: (top - 1550) }, type: 'level', label: '信号计数', data: { to: 'level/11-1' } },
    { id: '11-2', position: { x: (left - 75), y: (top - 1550) }, type: 'level', label: '半加器', data: { to: 'level/11-2' } },
    { id: '11-3', position: { x: (left + 265), y: (top - 1550) }, type: 'level', label: '延迟线', data: { to: 'level/11-3' } },
    { id: '12-1', position: { x: (left - 265), y: (top - 1700) }, type: 'level', label: '加倍', data: { to: 'level/12-1' } },
    { id: '12-2', position: { x: (left - 75), y: (top - 1700) }, type: 'level', label: '全加器', data: { to: 'level/12-2' } },
    { id: '12-3', position: { x: (left + 265), y: (top - 1700) }, type: 'level', label: '奇变偶不变', data: { to: 'level/12-3' } },
    { id: '13-1', position: { x: (left + 105), y: (top - 1850) }, type: 'level', label: '1位开关', data: { to: 'level/13-1' } },
    { id: '13-2', position: { x: (left + 265), y: (top - 1850) }, type: 'level', label: '1位取反器', data: { to: 'level/13-2' } },
    { id: '14-1', position: { x: (left - 455), y: (top - 2000) }, type: 'level', label: '8位或', data: { to: 'level/14-1' } },
    { id: '14-2', position: { x: (left - 265), y: (top - 2000) }, type: 'level', label: '8位非', data: { to: 'level/14-2' } },
    { id: '14-3', position: { x: (left - 75), y: (top - 2000) }, type: 'level', label: '8位加法器', data: { to: 'level/14-3' } },
    { id: '15-1', position: { x: (left - 265), y: (top - 2150) }, type: 'level', label: '负数', data: { to: 'level/15-1' } },
    { id: '15-2', position: { x: (left + 105), y: (top - 2150) }, type: 'level', label: '数据选择器', data: { to: 'level/15-2' } },
    { id: '16-1', position: { x: (left - 455), y: (top - 2300) }, type: 'level', label: '相反数', data: { to: 'level/16-1' } },
    { id: '16-2', position: { x: (left + 105), y: (top - 2300) }, type: 'level', label: '总线', data: { to: 'level/16-2' } },
    { id: '16-3', position: { x: (left + 265), y: (top - 2300) }, type: 'level', label: '优雅存储', data: { to: 'level/16-3' } },
    { id: '17', position: { x: (left + 105), y: (top - 2450) }, type: 'level', label: '存储一字节', data: { to: 'level/17' } },
    { id: '18', position: { x: (left - 75), y: (top - 2600) }, type: 'level', label: '一位解码器', data: { to: 'level/18' } },
    { id: '19', position: { x: (left - 75), y: (top - 2750) }, type: 'level', label: '三位解码器', data: { to: 'level/19' } },
    { id: '20-1', position: { x: (left - 455), y: (top - 2900) }, type: 'level', label: '逻辑引擎', data: { to: 'level/20-1' } },
    { id: '20-2', position: { x: (left + 105), y: (top - 2900) }, type: 'level', label: '4字节寄存器', data: { to: 'level/20-2' } },
    { id: '20-3', position: { x: (left + 265), y: (top - 2900) }, type: 'level', label: '计数器', data: { to: 'level/20-3' } },
]);
const edgesOptions = {
    type: 'smoothstep'
}
const edges = ref([
    { id: 'e1-2', target: '1', source: '2', ...edgesOptions },
    { id: 'e2-3', target: '2', source: '3', ...edgesOptions },
    { id: 'e3-4-1', target: '3', source: '4-1', ...edgesOptions },
    { id: 'e3-4-2', target: '3', source: '4-2', ...edgesOptions },
    { id: 'e3-4-3', target: '3', source: '4-3', ...edgesOptions },
    { id: 'e4-1-5', target: '4-1', source: '5', ...edgesOptions },
    { id: 'e4-2-5', target: '4-2', source: '5', ...edgesOptions },
    { id: 'e4-3-5', target: '4-3', source: '5', ...edgesOptions },
    { id: 'e5-6', target: '5', source: '6', ...edgesOptions },
    { id: 'e6-7', target: '6', source: '7', ...edgesOptions },
    { id: 'e7-8-1', target: '7', source: '8-1', ...edgesOptions },
    { id: 'e7-8-2', target: '7', source: '8-2', ...edgesOptions },
    { id: 'e8-1-9', target: '8-1', source: '9', ...edgesOptions },
    { id: 'e8-2-9', target: '8-2', source: '9', ...edgesOptions },
    { id: 'e8-1-10-1', target: '8-1', source: '10-1', ...edgesOptions },
    { id: 'e8-1-10-3', target: '8-1', source: '10-3', ...edgesOptions },
    { id: 'e9-10-2', target: '9', source: '10-2', ...edgesOptions },
    { id: 'e10-1-11-1', target: '10-1', source: '11-1', ...edgesOptions },
    { id: 'e10-3-11-1', target: '10-3', source: '11-1', ...edgesOptions },
    { id: 'e10-2-11-2', target: '10-2', source: '11-2', ...edgesOptions },
    { id: 'e8-2-11-3', target: '8-2', source: '11-3', ...edgesOptions },
    { id: 'e11-1-12-1', target: '11-1', source: '12-1', ...edgesOptions },
    { id: 'e11-2-12-2', target: '11-2', source: '12-2', ...edgesOptions },
    { id: 'e11-3-12-3', target: '11-3', source: '12-3', ...edgesOptions },
    { id: 'e12-1-13-1', target: '12-1', source: '13-1', ...edgesOptions },
    { id: 'e12-3-13-2', target: '12-3', source: '13-2', ...edgesOptions },
    { id: 'e12-1-14-1', target: '12-1', source: '14-1', ...edgesOptions },
    { id: 'e12-1-14-2', target: '12-1', source: '14-2', ...edgesOptions },
    { id: 'e12-1-14-3', target: '12-1', source: '14-3', ...edgesOptions },
    { id: 'e12-2-14-3', target: '12-2', source: '14-3', ...edgesOptions },
    { id: 'e14-1-15-1', target: '14-1', source: '15-1', ...edgesOptions },
    { id: 'e14-1-15-1', target: '14-2', source: '15-1', ...edgesOptions },
    { id: 'e14-1-15-1', target: '14-3', source: '15-1', ...edgesOptions },
    { id: 'e14-2-15-2', target: '14-2', source: '15-2', ...edgesOptions },
    { id: 'e13-1-15-2', target: '13-1', source: '15-2', ...edgesOptions },
    { id: 'e13-2-15-2', target: '13-2', source: '15-2', ...edgesOptions },
    { id: 'e15-1-16-1', target: '15-1', source: '16-1', ...edgesOptions },
    { id: 'e15-2-16-2', target: '15-2', source: '16-2', ...edgesOptions },
    { id: 'e15-2-16-3', target: '15-2', source: '16-3', ...edgesOptions },
    { id: 'e16-2-17', target: '16-2', source: '17', ...edgesOptions },
    { id: 'e16-3-17', target: '16-3', source: '17', ...edgesOptions },
    { id: 'e17-18', target: '17', source: '18', ...edgesOptions },
    { id: 'e18-19', target: '18', source: '19', ...edgesOptions },
    { id: 'e16-1-20-1', target: '16-1', source: '20-1', ...edgesOptions },
    { id: 'e19-20-1', target: '19', source: '20-1', ...edgesOptions },
    { id: 'e17-20-2', target: '17', source: '20-2', ...edgesOptions },
    { id: 'e17-20-3', target: '17', source: '20-3', ...edgesOptions },
]);

function onNodeClick({ event, node }) {
    router.push(node.data.to);
}

let pointerX = 0
let pointerY = 0
let cursorSize = 50

function move(event) {
    pointerX = event.pageX
    pointerY = event.pageY;
    dot.value.style.transform = `translate3d(calc(-50% + ${pointerX}px), calc(-50% + ${pointerY}px), 0)`

    if (event.target.classList[0] === 'level-node') {
        circle.value.style.transform = `translate3d(${event.target.getBoundingClientRect().left}px, ${event.target.getBoundingClientRect().top}px, 0)`;
        circle.value.style.width = `${event.target.getBoundingClientRect().width}px`;
        circle.value.style.height = `${event.target.getBoundingClientRect().height}px`;
        circle.value.style.borderRadius = `5px`;
        circle.value.style.top = '0';
        circle.value.style.left = '0';
    } else {
        circle.value.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        circle.value.style.width = `${cursorSize}px`;
        circle.value.style.height = `${cursorSize}px`;
        circle.value.style.borderRadius = `50%`;
        circle.value.style.top = `-25px`;
        circle.value.style.left = `-25px`;
    }
}

function click() {
    circle.value.style.transform += ` scale(0.75)`;
    setTimeout(() => {
        circle.value.style.transform = circle.value.style.transform.replace(` scale(0.75)`, '')
    }, 35);
}

onMounted(() => {
    document.addEventListener("mousemove", move);
    document.addEventListener("click", click);
})
onBeforeUnmount(() => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("click", click);
})
</script>

<style scoped>
.big-circle .circle {
    position: fixed;
    top: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0);
    z-index: 9999;
    border-radius: 50%;
    transition: 500ms, transform 100ms;
    user-select: none;
    pointer-events: none;
    -webkit-backdrop-filter: invert(0.85) grayscale(1);
    backdrop-filter: invert(0.85) grayscale(1);
}

.big-circle .dot {
    position: fixed;
    box-sizing: border-box;
    width: 6px;
    height: 6px;
    top: 0px;
    left: 0px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0);
    user-select: none;
    pointer-events: none;
    transition: 250ms, transform 75ms;
    -webkit-backdrop-filter: invert(0.85) grayscale(1);
    backdrop-filter: invert(0.85) grayscale(1);
}

#problem :deep(.vue-flow__pane.draggable),
#problem :deep(.vue-flow__node),
#problem :deep(.vue-flow__edge) {
    cursor: none !important;
}
</style>