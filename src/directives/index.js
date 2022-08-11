export const imageError = {
  // 属性是指令的钩子函数
  // inserted 指令作用的dom元素插入文档之后会触发
  // dom 指令绑定的元素
  // options 指令相关的内容
  inserted: function(dom, options) {
    // dom onerror 事件
    // options.value 指的是指令绑定的值
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
