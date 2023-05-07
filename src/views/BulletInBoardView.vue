<script setup>
import { ref, reactive } from 'vue'

const msgInput = ref('')
const danmuList = reactive([])

const sendDanmu = () => {
  if (msgInput.value.trim()) {
    danmuList.push({
      id: new Date().getTime(),
      text: msgInput.value.trim()
    })
    msgInput.value = ''
  }
}
</script>

<template>
  <div class="danmu-page">
    <div class="border-bg"></div>
    <div class="danmu-history-container">
      <h1 class="danmu-title">留言板</h1>
      <div v-for="danmu in danmuList" :key="danmu.id" class="danmu-item">
        {{ danmu.text }}
      </div>
    </div>
    <div class="send-box">
      <input
        type="text"
        class="msg-input"
        placeholder="说点什么..."
        v-model="msgInput"
        @keyup.enter="sendDanmu"
      />
      <button class="send-button" @click="sendDanmu">发送</button>
    </div>
  </div>
</template>

<style scoped>
.danmu-page+.home-btn{
 top:20px !important;
}
.border-bg{
  background-image: url('../assets/border_bg.png');
  width: 100%;
  height: calc(100% - 50px);
  background-size: 100% 100%;
  position: absolute;
}
.danmu-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.danmu-history-container {
  padding: 15px;
  padding-bottom: 60px; /* 新增 */
  /* background: #f0f3f4; */
  overflow-y: auto;
  height: calc(100vh - 50px); /* 新增 */
  flex: 1;
  overflow-y: auto;
  padding: 15px 10%;
}

.danmu-title{
  text-align: center;
    line-height: 5rem;
    color: #dea610;
    font-weight: 500;
    font-size: 2.2rem;
    font-family: '阿里妈妈数智体 VF Regular';
    letter-spacing: 3px;
}
.danmu-item {
  padding: 10px;
  /* text-align: center; */
  margin: 5px 0;
  /* border: 1px solid #ccc; */
  border-radius: 1rem;
  background-color: #ececec;
}

.send-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed; /* 新增 */
  bottom: 0; /* 新增 */
  left: 0; /* 新增 */
  right: 0; /* 新增 */
}

.msg-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 6px 12px;
}

.send-button {
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #249b49;
}
</style>
