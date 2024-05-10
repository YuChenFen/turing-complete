<template>
    <level-template :nodes="nodes" :success-dialog-message="successDialogMessage" :input-value-list="inputValueList"
        :input-id-list="inputIdList" :output-value-list="outputValueList" :output-id-list="outputIdList"
        :input-and-output="inputAndOutput" :node-label="nodeLabel" :bit-list="bitList" :tools-list="toolsList">
        <template #topic-card>
            <div class="user-select" style="padding: 20px;font-weight: 300;">
                <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                    优雅存储
                </header>
                <p>
                    当操作输入为高电平时，需要将新的值覆盖已经存储的数据，输出端需要始终输出当前存储器的值。
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
    { id: '-3', position: { x: 100, y: 0 }, type: 'bit-output' },
]

const successDialogMessage = '关卡完成，解锁一位寄存器。';
const inputValueList = [[1, 1], [1, 1], [1, 0], [1, 0], [0, 0], [0, 1], [1, 0], [1, 1], [1, 1], [0, 1], [0, 0], [1, 0], [1, 0]];
const outputValueList = [[0], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [0]];
const inputIdList = ['-1', '-2']
const outputIdList = ['-3']

const inputAndOutput = [
    {
        label: '操作',
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
    '-1': '操作',
    '-2': '值',
    '-3': '输出'
}

const bitList = ['bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-switch', 'delay'];
const toolsList = ['if-equal']
</script>
