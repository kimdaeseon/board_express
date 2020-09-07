const { response } = require("../../app")

function getList(number){
    fetch('list',{
        method: 'GET',
    }).then((res)=>{
        return res.json();
    }).then((list)=>{
        let js;
        let string = "";
        let tags = "";
        let date;
        let jsDate;
        const listSize = list.length;
        if(listSize > 10){
            let fin = (list.length < (number + 1) * 10)? list.length : (number + 1) * 10;
            for(let i = 10 * number ; i < fin; i++){
                js = JSON.parse(list[i]);
                date = js.date.split(' ');
                jsDate = date[3] + '/' + date[1] + '/' + date[2]  + '  ' + date[4];
                string += `<tr><td class="numbers">${js.order}</td><td class="postTitle"><a href ="post/${js.title}" onclick="getPost('${js.titile}')">${js.title}</td><td>${jsDate}</td></tr>`
            }
        }
        else{
            for(let i of list){
                js = JSON.parse(i);
                date = js.date.split(' ');
                jsDate = date[3] + '/' + date[1] + '/' + date[2]  + '  ' + date[4];
                string += `<tr><td class="numbers">${js.order}</td><td class="postTitle"><a href ="post/${js.title}" onclick="getPost('${js.titile}')">${js.title}</td><td>${jsDate}</td></tr>`
            }
        }
        for(let i = 0 ; i < listSize/10; i++){
            tags += `<button onclick="getList(${i})" class ="btn">${i+1}</button>`
        }
        document.getElementById('listTarget').innerHTML = string;
        document.getElementById('tags').innerHTML = tags;
        return; 
    })
    
}

function getPost(postId){
    fetch(`post/${postId}`,{
        method: 'GET',
    }).then((res)=>{
        return res.json();
    }).then((list)=>{
        return; 
    })
}
