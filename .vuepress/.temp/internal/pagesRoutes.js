import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"前端 Javascript SDK"},["/index.html","/README.md"]],
  ["v-471be11a","/payments.html",{"title":"支付接口"},["/payments","/payments.md"]],
  ["v-e33e70dc","/platform_API.html",{"title":"平台 API"},["/platform_API","/platform_API.md"]],
  ["v-2d0a870d","/en/",{"title":"Frontend Javascript SDK"},["/en/index.html","/en/README.md"]],
  ["v-6e528842","/en/payments.html",{"title":"Payments"},["/en/payments","/en/payments.md"]],
  ["v-26815dfe","/en/platform_API.html",{"title":"Platform API"},["/en/platform_API","/en/platform_API.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
