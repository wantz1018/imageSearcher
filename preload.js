/*
 * @Description: 
 * @Author: Wantz
 * @Email: wantz@foxmail.com
 * @Date: 2022-10-08 09:24:19
 * @LastEditTime: 2022-10-08 16:53:40
 */
const { link } = require('fs');
const { stringify } = require('querystring');
const request = require('request');


function search(keyword) {
    let url = 'http://121.40.95.21/api/st.php?id=360&msg=' + keyword
    let img_urls = [];
    tds = document.querySelectorAll('td');
    const rex = /^https.*/;
    const rexUrl = /(https.*)$/;
    for (let i = 0; i < 9; i++) {
        if (tds[i].hasChildNodes()) {
            tds[i].removeChild(tds[i].firstChild);
        }
        request(url, function(error, response) {
            if (rex.test(response.body)) {
                img_urls.push(response.body);
                new_img = document.createElement('img');
                new_img.src = response.body;

            } else {
                img_urls.push(rexUrl.exec(response.body)[0]);
                new_img = document.createElement('img');
                new_img.src = rexUrl.exec(response.body)[0];
            }
            let link = document.createElement('a');
            link.download = rexUrl.exec(response.body)[0];
            link.href = rexUrl.exec(response.body)[0];
            link.appendChild(new_img)

            tds[i].appendChild(link)

        })
    }

}

utools.onPluginEnter(({ code, type, payload }) => {
    const keyword = payload;
    if (keyword === null || keyword == "") {
        return
    }

    var word = '';
    utools.setSubInput(({ text }) => {
        console.log(text);
        word = text;
    }, placeholder = '输入关键字搜索')
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            if (word.length > 0) {
                document.querySelector('.info').style.display = 'none';
                search(word);
                utools.subInputBlur()
            } else {
                document.querySelector('.info').style.display = ''
            }
        }

    })


})