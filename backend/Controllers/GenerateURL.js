const {url} = require('../Models/BitsyURLViews');

const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphabet_length = Alphabet.length;
const url_length = process.env.LENGTH;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
const httpRegex = /^https?:\/\//;

const getNewURLSuffix = length => {
    let res = '';
    for(let i=0; i<length; i++) {
        res+=(Alphabet.charAt(Math.floor(Math.random()*alphabet_length)))
    }
    return res;
}

const GenerateURL = async (req, res) => {
    let old_url = String(req.body.url).trim();
    let new_url = String(req.body.suffix).trim();
    if(!urlRegex.test(old_url)) {
        return res.status(404).json({success: false, message: "Invalid URL!"});
    }
    if(!httpRegex.test(old_url)) {
        old_url = "https://"+old_url;
    }
    const check = await url.findOne({originalURL: old_url});
    if(check) {
        if(new_url != '') {
            new_url = encodeURIComponent(new_url);
            const check2 = await url.findOne({mappedURL: new_url});
            if(check2) {
                return res.status(404).json({success: false, message: "Suffix already exists!"});
            }
            else {
                try {
                    await url.findOneAndUpdate({originalURL: old_url}, {mappedURL: new_url});
                }
                catch(e) {
                    return res.status(500).json({success: false, message: "Error generating the URL"});
                }
                return res.json({success: true, url: new_url});
            }
        }
        else {
            return res.json({success: true, url: check.mappedURL});
        }
    }
    if(new_url != '') {
        const check2 = await url.findOne({mappedURL: new_url});
        if(check2) {
            return res.status(404).json({success: false, message: "Suffix already exists!"});
        }
    }
    else {
        new_url = getNewURLSuffix(url_length);
    }
    const url_obj = new url({
        mappedURL: new_url,
        originalURL: old_url
    });
    try {
        await url_obj.save();
    }
    catch(e) {
        return res.status(500).json({success: false});
    }
    return res.json({success: true, url: new_url});
}

const GetURL = async(req, res) => {
    const new_url = req.body.url;
    const check = await url.findOne({mappedURL: new_url});
    if(check) {
        return res.json({success: true, url: check.originalURL});
    }
    res.status(404).json({success: false, message: "URL not found!"});
}

module.exports = {
    GenerateURL,
    GetURL
}