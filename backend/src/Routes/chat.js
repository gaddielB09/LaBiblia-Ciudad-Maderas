import { Router } from 'express'

const ChatRouter = Router()

ChatRouter.post('/', async (req, res) => {
  // TODO: integrar Gemini con MongoDB
  res.json({ reply: 'Chat con IA próximamente' })
})

export default ChatRouter