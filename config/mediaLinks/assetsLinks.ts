import { HeadConfig } from "vitepress";

export default [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/background_docs.webp'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/background_docs.webp'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/airdrop.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/airdrop.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/bridge.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/bridge.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/platform.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/platform.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/staking.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/staking.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/techs.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/techs.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/tools.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/tools.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/light/walt.png'}],
        ['link', {rel: 'prefetch', href: '/assets/images/common/dark/walt.png'}],
        ['link', {
              rel: 'preload',
              href: '/assets/fonts/Mulish-Black.ttf',
              as: 'font',
              type: 'font/ttf',
              crossorigin: ''
            }
          ]
    ] as HeadConfig[];