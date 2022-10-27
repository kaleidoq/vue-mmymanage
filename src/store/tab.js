import Cookies from "js-cookie"

export default {
    state: {
        isCollapse: false,
        // 面包屑的数据
        tabList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        }],
        // 菜单数据
        menu: []
    },
    getters: {},
    mutations: {
        // 修改菜单的展开或者收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 修改更新面包屑的数据
        selectMenu(state, val) {
            console.log(val)
            if (val.name !== 'home') {
                // 判断在列表中存不存在
                let index = state.tabList.findIndex(item => item.name === val.name)
                    // 如果不存在
                if (index === -1) {
                    state.tabList.push(val)
                    console.log('添加数据')
                }
            }
        },
        closeTag(state, index) {
            console.log(index)
                // const result = state.tabList.findIndex(val => index.name === val.name)
            state.tabList.splice(index, 1)
        },
        // 设置菜单menu的数据
        setMenu(state, val) {
            console.log(val)
            state.menu = val
            Cookies.set('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            // 判断cookie中是否有数据
            if (!Cookies.get('menu')) return
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
                // 组装动态路由信息
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () =>
                            import (`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () =>
                        import (`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, 'menuArray')
                // 添加路由信息
            menuArray.forEach(item => {
                router.addRoute('main', item)
            })
        }

    },
    actions: {},
    modules: {}
}