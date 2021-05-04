// 声明一个插件
const headingPlug = {
    install(Vue, options) {
         // 使用render函数定义heading组件
         Vue.component('heading',{
            // 设置heading组件为函数式组件，如何实现？
            functional: true,
            props: {
                // 类型校验，必须是String,且必填
                level : {
                    type: String,
                    required: true
                },
                // 类型校验，必须是String,且默认为空
                title : {
                    type: String,
                    default: ''
                },
                icon: {
                    type: String
                }
            },
            render(h, context) {
                // 构造子元素
                // 子节点数组
                let children = []

                // 获取属性
                const {level, title, icon} = context.props;
                //icon 属性的处理逻辑
                if(icon) {
                    // <svg class="icon"><use xlink:href="#icon-A-25"></use></svg>                    
                    children.push(h(
                        'svg',
                        {class: 'icon'},
                        //子节点
                        [ h('use',{attrs:{'xlink:href': '#icon-'+icon}})]
                    ))
                }
                //拼接内容到子节点
                children = children.concat(context.children)//context.children来获取默认插槽的内容

                console.log("context.children",context.children)
                const vNode = h (
                    'h'+ level, //参数1，tagName
                    {attrs:{ title: title}},//参数2，data
                    children,//  参数3,子节点Vnode数组
                )
                console.log(vNode)
                return vNode
            }
        })
    }
}

// 如果window存在，并且widow上有Vue
// if( typeof window !== 'undefined' && Window.Vue){
    // 注册插件Vue.use（）
    window.Vue.use(headingPlug)
// }

