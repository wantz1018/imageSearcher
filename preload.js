/*
 * @Description: 
 * @Author: Wantz
 * @Email: wantz@foxmail.com
 * @Date: 2023-06-21 23:43:32
 * @LastEditTime: 2023-06-22 09:29:59
 */
utools.onPluginEnter(({ code, type, payload }) => {
    const keyword = payload;
    if (keyword === null || keyword == "") {
        return
    }
    var word = '';
    utools.setSubInput(({ text }) => {
        word = text;
    }, placeholder = '输入关键字搜索图片')
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            if (word.length > 0) {
                window.app._instance.ctx.search(word);
                window.app._instance.data['keyword'] = word;
                text = ''
            }
        } 
    })

})