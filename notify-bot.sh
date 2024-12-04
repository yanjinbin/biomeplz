#!/bin/bash

localIP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1)
username=$(git config user.name)
email=$(git config user.email)
webhook_url="https://open.feishu.cn/open-apis/bot/v2/hook/e4333dcd-3f6a-41b3-aff8-c957d4150c7a"
text_="接口文档更新, 已接入telegram和企业微信bot通知
@author: $username
@email:$email 启动了前台
请访问内网地址 http://$localIP:5173"

send_wechat_notifications() {
    local text="$1"
    local wechat_work_key="$2"

    # WeChat Work notification
    curl -s --location "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=$wechat_work_key" \
        --header 'Content-Type: application/json' \
        --data "{\"msgtype\": \"text\", \"text\": {\"content\": \"$text\"}}" > /dev/null
}

send_telegram_message() {
    local bot_token="$1"
    local chat_id="$2"
    local text="$3"

    curl --location "https://api.telegram.org/bot$bot_token/sendMessage" \
        --form "chat_id=$chat_id" \
        --form "text=$text"
}

# 调用函数
send_wechat_notifications "$text_" "9e7c41ef-9bd5-4fda-a7c9-ce3bebc973da"

# 调用函数
send_telegram_message "6890830724:AAFcd7kzA_80UJLKavDH0pGWR2uvkNcYq0s" "891829381" "$text_"
