<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    与非门（NAND）
                </header>
                <p>
                    这关任是一个教程关卡，在这里你需要完成一个<strong>与非门</strong>电路，在这一个尽量牢记与非门的特性。
                </p>
                <p style="font-weight: 800;margin-left: 2em;">
                    1. 在左边可以查看输入和输出节点的信息
                </p>
                <p style="font-weight: 800;margin-left: 2em;">
                    2. 点击输入和输出节点可在左下角查看节点信息
                </p>
                <p style="font-weight: 800;margin-left: 2em;">
                    3. 新增工具栏的下一刻按钮
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
    { id: '1', position: { x: 100, y: 100 }, type: 'bit-nand' },
]

const successDialogMessage = '关卡完成，解锁了与非门电路。'
const inputValueList = [[0, 0], [0, 1], [1, 0], [1, 1]];
const outputValueList = [[1], [1], [1], [0]];
const inputIdList = ['-1', '-2']
const outputIdList = ['-3']

const inputAndOutput = [
    {
        label: '输入1',
        list: inputValueList,
        index: 0
    },
    {
        label: '输入2',
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
    '-1': '输入1',
    '-2': '输入2',
    '-3': '输出'
}
</script>
