<script setup>
import { ref } from 'vue';
import useDragAndDrop from '../assets/js/useDnD'

const props = defineProps(['bitList', 'ioList', 'byteList', 'toolsList'])
const { onDragStart } = useDragAndDrop();

const bitListShow = ref(false);
const byteListShow = ref(false);
const ioListShow = ref(false);
const toolsListShow = ref(false);
const bitList = props.bitList || ['bit-high', 'bit-low', 'bit-not', 'bit-and', 'bit-nand', 'bit-or', 'bit-nor', 'bit-xor', 'bit-xnor', 'bit-three-and', 'bit-three-or', 'bit-switch', 'bit-add', 'delay', 'bit-storage', 'dec38'];
const byteList = props.byteList || ['byte-to-bit', 'bit-to-byte', 'byte-not', 'byte-or', 'byte-switch', 'byte-add', 'byte-storage'];
const ioList = props.ioList || ['bit-input', 'bit-output', 'byte-input', 'byte-output'];
const toolsList = props.toolsList || ['if-equal'];
</script>

<template>
    <aside style="position: fixed;right: 20px;top: 50px;width: 60px;">
        <div class="nodes">
            <div style="position: relative;" v-if="bitList.length != 0">
                <div class="list" @click="bitListShow = !bitListShow">1位</div>
                <div class="drag-list" v-show="bitListShow">
                    <div :draggable="true" v-for="item in bitList" :key="item" @dragstart="onDragStart($event, item)">
                        <svg-icon class="svg-icon" :name="item"></svg-icon>
                    </div>
                </div>
            </div>
            <div style="position: relative;" v-if="byteList.length != 0">
                <div class="list" @click="byteListShow = !byteListShow">8位</div>
                <div class="drag-list" v-show="byteListShow">
                    <div :draggable="true" v-for="item in byteList" :key="item" @dragstart="onDragStart($event, item)">
                        <svg-icon class="svg-icon" :name="item"></svg-icon>
                    </div>
                </div>
            </div>
            <div style="position: relative;" v-if="ioList.length != 0">
                <div class="list" @click="ioListShow = !ioListShow">IO</div>
                <div class="drag-list" v-show="ioListShow">
                    <div :draggable="true" v-for="item in ioList" :key="item" @dragstart="onDragStart($event, item)">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div style="position: relative;" v-if="toolsList.length != 0">
                <div class="list" @click="toolsListShow = !toolsListShow">工具</div>
                <div class="drag-list" v-show="toolsListShow">
                    <div :draggable="true" v-for="item in toolsList" :key="item" @dragstart="onDragStart($event, item)">
                        <svg-icon class="svg-icon" :name="item"></svg-icon>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.nodes {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
}

.nodes .list {
    background-color: bisque;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    text-align: center;
    line-height: 50px;
    user-select: none;
    cursor: pointer;
}

.drag-list {
    position: absolute;
    height: 50px;
    right: 60px;
    top: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 25px;
}

.svg-icon {
    width: 30px !important;
    height: 30px !important;
}
</style>