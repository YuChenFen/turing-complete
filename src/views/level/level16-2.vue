<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList" :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    总线
                </header>
                <p>
                    本关有两个1位输入和两个8为输入，1位输入分别为源和目的，要将两位输入按源输入传输到目的输出。
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
    { id: '-1', position: { x: 0, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 200, y: 200 }, type: 'byte-input' },
    { id: '-3', position: { x: 400, y: 200 }, type: 'byte-input' },
    { id: '-4', position: { x: 600, y: 200 }, type: 'bit-input' },
    { id: '-5', position: { x: 200, y: 0 }, type: 'byte-output' },
    { id: '-6', position: { x: 400, y: 0 }, type: 'byte-output' },
]

const successDialogMessage = '关卡完成。';
const inputValueList = [];
const outputValueList = [];
for (let i = 1; i <= 50; i++) {
    let source = Math.random() > 0.5 ? 1 : 0;
    let target = Math.random() > 0.5 ? 1 : 0;
    let a = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    inputValueList.push([source, a, b, target]);
    if(source === 0){
        if(target === 0){
            outputValueList.push([a, 0]);
        }else{
            outputValueList.push([0, a]);
        }
    }else{
        if(target === 0){
            outputValueList.push([b, 0]);
        }else{
            outputValueList.push([0, b]);
        }
    }
}

const inputIdList = ['-1','-2','-3','-4']
const outputIdList = ['-5','-6']

const inputAndOutput = [
    {
        label: '源',
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
        label: '目的',
        list: inputValueList,
        index: 3
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
    '-1': '源',
    '-2': 'A',
    '-3': 'B',
    '-4': '目的',
    '-5': '输出1',
    '-6': '输出2',
}

const bitList = ['bit-not'];
const byteList = ['byte-switch'];
const toolsList = ['if-equal']
</script>
