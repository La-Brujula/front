
export default function useSocials(social, link) {
    
    try{
        let tmplink = link.replace("https://", "")
        tmplink = tmplink.split("?")[0]
        switch (social){
            case "imdb":
                return tmplink.split("/name/")[1].split("/")[0];
            case "facebook":
            case "instagram":
            case "twitter":
            case "tiktok":
            case "vimeo":
                return tmplink.split("/")[1]
            case "youtube":
                if(tmplink.includes("/channel/"))
                    return tmplink.split("/channel/")[1]
                else
                    return tmplink.split("/")[1]
            case "linkedin":
                return tmplink.split("/in/")[1].replace("/","")
            default:
                return link           
        }
    }catch (err){
        return link
    }
}
