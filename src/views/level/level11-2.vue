<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    半加器
                </header>
                <p>
                    与普通加法一样，如果结果不能用一位数表示，则将进位数设为1。
                </p>
            </div>
        </template>
        <template #actual-output>
            <div>
                <p>实际总和</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="item[0] ? 'green' : 'red'">
                </div>
            </div>
            <div>
                <p>实际进位</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="item[1] ? 'green' : 'red'">
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
    { id: '-3', position: { x: 0, y: 0 }, type: 'bit-output' },
    { id: '-4', position: { x: 200, y: 0 }, type: 'bit-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [[0, 0], [0, 1], [1, 0], [1, 1]];
const outputValueList = [[0, 0], [1, 0], [1, 0], [0, 1]];
const inputIdList = ['-1', '-2']
const outputIdList = ['-3', '-4']

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
        label: '预期总和',
        list: outputValueList,
        index: 0
    },
    {
        label: '预期进位',
        list: outputValueList,
        index: 1
    }
]

const nodeLabel = {
    '-1': '输入1',
    '-2': '输入2',
    '-3': '总和',
    '-4': '进位',
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor'];
</script>
