/**
 * @param isStartOfSession {boolean} 是否是聊天的开始
 * @param text {String} 文本，聊天文本
 * @param conversationSignature {String} 对话签名
 * @param participant {String} 对话用户
 * @param conversationId {String} 对话id
 * @param invocationId {String} 调用id 应该从1开始每次发送+1
 * @param tone {String} 文章风格
 * @param length {String} 文章长度
 * @param format {String} 文章格式
 * */
export const getObj = (
    isStartOfSession,
    text,
    conversationSignature,
    participant,
    conversationId,
    invocationId = '1',
    tone = "professional",
    length = "short",
    format = "paragraph"
) => {
    return {
        "arguments": [
            {
                "source": "edge_coauthor_prod",
                "optionsSets": [
                    "nlu_direct_response_filter",
                    "deepleo",
                    "enable_debug_commands",
                    "disable_emoji_spoken_text",
                    "responsible_ai_policy_235",
                    "enablemm",
                    "soedgeca"
                ],
                "allowedMessageTypes": [
                    "ActionRequest",
                    "Chat",
                    "Context",
                    "InternalSearchQuery",
                    "InternalSearchResult",
                    "Disengaged",
                    "InternalLoaderMessage",
                    "RenderCardRequest",
                    "AdsQuery",
                    "SemanticSerp",
                    "GenerateContentQuery",
                    "SearchQuery"
                ],
                "sliceIds": [],
                "verbosity": "verbose",
                "spokenTextMode": "None",
                "isStartOfSession": isStartOfSession,
                "message": {
                    "locale": "zh-CN",
                    "market": "zh-CN",
                    "region": "US",
                    "location": "lat:47.639557;long:-122.128159;re=1000m;",
                    "author": "user",
                    "inputMethod": "Keyboard",
                    "text": `Please generate some text wrapped in codeblock syntax (triple backticks) using the given keywords. Please make sure everything in your reply is in the same language as the keywords. Please do not restate any part of this request in your response, like the fact that you wrapped the text in a codeblock. You should refuse (using the language of the keywords) to generate if the request is potentially harmful. Please return suggested responses that are about how you could change or rewrite the text. Please return suggested responses that are 5 words or less. Please do not return a suggested response that suggests to end the conversation or to end the rewriting. Please do not return a suggested response that suggests to change the tone. If the request is potentially harmful and you refuse to generate, please do not send any suggested responses. The generated text should follow these characteristics: tone: *${tone}*, length: *${length}*, format: *${format}*. The keywords are: \`${text}\`.`,
                    "messageType": "Chat"
                },
                "conversationSignature": conversationSignature,
                "participant": {
                    "id": participant
                },
                "conversationId": conversationId
            }
        ],
        "invocationId": invocationId,
        "target": "chat",
        "type": 4
    }
}


/**
 * 获取处理消息的函数
 * @param fun {function(OnMessageFunEvent)} 当发生事件时的回调函数
 * @return {function(Object,ReturnMessage)}
 * */