// API's
export const API = "https://dountubeapi.herokuapp.com";
// export const API = "http://localhost:7000";

// for prepare the title url friendly
export const Prepairtitle = (title) =>{
    return title.split(' ')[0].replace(/\?/g, "").replace(/\|/g, "").replace(/"/g, "'").replace(/\*/g, "").replace(/\//g, "").replace(/\\/g, "").replace(/:/g, "-").replace(/</g, "").replace(/>/g, "").replace(/#/g, "").replace(/" "/g, "_");
}
