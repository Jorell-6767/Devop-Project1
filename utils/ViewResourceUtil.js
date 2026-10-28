const fs = require('fs').promises;
const path = require('path');

const RESOURCES_FILE = path.join('utils', 'resources.json');
const TEMPLATE_FILE = path.join('utils', 'resources.template.json');

async function viewResources(req, res) {
    try {
        let resources = [];
        try {
            const data = await fs.readFile(RESOURCES_FILE, 'utf8');
            resources = JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                const templateData = await fs.readFile(TEMPLATE_FILE, 'utf8');
                resources = JSON.parse(templateData);
            } else {
                throw err;
            }
        }
        return res.status(200).json(resources);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { viewResources };