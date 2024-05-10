<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList" :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    数据选择器
                </header>
                <p>
                    当选通输入为低电平时，将A路输入发送到输出端，否则将B路输入发送到输出端。
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
    { id: '-1', position: { x: -100, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 0, y: 200 }, type: 'byte-input' },
    { id: '-3', position: { x: 200, y: 200 }, type: 'byte-input' },
    { id: '-4', position: { x: 100, y: 0 }, type: 'byte-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [];
const outputValueList = [];
for (let i = 0; i < 127; i++) {
    let flag = Math.random() > 0.5 ? 1 : 0;
    let a = Math.floor(Math.random() * 127);
    let b = Math.floor(Math.random() * 127);
    inputValueList.push([flag, a, b]);
    if (flag === 1) {
        outputValueList.push([b]);
    } else {
        outputValueList.push([a]);
    }

}

const inputIdList = ['-1', '-2', '-3']
const outputIdList = ['-4']

const inputAndOutput = [
    {
        label: '选通输入',
        list: inputValueList,
        index: 0
    },
    {
        label: 'A',
        list: inputValueList,
        index: 1
    },
    {
        label: 'B',
        list: inputValueList,
        index: 2
    },
    {
        label: '预期输出',
        list: outputValueList,
        index: 0
    }
]

const nodeLabel = {
    '-1': '选通输入',
    '-2': 'A',
    '-3': 'B',
    '-4': '输出',
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-switch'];
const byteList = ['byte-to-bit', 'bit-to-byte', 'byte-switch'];
const toolsList = ['if-equal']
</script>
