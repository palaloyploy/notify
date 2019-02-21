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
        // messages: [{
        //     type: 'text',
        //     text: 'Hello'
        // },
        // {
        //     type: 'text',
        //     text: 'How are you?'
        // }]
        messages: [{
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
              "type": "carousel",
              "actions": [],
              "columns": [
                {
                  "thumbnailImageUrl": "http://postfiles8.naver.net/MjAxODAxMjRfMTg2/MDAxNTE2NzgwMDEyMTYw.5FIcKqzP0B5Cf3o0yd8DXX2lpI0WXQ4uEP6rSnOe0Pgg.oWHdoV_QXXes9SctFAz6Venn-mfxUlaQZapF9gyyhwMg.JPEG.destroyerx/spaghetti-1987454_1920.jpg?type=w2",
                  "title": "                     Pasta",
                  "text": "        Choose the menu below",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Tomato Pasta",
                      "text": "Tomato Pasta"
                    },
                    {
                      "type": "message",
                      "label": "Olive Pasta",
                      "text": "Olive Pasta"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://postfiles.pstatic.net/MjAxODAxMTJfMjgy/MDAxNTE1NzM5ODgyMzU2.uno8L7N4v3xk-16ormEE1RMZ2PEgS0olVXUYcMOhCY8g.elB-yyuOlN6-NnbejDQ9ru-kkf88YaxJUFst-3ssLisg.JPEG.destroyerx/pizza-2766487_1920.jpg?type=w2",
                  "title": "                     Pizza",
                  "text": "        Choose the menu below",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Super Supreme Pizza",
                      "text": "Super Supreme Pizza"
                    },
                    {
                      "type": "message",
                      "label": "Peperoni",
                      "text": "Peperoni"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://postfiles.pstatic.net/MjAxODAxMTJfMzEg/MDAxNTE1NzMxODE3Mjgw.rROrcD8PQYk_febepsveurYQveHdhx6ljWTyYWLyQmQg.WFflEpeSmkYHqbkwieaj2Kda2D8zuWjqbQrrO7jJwKQg.JPEG.destroyerx/sally's_brunch.jpg?type=w2",
                  "title": "                     Steak",
                  "text": "       Choose the menu below",
                  "actions": [
                    {
                      "type": "message",
                      "label": "T-Bone Steak",
                      "text": "T-Bone Steak"
                    },
                    {
                      "type": "message",
                      "label": "Ribeye Steak",
                      "text": "Ribeye Steak"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
                  "title": "Title",
                  "text": "Text",
                  "actions": [
                    {
                      "type": "message",
                      "label": "Action 1",
                      "text": "Action 1"
                    },
                    {
                      "type": "message",
                      "label": "Action 2",
                      "text": "Action 2"
                    },
                    {
                      "type": "message",
                      "label": "Action 3",
                      "text": "Action 3"
                    }
                  ]
                }
              ]
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