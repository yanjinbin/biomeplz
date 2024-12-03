import dayjs from 'dayjs'
import Mock from 'mockjs'

const { Random } = Mock

// 示例 http://mockjs.com/examples.html
export default [
    {
        url: '/mock/api/user/checkCode',
        method: 'get',
        response: () => {
            return {
                code: 0,
                data: Mock.mock({
                    'object|2': {
                        310000: '上海市',
                        320000: '江苏省',
                        330000: '浙江省',
                        340000: '安徽省',
                    },
                    'number|1-100.1-10': 1,
                    ts: Mock.mock('@date("yyyy-MM-dd")'),
                    text: Mock.mock('@paragraph(2)'),
                    word: Mock.mock('@word'),
                    chinese: Mock.mock('@cparagraph()'),
                    sentence: Mock.mock('@csentence()'),
                    Fname: Random.first(),
                    Lname: Random.last(),
                    email: Random.email(),
                    ip: Random.ip(),
                    city: Random.city(),
                    country: Random.county(),
                    guid: Random.guid(),
                    range: Random.range(3, 7),
                    int: Random.integer(60, 100),
                    float: Random.float(60, 100),
                    flag: Random.boolean(),
                    array: Mock.mock({
                        'array|1-10': ['Mock.js'],
                    }),
                    image: Random.image('200x100'),
                }),
                message: 'mock success',
                timestamp: dayjs().format(),
            }
        },
    },

    {
        url: '/mock/api/text',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
]
