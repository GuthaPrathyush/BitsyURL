const {url} = require('../Models/BitsyURLViews');

const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphabet_length = Alphabet.length;
const url_length = process.env.LENGTH;
const getNewURLSuffix = length => {
    let res = '';
    for(let i=0; i<length; i++) {
        res+=(Alphabet.charAt(Math.floor(Math.random()*alphabet_length)))
    }
    return res;
}

const GenerateURL = async (req, res) => {
    const old_url = req.body.url;
    const check = await url.findOne({originalURL: old_url});
    if(check) {
        return res.json({success: true, url: check.mappedURL});
    }
    const new_url = getNewURLSuffix(url_length);
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
    res.status(404).json({success: false, message: "URL not found"});
}

module.exports = {
    GenerateURL,
    GetURL
}