<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList"
        :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    三位解码器
                </header>
                <p>
                    有三路输入，就有8种状态，搭建一个电路，输入一个信号时，选择一路输出激活。
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
            <div>
                <p>实际输出3</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[2] === 0, green: item[2] === 1 }" style="text-align: center;">
                    {{ item[2] > 1 ? item[2] : '' }}
                </div>
            </div>
            <div>
                <p>实际输出4</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[3] === 0, green: item[3] === 1 }" style="text-align: center;">
                    {{ item[3] > 1 ? item[3] : '' }}
                </div>
            </div>
            <div>
                <p>实际输出5</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[4] === 0, green: item[4] === 1 }" style="text-align: center;">
                    {{ item[4] > 1 ? item[4] : '' }}
                </div>
            </div>
            <div>
                <p>实际输出6</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[5] === 0, green: item[5] === 1 }" style="text-align: center;">
                    {{ item[5] > 1 ? item[5] : '' }}
                </div>
            </div>
            <div>
                <p>实际输出7</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[6] === 0, green: item[6] === 1 }" style="text-align: center;">
                    {{ item[6] > 1 ? item[6] : '' }}
                </div>
            </div>
            <div>
                <p>实际输出8</p>
                <div v-for="(item, index) in outputStore.output" :key="index" class="circle"
                    :class="{ red: item[7] === 0, green: item[7] === 1 }" style="text-align: center;">
                    {{ item[7] > 1 ? item[7] : '' }}
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
    { id: '-1', position: { x: 250, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 350, y: 200 }, type: 'bit-input' },
    { id: '-3', position: { x: 450, y: 200 }, type: 'bit-input' },
    { id: '-4', position: { x: 0, y: 0 }, type: 'bit-output' },
    { id: '-5', position: { x: 100, y: 0 }, type: 'bit-output' },
    { id: '-6', position: { x: 200, y: 0 }, type: 'bit-output' },
    { id: '-7', position: { x: 300, y: 0 }, type: 'bit-output' },
    { id: '-8', position: { x: 400, y: 0 }, type: 'bit-output' },
    { id: '-9', position: { x: 500, y: 0 }, type: 'bit-output' },
    { id: '-10', position: { x: 600, y: 0 }, type: 'bit-output' },
    { id: '-11', position: { x: 700, y: 0 }, type: 'bit-output' },
]

const successDialogMessage = '关卡完成，解锁3位解码器。';
const inputValueList = [];
const outputValueList = [];
for(let i = 0; i < 8; i++){
    let inputValue = []
    for(let j = 0; j < 3; j++){
        inputValue.push((i >> j) & 1);
        console.log(i, j, (i >> j) & 1);
    }
    let outputValue = []
    for(let j = 0; j < 8; j++){
        if(i == j){
            outputValue.push(1);
        }else{
            outputValue.push(0);
        }
    }
    inputValueList.push(inputValue);
    outputValueList.push(outputValue);
}
const inputIdList = ['-1', '-2', '-3']
const outputIdList = ['-4', '-5', '-6', '-7', '-8', '-9', '-10', '-11']

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
        label: '输入3',
        list: inputValueList,
        index: 2
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
    },
    {
        label: '预期输出3',
        list: outputValueList,
        index: 2
    },
    {
        label: '预期输出4',
        list: outputValueList,
        index: 3
    },
    {
        label: '预期输出5',
        list: outputValueList,
        index: 4
    },
    {
        label: '预期输出6',
        list: outputValueList,
        index: 5
    },
    {
        label: '预期输出7',
        list: outputValueList,
        index: 6
    },
    {
        label: '预期输出8',
        list: outputValueList,
        index: 7
    }
]

const nodeLabel = {
    '-1': '输入1',
    '-2': '输入2',
    '-3': '输入3',
    '-4': '输出1',
    '-5': '输出2',
    '-6': '输出3',
    '-7': '输出4',
    '-8': '输出5',
    '-9': '输出6',
    '-10': '输出7',
    '-11': '输出8'
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-three-and', 'bit-three-or', 'bit-switch', 'delay', 'bit-storage'];
const byteList = ['bit-to-byte', 'byte-to-bit', 'byte-switch'];
const toolsList = ['if-equal']
</script>
