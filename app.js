const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000
const axios = require("axios")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {

  if (req.body.events !== null){
    // handle for line webhook
    let reply_token = req.body.events[0].replyToken
    let events = req.body.events
    let UserID = events[0].source.userId
    // handle event type
    if (events[0].type == 'message')
    {
      let msg = req.body.events[0].message.text
      replymsg = handleCmd(msg).then(
        (response)=>{
          reply(reply_token,response)
        }
      )
    }
    else if (events[0].type == 'postback'){
      let command = events[0].postback.data.split(':')[0]
      console.log(command)
      if (command == "sub") {
        events[0].postback.data = events[0].postback.data.split(':')[1]
        userSubscribe(events[0]).then(
          (response) => {
            console.log('node-red: '+response)
            let replymsg = {
              messages: [{
                type: "text",
                text: response
              }]
            }
            reply(reply_token,replymsg)
          }
        )
      }

    }
  }
  res.sendStatus(200)
})
app.listen(port)

async function handleCmd(cmd){
  if (cmd == "subscribe"){
    let card = await getCardFromAllDevice()
    return card
  }
}

async function userSubscribe(events) {
  var detailUser = {
    UserID: events.source.userId,
    location:events.postback.data.split(',')[0],
    level:events.postback.data.split(',')[1]
  };
  let response
  try{
    response = await axios.post('http://54.169.105.27:1880/subscribe',detailUser)
  } catch (err){
    console.log(err)
  }
  return response.data
  // request.post({
  //   headers: {'content-type' : 'application/json'},
  //   url:     'http://54.169.105.27:1880/subscribe',
  //   body:    JSON.stringify(detailUser)
  // }, (error, response, body) => {
  //   // console.log(body)
  // })
}

async function getDeviceAll(){
  let response
  try{
    response = await axios.get('http://54.169.105.27:1880/device')
  } catch (err){
    console.log(err)
  }
  return response.data
}
async function getDeviceSub(UserID){
  let response
  try{
    response = await axios.get('http://54.169.105.27:1880/usersub')
  } catch (err){
    console.log(err)
  }
  return response.data
}

async function getCardFromAllDevice(){
  let body = {
    messages: [{
        type: 'template',
        altText: 'this is a carousel template',
        template: {
          type: 'carousel',
          imageAspectRatio: 'rectangle',
          imageSize: 'cover'
        }
      }]
  }
  let column = []
  var device = await getDeviceAll()
  device.forEach(element => {
    let card = {
      thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
      imageBackgroundColor: '#FFFFFF',
      title: 'ลาดกระบัง',
      text: 'เลือกระดับการแจ้งเตือน',
      actions: [
        {
          type: 'postback',
          label: 'ปานกลาง',
          data: 'ladkrabang,1',
          displayText: 'ปานกลาง'
        },
        {
          type: 'postback',
          label: 'เริ่มมีผลต่อสุขภาพ',
          data: 'ladkrabang,2',
          displayText: 'เริ่มมีผลต่อสุขภาพ'
        },
        {
          type: 'postback',
          label: 'อันตรายต่อสุขภาพ',
          data: 'ladkabang,3',
          displayText: 'อันตรายต่อสุขภาพ'
        },
      ]
    }
    card.title = element.deviceName
    for (let i=0;i<3;i++)
      card.actions[i].data = 'sub:'+element.deviceName+','+(i+1)
    column.push(card)
  });
  body.messages[0].template.columns = column
  return body
}

function reply(reply_token,msg) {
  msg.replyToken = reply_token
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {mZKFJMNWSDBYmwv2/Vo3B4RBqt4rxrV61+uHhtlaUrRgsFuExGL4UjqyL/osApnb4gQLABecLaWW+PmT6P7o/AkXlpP/SYzvskNN3ujFIvY+FTTcQ7LxWje+xCHgRxABq1mtHcwPxzui/4+yc8K5+AdB04t89/1O/w1cDnyilFU=}'
  }
  request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: JSON.stringify(msg)
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
  });
}
