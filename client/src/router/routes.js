const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: {
      path: "/trackback"
    },
    children: [
      { path: "/trackback", component: () => import("pages/Index.vue") },
      {
        path: "/my-own",
        component: () => import("pages/harvest/Index.vue"),
        children: [
          {
            path: "/",
            name: "my-own",
            component: () => import("pages/harvest/List.vue")
          },
          {
            path: "/my-own/harvest/new",
            name: "my-own-new",
            component: () => import("pages/harvest/New.vue")
          }
        ]
      },
      {
        path: "/product",
        component: () => import("pages/product/Index.vue"),
        children: [
          {
            path: "/",
            name: "product",
            component: () => import("pages/product/List.vue")
          },
          {
            path: "/product/new",
            name: "product-new",
            component: () => import("pages/product/New.vue")
          }
        ]
      },
      {
        path: "/process",
        component: () => import("pages/process/Index.vue"),
        children: [
          {
            path: "/",
            name: "process",
            component: () => import("pages/process/List.vue")
          },
          {
            path: "/process/new",
            name: "process-new",
            component: () => import("pages/process/New.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/signin",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "signin",
        component: () => import("src/pages/Signin.vue")
      }
    ]
  },
  {
    path: "/signup",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", name: "signup", component: () => import("pages/Signup.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "error",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
