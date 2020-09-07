var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET users listing. */
router.post('/', function(req, res, next) {
  
  fs.readdir('data',(err, filelist)=>{
    let found = false;
    for(let i of  filelist){
      if(i == req.body.title){
        //파일이 존재한다는 알람띄우기
        res.redirect("/")
        found = true;
        break;
      }
    }
    if(!found){
      const file = {"title" : `${req.body.title}`,"content" : `${req.body.content}`, "date" : `${new Date()}`}
      fs.readdir('data',async (err, list)=>{
        list.sort();
        console.log(list);
          if(list.length == 0){
            file["order"] = "0";
            fs.writeFile(`data/${0}`, JSON.stringify(file), (err)=>{
              res.redirect("/")
            })
          }
          else{
            file["order"] = `${parseInt(list[list.length - 1]) + 1}`;
            fs.writeFile(`data/${parseInt(list[list.length - 1]) + 1}`, JSON.stringify(file), (err)=>{
          
              res.redirect("/")
            })
          }
        
    })
      
    }
  })
});

module.exports = router;
