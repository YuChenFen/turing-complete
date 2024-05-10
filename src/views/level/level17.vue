<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList"
        :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    存储一字节
                </header>
                <p>
                    当写入信号为高电平时，则写入的数据到存储器中，当读取信号为高电平时，则读取存储器中的数据。
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
    { id: '-2', position: { x: 200, y: 200 }, type: 'bit-input' },
    { id: '-3', position: { x: 400, y: 200 }, type: 'byte-input' },
    { id: '-4', position: { x: 200, y: 0 }, type: 'byte-output' },
]

const successDialogMessage = '关卡完成，解锁8位寄存器。';
const inputValueList = [];
const outputValueList = [];
let temp = 0;
for (let i = 1; i <= 100; i++) {
    let witch = Math.random() > 0.5 ? 1 : 0;
    let read = Math.random() > 0.5 ? 1 : 0;
    let value = Math.floor(Math.random() * 256);
    inputValueList.push([witch, read, value]);
    if (witch === 1) {
        temp = value;
    }
    if (read === 1) {
        outputValueList.push([temp])
    } else {
        outputValueList.push([0])
    }
}

const inputIdList = ['-1', '-2', '-3']
const outputIdList = ['-4']

const inputAndOutput = [
    {
        label: '写入',
        list: inputValueList,
        index: 0
    },
    {
        label: '读取',
        list: inputValueList,
        index: 1
    },
    {
        label: '值',
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
    '-1': '写入',
    '-2': '读取',
    '-3': '值',
    '-4': '输出',
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-switch', 'delay', 'bit-storage'];
const byteList = ['bit-to-byte', 'byte-to-bit', 'byte-switch'];
const toolsList = ['if-equal']
</script>
