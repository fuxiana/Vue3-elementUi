export const containerRouter= [
    {
        url:"/purchase",
        title:"采购",
        children:[],
        icon: 'el-icon-menu'
    },
    {
        url:'/ceshi',
        title:"测试组件",
        icon:'el-icon-grape',
        children:[
            {
                url:'/form',
                title:'表格',
                icon:'el-icon-location'
            }
        ]
    }
]