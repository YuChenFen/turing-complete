<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    1位开关
                </header>
                <p>
                    当有多个元器件向同一个元器件输入不同信号时，会发生错误，这里使用开关来控制是否输入信号，同时引入一个组件来检测输入的两个信号是否冲突，如果输入两个信号冲突了，则不会输出信号。
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

const successDialogMessage = '关卡完成，解锁1位关和8位开关。';
const inputValueList = [[0, 0], [0, 1], [1, 0], [1, 1]];
const outputValueList = [[0], [1], [1], [0]];
const inputIdList = ['-1','-2']
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
    '-3': '输出',
}

const bitList = ['bit-not', 'bit-switch'];
const toolsList = ['if-equal']
</script>
