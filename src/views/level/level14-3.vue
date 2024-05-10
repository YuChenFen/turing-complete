<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :byte-list="byteList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    8位加法器
                </header>
                <p>
                    将输入的八位数据进行加法运算后输出。
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
    { id: '-1', position: { x: 0, y: 200 }, type: 'byte-input' },
    { id: '-2', position: { x: 200, y: 200 }, type: 'byte-input' },
    { id: '-3', position: { x: 100, y: 0 }, type: 'byte-output' },
]

const successDialogMessage = '关卡完成，解锁8位加法器。';
const inputValueList = [];
const outputValueList = [];
for(let i = 0; i < 255; i++){
    let a = Math.floor(Math.random() * 127);
    let b = Math.floor(Math.random() * 127);
    inputValueList.push([a, b]);
    outputValueList.push([a + b]);
}

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
    '-3': '输出',
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-add'];
const byteList = ['byte-to-bit', 'bit-to-byte'];
</script>
