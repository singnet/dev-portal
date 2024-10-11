import { HeadConfig } from "vitepress";

type link = ['link', {
  rel: string,
  href: string,
  as?: string,
  type?: string,
  crossorigin?: string
}]

const themes = ['dark', 'light']

const themedImages = [
  "background_docs.svg",
  "airdrop.webp",
  "bridge.webp",
  "platform.webp",
  "staking.webp",
  "techs.webp",
  "tools.webp",
  "walt.webp"
];

const fonts = [
  "Mulish-Light.ttf",
  "Mulish-Regular.ttf",
  "Mulish-Medium.ttf",
  "Mulish-Bold.ttf",
  "Mulish-ExtraBold.ttf"
]

const formThemedImageLinks = () => {
  let themedImagesLinks: link[] = [];
  themedImages.forEach(themedImage => {
    themes.forEach(theme => {
      themedImagesLinks.push(
        ['link', { rel: 'preload', href: `/assets/images/common/${theme}/${themedImage}` }]
      );
    })
  })

  return themedImagesLinks;
}

const formFontsLinks = () => {
  let fontsLinks: link[] = [];
  fonts.forEach(font => {
    fontsLinks.push(
      ['link', {
        rel: 'preconnect',
        href: `/assets/fonts/${font}`,
        as: 'font',
        type: 'font/ttf',
        crossorigin: ''
      }
  ]
      );
  })

  return fontsLinks;
}

export default [
    ...formThemedImageLinks(),
    ...formFontsLinks(),
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', {rel: 'preload', href: '/assets/images/common/feedback.webp'}],
] as HeadConfig[];