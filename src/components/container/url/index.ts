export const containerRouter = [
  {
    url: "/purchase",
    title: "表格的增删改查",
    children: [],
    icon: "el-icon-menu",
  },
  {
    url: "/ceshi",
    title: "组件",
    icon: "el-icon-grape",
    children: [
      {
        url: "/qrcode",
        title: "生成二维码",
        // icon: "el-icon-location",
      },
      {
        url: '/bar-code',
        title: "生成条形码"
      }
    ],
  },
];
