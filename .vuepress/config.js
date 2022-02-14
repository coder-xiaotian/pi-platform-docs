module.exports = {
  base: './',
  dest: 'dist',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/en': {
      lang: 'en-US',
      title: 'pi-network',
      description: 'pi-network',
    },
    '/': {
      // 站点配置
      lang: 'zh-CN',
      title: 'pi-network',
      description: 'pi-network',
    },
  },

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/Pi.png',
    locales: {
      '/en': {
        selectLanguageName: 'English',
      },
      '/': {
        selectLanguageName: '简体中文',
      },
    },
  },
}