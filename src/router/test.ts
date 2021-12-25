//避免重复
let registerRouteFresh = true // 定义标识，记录路由是否添加

//需要在tsconfig文件下添加类型定义vite/client
const modulesRoutes = import.meta.glob("/src/views/**/*.vue");

//test

let data = JSON.stringify([
  {
    path: '/admin',
    name: 'admin',
    redirect:null,
    component: 'views/admin.vue'
  }
])

let notFound =  {
  path: "/:catchAll(.*)", // 匹配所有路由
  name: "404",
  redirect:null,
  component: 'views/404/index.vue'
}
//end



// 路由守卫
export const beforeEach = function(router:any){

  router.beforeEach(async (to:any, from:any, next:any) => {
    //路由数据，正常情况通过接口获取
    let res =JSON.parse(data)
    //添加404页面
    res.push(notFound)
    // 整理后台数据，转换为添加路由的格式
    let arr = [] as any;
    res.filter((value:any) => {
       // 子路由数据格式处理
      let child = [] as any 
      if (value.children && value.children.length) {
        value.children.filter((val:any) => {
          child.push({
            name: val.routeName,
            path: val.path,
            component: modulesRoutes[`/src/${val.component}`]// 开发中遇到问题，不能使用纯变量，需要字符串拼接才可以，要不然同样的地址报错。
          })
        })
      }

      arr.push({
        name: value.name,
        redirect: value.redirect,
        path: value.path,
        component: modulesRoutes[`/src/${value.component}`],
        children: child
      })
    })


    if (registerRouteFresh) {
      arr.forEach((val:any) => {
        router.addRoute(val)
      })
      next({...to, replace: true})
      registerRouteFresh = false
    } else {
      next()
    }
  })
}