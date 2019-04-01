const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000
const axios = require("axios")
// const myMsg = require('./message.js')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {

  if (req.body.events !== null) {
    // handle for line webhook
    let reply_token = req.body.events[0].replyToken
    let events = req.body.events
    let UserID = events[0].source.userId
    // handle event type
    if (events[0].type == 'message') {
      let msg = req.body.events[0].message.text
      replymsg = handleCmd(msg, UserID).then(
        (response) => {
          reply(reply_token, response)
        }
      )
    }
    else if (events[0].type == 'postback') {
      let command = events[0].postback.data.split(':')[0]
      console.log(command)
      if (command == "sub") {
        events[0].postback.data = events[0].postback.data.split(':')[1]
        userSubscribe(events[0]).then(
          (response) => {
            console.log('node-red: ' + response)
            let replymsg = {
              messages: [{
                type: "text",
                text: response
              }]
            }
            reply(reply_token, replymsg)
          }
        )
      }
      else if (command == "unsub") {
        events[0].postback.data = events[0].postback.data.split(':')[1]
        userUnSubscribe(events[0]).then(
          (response) => {
            console.log('node-red: ' + response)
            let replymsg = {
              messages: [{
                type: "text",
                text: response
              }]
            }
            reply(reply_token, replymsg)
          }
        )
      }
  }
  res.sendStatus(200)
  }
})


app.post('/notify',(req,res) => {
  var detail = req.body
  console.log(detail)

  if (detail !== undefined ) {
    noti = mes_notify(detail).then(
      (response)=>{
  
        multicast(req, response)

        }
      )
    }
    res.sendStatus(200)
  }) 
async function mes_notify(detail){
  let notify = {
    to: [],
    messages: [
      {
        type: 'text',
        text: 'Hello'
      }]
  }
  //console.log(detail.AQINOW)
  detail.user.forEach(element =>{
    notify.to.push(element.UserID)
    
  })
  if(detail.AQINOW >=51 && detail.AQINOW <=100 && detail.type == "AQINOW"){
    console.log(detail.AQINOW)

    notify.messages[0].text = "ขณะนี้ ค่าAQI ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQINOW+" ซึ่งมีค่าเกินมาตรฐาน"
  }
  else if(detail.AQINOW >=101 && detail.AQINOW <=200 && detail.type == "AQINOW"){

    console.log(element.AQINOW)
    notify.messages[0].text = "ขณะนี้ ค่าAQI ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQINOW+" ซึ่งมีเริ่มมีผลต่อสุขภาพ"
  }
  else if(detail.AQINOW >=201 && detail.type == "AQINOW"){
    console.log(detail.AQINOW)

    notify.messages[0].text = "ขณะนี้ ค่าAQI ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQINOW+" ซึ่งมีอันตรายต่อสุขภาพ"
  }
  if(detail.AQI1HR >=51 && detail.AQI1HR <=100 && detail.type == "AQI1HR"){

    notify.messages[0].text = "ค่าAQI ในอีก 1 ชั่วโมง ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQI1HR+" ซึ่งมีค่าเกินมาตรฐาน"
  }
  else if(detail.AQI1HR >=101 && detail.AQI1HR <=200 && detail.type == "AQI1HR"){

    notify.messages[0].text = "ค่าAQI ในอีก 1 ชั่วโมง ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQI1HR+" ซึ่งมีเริ่มมีผลต่อสุขภาพ"
  }
  else if(detail.AQI1HR >=201 && detail.type == "AQI1HR"){

    notify.messages[0].text = "ค่าAQI ในอีก 1 ชั่วโมง ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQI1HR+" ซึ่งมีอันตรายต่อสุขภาพ"
  }
  if(detail.AQI24HR >=51 && detail.AQI24HR <=100 && detail.type == "AQI24HR"){

    notify.messages[0].text = "ค่าAQI ในอีก 24 ชั่วโมง ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQI24HR+" ซึ่งมีค่าเกินมาตรฐาน"
  }
  else if(detail.AQI24HR >=101 && detail.AQI24HR <=200 && detail.type == "AQI24HR"){

    notify.messages[0].text = "ค่าAQI ในอีก 24 ชั่วโมง ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQI24HR+" ซึ่งมีเริ่มมีผลต่อสุขภาพ"
  }
  else if(detail.AQI24HR >=201 && detail.type == "AQI24HR"){

    notify.messages[0].text = "ค่าAQI ในอีก 24 ชั่วโมง ของพื้นที่ "+detail.location+"มีค่าเท่ากับ "+detail.AQI24HR+" ซึ่งมีอันตรายต่อสุขภาพ"
  }
  console.log(notify)
  return notify

}
const multicast = (res, msg) => {
let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {mZKFJMNWSDBYmwv2/Vo3B4RBqt4rxrV61+uHhtlaUrRgsFuExGL4UjqyL/osApnb4gQLABecLaWW+PmT6P7o/AkXlpP/SYzvskNN3ujFIvY+FTTcQ7LxWje+xCHgRxABq1mtHcwPxzui/4+yc8K5+AdB04t89/1O/w1cDnyilFU=}'
  }
request.post({
    uri: 'https://api.line.me/v2/bot/message/multicast',
    headers: headers,
    body: JSON.stringify(msg)
  }, (err, res, body) => {
    console.log(body)
    // console.log('status = ' + res.statusCode);
    console.log(body)
  });
}


app.listen(port)

async function handleCmd(cmd, UserID) {
  if (cmd == "subscribe") {
    let card = await getCardFromAllDevice()
    return card
  }
  else if (cmd == "unsubscribe") {
    let card = await getCardFromDeviceSub(UserID)
    // console.log(card)
    return card
  }
  else if (cmd == "check AQI") {
    let card = await getCardCheckAQI()
    // console.log(card)
    return card
  }

}

async function userSubscribe(events) {
  var detailUser = {
    UserID: events.source.userId,
    location: events.postback.data.split(',')[0],
    level: events.postback.data.split(',')[1]
  };
  let response
  try {
    response = await axios.post('http://54.169.105.27:1880/subscribe', detailUser)
  } catch (err) {
    console.log(err)
  }
  return response.data
}
async function userUnSubscribe(events) {
  var detailUser = {
    UserID: events.source.userId,
    location: events.postback.data.split(',')[0],
    level: events.postback.data.split(',')[1]
  };
  let response
  try {
    response = await axios.post('http://54.169.105.27:1880/unsubscribe', detailUser)
  } catch (err) {
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

async function geteAllDevice() {
  let response
  try {
    response = await axios.get('http://54.169.105.27:1880/device')
  } catch (err) {
    console.log(err)
  }
  return response.data
}
async function getDeviceSub(UserID) {
  let response
  try {
    response = await axios.get('http://54.169.105.27:1880/usersub', {
      params: {
        UserId: UserID
      }
    });
  } catch (err) {
    console.log(err)
  }
  return response.data
}

async function getCardFromAllDevice() {
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
  var device = await geteAllDevice()
  console.log(device)
  device.forEach(element => {
    let card = {
      // thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
      // imageBackgroundColor: '#FFFFFF',
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
    for (let i = 0; i < 3; i++)
      card.actions[i].data = 'sub:' + element.deviceName + ',' + (i + 1)
    column.push(card)
  });
  body.messages[0].template.columns = column
  console.log(body)
  return body
}

async function getCardFromDeviceSub(UserID) {
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
  var device = await getDeviceSub(UserID)
  // console.log(device)
  if (device.length == 0){
    let replymsg = {
      messages: [{
        type: "text",
        text: "ท่านยังไม่ได้ทำการกด subscribe เลือกพื้นที่ค่ะ"
      }]
    }
    return replymsg
  }
  else 
  {
    //console.log(device[0].location[0])
    device.forEach(element => {
    // console.log(element)
      var card = {
        // thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
        // imageBackgroundColor: '#FFFFFF',
        title: 'ลาดกระบัง',
        text: 'เลือกระดับการแจ้งเตือน',
        actions: [
          {
            type: 'postback',
            label: 'unsubscribe',
            data: 'ladkrabang,1',
            //displayText: 'unsubscribe'
          },
        ]
      }
      card.title = element.location
      card.actions[0].data = 'unsub:'+card.title+','+element.level
      if (element.level == "1")
        element.level = "ปานกลาง"
      else if (element.level == "2")
        element.level = "เริ่มมีผลต่อสุขภาพ"
      else if (element.level == "3")
        element.level = "อันตรายต่อสุขภาพ" 
      card.text = element.level 
      console.log(card.actions[0])
      column.push(card)
      // for (let i=0;i<3;i++)
      //   card.action[i].data = 'unsub:'+element.location+','+(i+1)

    });
    body.messages[0].template.columns = column
    return body
  }
}
function getCardCheckAQI(){
  let card = {  
      messages :[{
      type: 'flex',
      altText: 'Flex Message',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            hero: {
              type: 'image',
              url: 'https://www.dropbox.com/s/9wpe2niq73qf2e1/checknow.jpg',
              size: 'full',
              aspectRatio: '20:13',
              aspectMode: 'cover'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              spacing: 'sm',
              contents: [
                {
                  type: 'box',
                  layout: 'baseline',
                  contents: [
                    {
                      type: 'text',
                      text: "CHECK AQI NOW",
                      flex: 0,
                      size: 'md',
                      weight: 'bold',
                      wrap: true
                    },
                  ]
                }
              ]
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'Go to site',
                    uri: 'http://54.169.105.27:1880'
                  },
                  style: 'primary'
                }
              ]
            }
          }
        ]
      }
    }]
  }
  return card
}


function reply(reply_token, msg) {
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
    // console.log('status = ' + res.statusCode);
    console.log(body)
  });
}
