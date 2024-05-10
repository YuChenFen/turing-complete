<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    延迟线
                </header>
                <p>
                    本关引进了一个新的元器件，它将输入的信号延迟1刻时间后输出，本关需要你搭建一个电路，将输入延迟2刻后输出。
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
    { id: '-2', position: { x: 0, y: 0 }, type: 'bit-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [[0], [1], [0], [0], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1]];
const outputValueList = [[0], [0], [0], [1], [0], [0], [1], [1], [0], [0], [0], [1], [1], [1]];
const inputIdList = ['-1']
const outputIdList = ['-2']

const inputAndOutput = [
    {
        label: '输入',
        list: inputValueList,
        index: 0
    },
    {
        label: '预期输出',
        list: outputValueList,
        index: 0
    }
]

const nodeLabel = {
    '-1': '输入',
    '-2': '输出',
}

const bitList = ['delay'];
</script>
