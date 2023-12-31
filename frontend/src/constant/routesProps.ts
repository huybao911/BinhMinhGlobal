import React from "react";

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  keyRole?: string;
  auth?: boolean;
};

const routesProps: ROUTES[] = [
  //GUEST
  {
    name: "homePage",
    path: "/",
    component: React.lazy(() => import("../pages/guest/Guest")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "order",
    path: "/order",
    component: React.lazy(() => import("../pages/guest/Order")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "loaiSP",
    path: "/loaiSP",
    component: React.lazy(() => import("../pages/guest/LoaiSanPham")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "loaiSP1",
    path: "/loaiSP1/:id",
    component: React.lazy(() => import("../pages/guest/LoaiSanPham1")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "loaiSP2",
    path: "/loaiSP2/:id",
    component: React.lazy(() => import("../pages/guest/LoaiSanPham2")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "chitietloaiSP",
    path: "/chitietloaiSP/:id",
    component: React.lazy(() => import("../pages/guest/DetailSanPham")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "chienlogin",
    path: "/chienlogin",
    component: React.lazy(() => import("../pages/auth/Login")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "newCart",
    path: "/cart",
    component: React.lazy(() => import("../pages/guest/Cart")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "chinh-sach-thanh-toan",
    path: "/chinh-sach-thanh-toan",
    component: React.lazy(() => import("../pages/guest/ChinhSachThanhToan")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "chinh-sach-giao-hang",
    path: "/chinh-sach-giao-hang",
    component: React.lazy(() => import("../pages/guest/ChinhSachGiaoHang")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "chinh-sach-bao-hanh",
    path: "/chinh-sach-bao-hanh",
    component: React.lazy(() => import("../pages/guest/ChinhSachBaoHanh")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "chinh-sach-bao-mat-thong-tin",
    path: "/chinh-sach-bao-mat-thong-tin",
    component: React.lazy(() => import("../pages/guest/ChinhSachBaoMat")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "tintuc",
    path: "/tintuc",
    component: React.lazy(() => import("../pages/guest/New")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "may-nuoc-nong-nang-luong-mat-troi-binh-minh-co-tot-khong",
    path: "/may-nuoc-nong-nang-luong-mat-troi-binh-minh-co-tot-khong",
    component: React.lazy(() => import("../pages/guest/New1")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "nhung-dieu-can-biet-khi-chon-mua-may-nuoc-nong-nang-luong-mat-troi",
    path: "/nhung-dieu-can-biet-khi-chon-mua-may-nuoc-nong-nang-luong-mat-troi",
    component: React.lazy(() => import("../pages/guest/New2")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "cach-de-nhan-biet-va-lua-chon-bon-nuoc-inox-binh-minh-chinh-hang",
    path: "/cach-de-nhan-biet-va-lua-chon-bon-nuoc-inox-binh-minh-chinh-hang",
    component: React.lazy(() => import("../pages/guest/New3")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  //ADMIN
  {
    name: "user",
    path: "/user",
    component: React.lazy(() => import("../pages/admin/User")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "city",
    path: "/city",
    component: React.lazy(() => import("../pages/admin/City")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "addcity",
    path: "/addcity",
    component: React.lazy(() => import("../pages/admin/AddCity")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "product",
    path: "/product",
    component: React.lazy(() => import("../pages/admin/Product")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "newproduct",
    path: "/newproduct",
    component: React.lazy(() => import("../pages/admin/NewProduct")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "typeproduct",
    path: "/typeproduct",
    component: React.lazy(() => import("../pages/admin/TypeProduct")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "newtypeproduct",
    path: "/newtypeproduct",
    component: React.lazy(() => import("../pages/admin/NewTypeProduct")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "orderCart",
    path: "/orderCart",
    component: React.lazy(() => import("../pages/admin/OrderCart")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
];

export default routesProps;