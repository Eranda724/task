const ContentBlock = require('../models/ContentBlock');

// GET /api/content (public — used by the live site)
async function getContent(req, res) {
    try {
        const blocks = await ContentBlock.find();
        const content = {};
        blocks.forEach((b) => {
            content[b.key] = b.value;
        });
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: 'Could not load content' });
    }
}

// PATCH /api/admin/content (admin — saves one or more fields)
async function updateContent(req, res) {
    try {
        const updates = req.body; // e.g. { heroTitle: '...', heroIntro: '...' }
        const keys = Object.keys(updates);

        for (const key of keys) {
            await ContentBlock.findOneAndUpdate(
                { key },
                { value: updates[key] },
                { upsert: true }
            );
        }

        res.json({ message: 'Content updated' });
    } catch (err) {
        res.status(500).json({ error: 'Could not update content' });
    }
}

module.exports = { getContent, updateContent };