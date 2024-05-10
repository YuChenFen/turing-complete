<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList"
        :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    计数器
                </header>
                <p>
                    搭建一个计数器，每一时钟刻，其存储的值会自动加一，此外，计数器还应有一个擦写功能，允许使用输入的数值覆盖计数器内存储的值。
                </p>
                <p>
                    本关有两个输入端，一个1位输入，用于切换步进模式(0)和擦写模式(1)，一个8位输入，用于输入要写入的数值。
                </p>
            </div>
        </template>
        <template #actual-output>
            <div>
                <p>实际输出</p>
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
    { id: '-1', position: { x: 0, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 200, y: 200 }, type: 'byte-input' },
    { id: '-3', position: { x: 200, y: 0 }, type: 'byte-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [];
const outputValueList = [];
let step = 0;
for (let i = 0; i < 200; i++) {
    let flag = Math.random() > 0.7 ? 1 : 0;
    let value = Math.floor(Math.random() * 256);
    inputValueList.push([flag, value])
    if (flag === 1) {
        outputValueList.push([step])
        step = value;
    } else {
        outputValueList.push([step++])
    }
}

const inputIdList = ['-1', '-2']
const outputIdList = ['-3']

const inputAndOutput = [
    {
        label: '模式',
        list: inputValueList,
        index: 0
    },
    {
        label: '值',
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
    '-1': '模式',
    '-2': '值',
    '-3': '输出'
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-switch', 'bit-low', 'bit-high','delay', 'bit-storage'];
const byteList = ['bit-to-byte', 'byte-to-bit', 'byte-switch', 'byte-add', 'byte-storage'];
const toolsList = ['if-equal']
</script>
