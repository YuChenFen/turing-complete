<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList"
        :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    一位解码器
                </header>
                <p>
                    搭建一个可以在两个输出端间切换的电路。
                </p>
            </div>
        </template>
        <template #actual-output>
            <div>
                <p>实际输出1</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[0] === 0, green: item[0] === 1 }" style="text-align: center;">
                    {{ item[0] > 1 ? item[0] : '' }}
                </div>
            </div>
            <div>
                <p>实际输出2</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[1] === 0, green: item[1] === 1 }" style="text-align: center;">
                    {{ item[1] > 1 ? item[1] : '' }}
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
    { id: '-1', position: { x: 100, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 0, y: 0 }, type: 'bit-output' },
    { id: '-3', position: { x: 200, y: 0 }, type: 'bit-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [[0], [1]];
const outputValueList = [[1, 0], [0, 1]];

const inputIdList = ['-1']
const outputIdList = ['-2', '-3']

const inputAndOutput = [
    {
        label: '输入',
        list: inputValueList,
        index: 0
    },
    {
        label: '预期输出1',
        list: outputValueList,
        index: 0
    },
    {
        label: '预期输出2',
        list: outputValueList,
        index: 1
    }
]

const nodeLabel = {
    '-1': '输入',
    '-2': '输出1',
    '-3': '输出2'
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-switch', 'delay', 'bit-storage'];
const byteList = ['bit-to-byte', 'byte-to-bit', 'byte-switch'];
const toolsList = ['if-equal']
</script>
