const request = require('request');

function search(keyword) {
    let url = 'https://cn.bing.com/images/vsasync?q=' + keyword
    let table = document.querySelector('table');
    table.innerHTML = ''
    request.responseType = 'json';
    fetch(url).then(response => response.json()).then(data => {
        imgs = data['results'];
        let index = 0
        let new_tr = document.createElement('tr')
        for (let i = 0; i < imgs.length; i++) {
            if (0 == index % 3) {
                new_tr = document.createElement('tr')
            }
            let new_td = document.createElement('td')
            let link = document.createElement('a');
            let new_img = document.createElement('img')
            new_img.src = imgs[i].imageUrl;
            link.href = imgs[i].imageUrl;
            link.download = imgs[i].imageUrl;
            link.appendChild(new_img);
            new_td.appendChild(link);
            new_tr.appendChild(new_td);
            if (2 == index % 3) {
                table.appendChild(new_tr)
            }
            index = index + 1;
        }
    })
}

utools.onPluginEnter(({ code, type, payload }) => {
    document.querySelector('.info').style.display = ''
    document.querySelector('table').innerHTML = ''
    const keyword = payload;
    if (keyword === null || keyword == "") {
        return
    }
    var word = '';
    utools.setSubInput(({ text }) => {
        if (text == null || text == "") {
            document.querySelector('.info').style.display = '';
            document.querySelector('table').innerHTML = ''
        }
        word = text;
    }, placeholder = '输入关键字搜索图片')
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            if (word.length > 0) {
                document.querySelector('.info').style.display = 'none';
                search(word);
            } else {
                document.querySelector('.info').style.display = ''
            }
        }

    })

})