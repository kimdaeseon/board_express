var express = require('express');
var router = express.Router();
var fs = require('fs');
const { send } = require('process');

compareDate = (left, right) =>{
    const monthTable = {
        "Jan" : 1,
        "Feb" : 2,
        "Mar" : 3,
        "Apr" : 4,
        "May" : 5,
        "Jun" : 6,
        "Jul" : 7,
        "Aug" : 8,
        "Sep" : 9,
        "Oct" : 10,
        "Nov" : 11,
        "Dec" : 12
    }
    const indexOfData = {
        year : 3,
        month : 1,
        day : 2,
        time : 4
    }
    const leftDate = left.split(" ");
    const rightDate = right.split(" ");
    if(leftDate[indexOfData.year] > rightDate[indexOfData.year]) return -1;
    else if (leftDate[indexOfData.year] < rightDate[indexOfData.year]) return 1;
    else {
        if(monthTable[leftDate[indexOfData.month]] > monthTable[rightDate[indexOfData.month]]) return -1;
        else if (monthTable[leftDate[indexOfData.month]] <  monthTable[rightDate[indexOfData.month]]) return 1;
        else{
            if(leftDate[indexOfData.day] > rightDate[indexOfData.day]) return -1;
            else if (leftDate[indexOfData.day] < rightDate[indexOfData.day]) return 1;
            else{
                const leftTime = leftDate[indexOfData.time].split(":");
                const rightTime = rightDate[indexOfData.time].split(":");
                if(leftTime[0]>rightTime[0]) return -1;
                else if (leftTime[0]<rightTime[0]) return 1;
                else {
                    if(leftTime[1]>rightTime[1]) return -1;
                    else if (leftTime[1]<rightTime[1]) return 1;
                    else{
                        if(leftTime[2]>rightTime[2]) return -1;
                        else if (leftTime[2]<rightTime[2]) return 1;
                        else{
                            return 1;
                        }
                    }
                }
            }
        }
    }
}

/* GET home page. */
router.get('/', async (req, res, next)=> {
    let result = [];
    await fs.readdir('data',async (err, list)=>{
        for(let i of list){
            result.push(fs.readFileSync(`data/${i}`).toString())
        }
        result.sort((a,b)=>{
            return compareDate(JSON.parse(a).date, JSON.parse(b).date);
        })
        console.log(result)
        res.send(result);
    })

});

module.exports = router;
