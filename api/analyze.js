// api/analyze.js
import Wappalyzer from 'wappalyzer'

export default async function handler(req, res) {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ error: 'Missing ?url parameter' })
  }

  const wappalyzer = new Wappalyzer()

  try {
    await wappalyzer.init()
    const site = await wappalyzer.open(url)
    const results = await site.analyze()
    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to analyze site' })
  } finally {
    await wappalyzer.destroy()
  }
}
