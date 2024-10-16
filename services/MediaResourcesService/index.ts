import { HeadConfig } from "vitepress";

const PUBLIC_ROOT: string = "/";
const IMAGES_LOCATION: string = "/assets/images/common/";
const FONTS_LOCATION: string = "/assets/fonts/";

const enum MediaResourceTags {
    LINK = "link",
}

const enum MediaResourceTypes {
    FONT = "font",
    IMAGE = "image",
}

const enum MediaResourcesRelationships {
    ICON = "icon",
    PRELOAD = "preload",
    PRECONNECT = "preconnect",
}

const enum FontFormats {
    TTF = "font/ttf",
}

export default class MediaResourcesService {
    public static createFaviconLink(): HeadConfig {
        return [
            MediaResourceTags.LINK,
            {
                rel: MediaResourcesRelationships.ICON,
                href: `${PUBLIC_ROOT}favicon.ico`,
            },
        ];
    }

    public static createImagePreloadLink(imageFileName: string): HeadConfig {
        return [
            MediaResourceTags.LINK,
            {
                as: MediaResourceTypes.IMAGE,
                rel: MediaResourcesRelationships.PRELOAD,
                href: `${IMAGES_LOCATION}${imageFileName}`,
            },
        ];
    }

    public static createThemedImagePreloadLink(
        imageFileName: string,
        colorScheme: string
    ): HeadConfig {
        return [
            MediaResourceTags.LINK,
            {
                as: MediaResourceTypes.IMAGE,
                rel: MediaResourcesRelationships.PRELOAD,
                href: `${IMAGES_LOCATION}${colorScheme}/${imageFileName}`,
            },
        ];
    }

    public static createFontPreconnectLink(fontFileName: string): HeadConfig {
        return [
            MediaResourceTags.LINK,
            {
                type: FontFormats.TTF,
                as: MediaResourceTypes.FONT,
                rel: MediaResourcesRelationships.PRECONNECT,
                href: `${FONTS_LOCATION}${fontFileName}`,
            },
        ];
    }

    public static createImagesPreloadLinksList(
        imagesFilenamesList: string[]
    ): HeadConfig[] {
        return imagesFilenamesList.map((imageFileName) =>
            this.createImagePreloadLink(imageFileName)
        );
    }

    public static createThemedImagesPreloadLinksList(
        imagesFilenamesList: string[],
        colorScheme: string
    ): HeadConfig[] {
        return imagesFilenamesList.map((imageFileName) =>
            this.createThemedImagePreloadLink(imageFileName, colorScheme)
        );
    }

    public static createThemedImagesPreloadLinksListForColorSchemes(
        imagesFilenamesList: string[],
        colorSchemesList: string[]
    ): HeadConfig[] {
        return colorSchemesList
            .map((colorScheme) =>
                this.createThemedImagesPreloadLinksList(
                    imagesFilenamesList,
                    colorScheme
                )
            )
            .flat();
    }

    public static createFontsPreconnectLinksList(
        fontsFilenamesList: string[]
    ): HeadConfig[] {
        return fontsFilenamesList.map((fontFilename) =>
            this.createFontPreconnectLink(fontFilename)
        );
    }
}
