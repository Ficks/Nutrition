<template>
    <div>
        signalr connect
    </div>
    </template>
<script>
export default {
  name: "Signalr",
  data() {
    return {
      value: "",
      showmsg: "222",
      proxy: {}
    };
  },
  mounted() {
    this.connectServer();
  },
  methods: {
    connectServer() {
      var $this = this;
      var conn = $.hubConnection("http://www.xyys.ltd/signalr");
      $this.proxy = conn.createHubProxy("chatHub");
      $this.receiveSystemMsg(); //注册接收系统消息
      $this.receiveMessageHistory(); //注册接收历史消息
      conn
        .start()
        .done(data => {
          $this.connect(); //调用服务端connect方法
        })
        .fail(data => {});
    },
    receiveSystemMsg() {
      //接收服务端消息，
      var $this = this;
      $this.proxy.on("receiveSystemMsg", data => {
        console.log(data);
      });
    },
    receiveMessageHistory() {
      //接收历史消息，
      var $this = this;
      $this.proxy.on("receiveMessageHistory", data => {
        console.log(data);
      });
    },
    sendMessage() {
      //发送消息，这个方法由按钮事件触发
      var $this = this;
      $this.proxy.invoke("sendMessage", $("#txtmessage").val()).done(msg => {});
    },
    connect() {
      //连接
      var $this = this;
      var userId = "用户id",
        token = "token",
        toid = "通讯对象id";
      $this.proxy
        .invoke("connect", { userId: userid, token: token, toId: toid })
        .done(msg => {});
    }
  }
};
</script>

    <style>
</style>