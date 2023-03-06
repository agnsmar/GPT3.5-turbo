import { Configuration, OpenAIApi } from "openai"
import prompt from "prompt"
import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)


const getResponse = async (messages) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.1
  })

  const response = completion.data.choices[0].message.content

  return response
}

const main = async () => {
  const messages = [{"role": "system", "content": "You are a helpful assistant."}]

  while (true) {
    const p = await prompt.get(['input'])
    if(p.input === "exit") {
      break
    }

    messages.push({"role": "user", "content": p.input})

    const chatbotResponse = await getResponse(messages)
    messages.push({"role": "assistant", "content": chatbotResponse})
    console.log("Chatbot:", chatbotResponse)

  }
}

main()
