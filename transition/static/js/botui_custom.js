var botui = new BotUI('botui-app'); // id of container


botui.message.bot({ // show first message
    delay: 0,
    content: 'はじめまして！！'
}).then(() => {
  botui.message.bot({ // second one
    delay: 500, // wait 1 sec.
    content: 'このチャットボットはBOTUIを使っています。'
  })
}).then(function() {
  botui.message.bot({
    delay: 1000, // wait 1 sec.
    content: 'Javascriptなので機械学習はできませんが、ユーザーの回答を元にアクションすることができます。'
  });
  nextmessage();
})


var nextmessage = function () {
  botui.message.bot({
    delay: 1500,
    content: '例えば・・・何か入力してみて下さい。'
}).then(function () {
    return botui.action.text({
　    delay: 1600,
      action: {
        placeholder: '入力'
      }
  })
}).then(function(res) {
  botui.message.bot({
    delay: 1800,
    content: 'オウム返しです。入力したのは、「' + res.value　+　'」ですね。'
  });
  lastmessage();
})
}

var lastmessage = function () {
  botui.message.bot({ // second one
    delay: 2000, // wait 1 sec.
    content: 'この技術はどうでしたか？'
}).then(() => {
  return botui.action.button({ // let the user perform an action
    delay: 2000,
    action: [
      {
        text: 'すばらしい！',
        value: 'good'
      },
      {
        text: 'ちょっと使えないかも',
        value: 'bad'
      }
    ]
  })
}).then(function(res){
    if(res.value == 'good') {
      botui.message.bot({
        delay: 3000,
        content: 'ありがとうございます！'
      })
    }else{
      botui.message.bot({
        delay: 3000,
        content: 'うわああああああああああああああ。悲しいです。'
      })
      houkai();
    }
})
}


function sleep(ms, func) {
  setTimeout(func, ms);
}

var houkai = function () {
  botui.message.bot({
      delay: 4000,
      content: 'さようなら。。'
    });

  sleep(5000, function() {
    $(".collapse").addClass("animate__animated animate__hinge");
  
  document.cookie = 'houkai=ON';
  });

}
