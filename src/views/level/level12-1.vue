<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :byte-list="byteList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    加倍
                </header>
                <p>
                    这里输入和输出均是8位，需要你搭建一个将输入乘2的电路。
                </p>
            </div>
        </template>
        <template #actual-output>
            <div>
                <p>实际</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[0] === 0, green: item[0] === 1 }" style="text-align: center;">
                    {{ item[0] > 1 ? item[0] : '' }}
                </div>
            </div>
        </template>
    </level-template>
</template>

<script setup>
import { ref } from 'vue';
import useOutputStore from '../../stores/useOutput';
import levelTemplate from './level-template.vue';


const outputStore = useOutputStore();
outputStore.output = ref([])

const nodes = [
    { id: '-1', position: { x: 0, y: 200 }, type: 'byte-input' },
    { id: '-2', position: { x: 0, y: 0 }, type: 'byte-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [];
const outputValueList = [];
for (let i = 0; i < 128; i++) {
    inputValueList.push([i]);
    outputValueList.push([i * 2]);
}
const inputIdList = ['-1']
const outputIdList = ['-2']

const inputAndOutput = [
    {
        label: '输入',
        list: inputValueList,
        index: 0
    },
    {
        label: '输出',
        list: outputValueList,
        index: 0
    },
]

const nodeLabel = {
    '-1': '输入',
    '-2': '输出'
}

const byteList = ['byte-to-bit', 'bit-to-byte'];
</script>
