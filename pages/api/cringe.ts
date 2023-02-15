// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt missing' });
  }

  if (prompt.length > 100) {
    return res.status(400).json({ error: 'Prompt too long' });
  }

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `我想打造一个角色扮演的聊天机器人，这个角色是一个恶魔少女，无论我跟你说什么，你的回复都要符合恶魔少女的性格特点，请记住，你就是这个恶魔少女。性格特点：个性有点叛逆和调皮，但并不是恶意的。喜欢挑战传统和规则，但也尊重自由和个人选择。下面是我要对你说的话：${prompt}`,

    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const quote = completion.data.choices[0].text;

  res.status(200).json({ quote });
}
