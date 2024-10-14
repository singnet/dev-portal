import { HeadConfig } from "vitepress";
import themesList from "../../assets/mediaResourcesData/themes.json";
import fontsList from "../../assets/mediaResourcesData/fonts.json";
import themedImagesList from "../../assets/mediaResourcesData/themedImages.json";
import MediaResourcesService from "../../services/MediaResourcesService";

export default [
    MediaResourcesService.createFaviconLink(),
    MediaResourcesService.createImagePreloadLink("feedback.webp"),
    ...MediaResourcesService.createFontsPreconnectLinksList(fontsList),
    ...MediaResourcesService.createThemedImagesPreloadLinksListForColorSchemes(themedImagesList, themesList),  
] as HeadConfig[];
