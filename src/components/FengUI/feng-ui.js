import textButton from './button/textButton.vue';
import iconButton from './button/iconButton.vue';
import tagButton from './button/tagButton.vue';
import twoCheckbox from './checkbox/twoCheckbox.vue';
import textSelect from './select/textSelect.vue';
import radio from './radio/radio.vue';
import navigationRadio from './radio/navigationRadio.vue';
import slider from './slider/slider.vue';
import toggleSwitch from './switch/toggleSwitch.vue';
import customizeDialog from './dialog/customizeDialog.vue';
import customizeTable from './table/customizeTable.vue';
import tree from './tree/tree.vue';
import textInput from './input/textInput.vue';
import textareaInput from './input/textareaInput.vue';
import OpenFilePicker from './input/openFilePicker.js';
import OpenDirectoryPicker from './input/openDirectoryPicker.js';
import itemMenu from './menu/itemMenu.vue';
import listMenu from './menu/listMenu.vue';
import verticalMenu from './menu/verticalMenu.vue';
import codeCard from './card/codeCard.vue';
import Message from "./notification/src/message.js";

import animationSlide from './animation/slide.vue';

import "./styles.css"

const FengUI = {
    install(app){
        app.component('feng-text-button', textButton);
        app.component('feng-icon-button', iconButton);
        app.component('feng-tag-button', tagButton);
        app.component('feng-two-checkbox', twoCheckbox);
        app.component('feng-text-select', textSelect);
        app.component('feng-radio', radio);
        app.component('feng-navigation-radio', navigationRadio);
        app.component('feng-slider', slider);
        app.component('feng-toggle-switch', toggleSwitch);
        app.component('feng-customize-dialog', customizeDialog);
        app.component('feng-customize-table', customizeTable);
        app.component('feng-tree', tree);
        app.component('feng-text-input', textInput);
        app.component('feng-textarea-input', textareaInput);
        app.component('feng-item-menu', itemMenu);
        app.component('feng-list-menu', listMenu);
        app.component('feng-vertical-menu', verticalMenu);
        app.component('feng-code-card', codeCard);
        app.component('feng-animation-slide', animationSlide);

        // 定义全局方法
        app.config.globalProperties.$FengMessage = Message;
        app.config.globalProperties.$FengOpenFilePicker = OpenFilePicker;
        app.config.globalProperties.$FengOpenDirectoryPicker = OpenDirectoryPicker;
    }
}

export default FengUI