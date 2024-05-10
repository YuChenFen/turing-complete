<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    1位取反器
                </header>
                <p>
                    当取反信号为高电平时，将输入信号取反后输出，当取反信号为低电平时，保持输入信号不变。
                </p>
            </div>
        </template>
        <template #actual-output>
            <div>
                <p>实际</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="item[0] ? 'green' : 'red'">
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
    { id: '-1', position: { x: 0, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 200, y: 200 }, type: 'bit-input' },
    { id: '-3', position: { x: 100, y: 0 }, type: 'bit-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [[0, 0], [0, 1], [1, 0], [1, 1]];
const outputValueList = [[0], [1], [1], [0]];
const inputIdList = ['-1', '-2']
const outputIdList = ['-3']

const inputAndOutput = [
    {
        label: '取反',
        list: inputValueList,
        index: 0
    },
    {
        label: '输入',
        list: inputValueList,
        index: 1
    },
    {
        label: '预期输出',
        list: outputValueList,
        index: 0
    }
]

const nodeLabel = {
    '-1': '取反',
    '-2': '输入',
    '-3': '输出',
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor'];
</script>
