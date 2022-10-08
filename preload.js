/*
 * @Description: 
 * @Author: Wantz
 * @Email: wantz@foxmail.com
 * @Date: 2022-10-08 09:24:19
 * @LastEditTime: 2022-10-08 09:58:10
 */

utools.onPluginEnter(({ code, type, payload }) => {
    const keyword = payload;
    if (keyword === null || keyword.length === 0) { return }

    utools.setSubInput(({ text }) => {

    }, placeholder = '输入关键字搜索')

})