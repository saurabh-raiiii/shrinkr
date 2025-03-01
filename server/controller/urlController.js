import { isUrl } from 'check-valid-url';
import urlModel from "../models/urlModel.js";
import codeGenerator from '../models/uniqueCodeGenerator.js';

export const addUrl = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: "Please provide a valid URL" });
    }

    try {
        const filteredUrl = 'http://www.' + url.replace(/^(https?:\/\/)?(www\.)?/, '');
        // console.log(filteredUrl);
        const isValid = isUrl(filteredUrl);
        if (!isValid) {
            return res.status(400).json({ success: false, message: "Please provide a valid URL" });
        }

        // Check if the URL already exists in the database
        const existingUrl = await urlModel.findOne({ url: filteredUrl });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                url: `https://shrinkr-auv1.onrender.com/${existingUrl.sortedUrl}`,
                message: "URL shortened successfully"
            });
        }

        // Generate a unique short code
        let code;
        let isUnique = false;

        while (!isUnique) {
            code = codeGenerator();
            const urlData = await urlModel.findOne({ sortedUrl: code });
            if (!urlData) {
                isUnique = true;
            }
        }

        // Save the new short URL
        const newUrl = new urlModel({ url: filteredUrl, sortedUrl: code });
        await newUrl.save();

        return res.status(201).json({
            success: true,
            url: `https://shrinkr-auv1.onrender.com/${code}`,
            message: "URL shortened successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const openUrl = async (req, res) => {
    const { code } = req.params;
    try {
        // Find URL from DB using the sorted URL code
        const urlData = await urlModel.findOne({ sortedUrl: code });

        if (!urlData) {
            return res.status(404).json({ success: false, message: "URL not found" });
        }

        // Redirect to the original URL
        return res.status(302).redirect(urlData.url);

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
