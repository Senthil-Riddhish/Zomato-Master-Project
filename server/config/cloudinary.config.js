const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name:'capstonemasterproject',
    api_key:589287972371588,
    api_secret:'hFotsYm82R0slKVVm9gfGdjy5M8'
});
module.exports = cloudinary;