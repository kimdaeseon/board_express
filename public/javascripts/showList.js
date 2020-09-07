const { response } = require("../../app")

function getList(){
    fetch('list',{
        method: 'GET',
    }).then((res)=>{
        return res.json();
    }).then((list)=>{
        let js;
        let string = "";
        let date;
        let jsDate;
        for(let i of list){
            js = JSON.parse(i);
            date = js.date.split(' ');
            jsDate = date[3] + '/' + date[1] + '/' + date[2]  + '  ' + date[4];
            string += `<tr><td class="numbers">0</td><td class="postTitle"><a href ="post/${js.title}" onclick="getPost('${js.titile}')">${js.title}</td><td>${jsDate}</td></tr>`
        }
        document.getElementById('listTarget').innerHTML = string;
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
