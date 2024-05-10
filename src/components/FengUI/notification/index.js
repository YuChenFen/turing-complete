import Message from "./src/Message";
// import { App } from "vue";

// 注册消息组件
Message.install = (app) => {
    app.config.globalProperties.$FengMessage = Message;
}

export default Message