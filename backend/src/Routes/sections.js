import { Router } from 'express'
import Section from '../Models/section.js'

const SectionsRouter = Router()

// GET /api/sections → sidebar completo
SectionsRouter.get('/', async (req, res) => {
  try {
    const sections = await Section.find({}, 'title slug category order').sort({ order: 1 })
    res.json(sections)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// GET /api/sections/:slug → contenido de una sección
SectionsRouter.get('/:slug', async (req, res) => {
  try {
    const section = await Section.findOne({ slug: req.params.slug })
    if (!section) return res.status(404).json({ error: 'No encontrado' })
    res.json(section)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default SectionsRouter