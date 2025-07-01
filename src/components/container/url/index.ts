export const containerRouter = [
  {
    url: "/form",
    title: "图书列表",
    children: [],
    icon: "el-icon-menu",
  },
  {
    url: "/upload",
    title: "上传文件",
    children: [],
    icon: "el-icon-sunny",
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
      },
      {
         url: '/json-editor',
        title: "JSON数据格式化"
      }
    ],
  },
  {
    url:"/map",
    title:"地图",
    icon:"el-icon-map",
    children:[]
  }
];
