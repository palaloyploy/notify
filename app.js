const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {mZKFJMNWSDBYmwv2/Vo3B4RBqt4rxrV61+uHhtlaUrRgsFuExGL4UjqyL/osApnb4gQLABecLaWW+PmT6P7o/AkXlpP/SYzvskNN3ujFIvY+FTTcQ7LxWje+xCHgRxABq1mtHcwPxzui/4+yc8K5+AdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        },{
            type: 'template',
            altText: 'this is a buttons template',
            template: {
              type: 'buttons',
              actions: [
                {
                  type: 'message',
                  label: 'PM 6:00',
                  text: 'PM 6:00'
                },
                {
                  type: 'message',
                  label: 'PM 7:00',
                  text: 'PM 7:00'
                },
                {
                  type: 'message',
                  label: 'PM 8:00',
                  text: 'PM 8:00'
                },
                {
                  type: 'message',
                  label: 'PM 9:00',
                  text: 'PM 9:00'
                }
              ],
              thumbnailImageUrl: 'SPECIFY_YOUR_IMAGE_URL',
              title: 'Select the Reservation time',
              text: 'Last Order : PM 9:00'
            }
          }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}