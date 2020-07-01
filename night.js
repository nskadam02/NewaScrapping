
const express = require('express')

const app = express(); 
  
// Set EJS as templating engine 
app.set('view engine', 'ejs'); 


app.listen(8000, () => {
  console.log('Server listening to port 8000!')
})


const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const nightmare = Nightmare({ show: true});
const url = 'https://timesofindia.indiatimes.com/home/headlines';

data=[]
let U = require("./imgScrap.js");

// Request making using nightmare
nightmare
  .goto(url)
  .wait('body')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
.then(response => {
  data=(getData(response));
  data.forEach(element => {
    var n="https://timesofindia.indiatimes.com/home/headlines"+element.link;
    element.link=n
  })
  // console.log(data.length) 
  let answer= U.callgetImage(data);   //call function from imgScrap.js
  console.log(answer)
  
 
  // app.get('/', (req, res)=>{ 
  //   res.render('home', {data:data}); 
      
  //   }); 
})
.catch(err => {
  console.log(err);
});

// Parsing data using cheerio
let getData = html => {
  data1=[]
  const $ = cheerio.load(html);
  $('.headlines-list .news_card li').each((i, elem) => {
     data1.push({
      title : $(elem).find('span.w_tle').text(),
      link : $(elem).find('span.w_tle a').attr('href')
    });
  });
  //console.log(data.length,data)
  return data1;
}
// function getImage(len,data)
// {
//    console.log(len,data)

  
//      link=(data[0].link).toString();
//      getDetail(0,link).then((result)=>{
//        console.log(result);
//      })
   
// }
// function getDetail(i,link)
// {
//   console.log("in detail");
//   return new Promise((resolve,reject)=>{
//     nightmare
//     .goto('https://timesofindia.indiatimes.com/city/mumbai/bmc-reiterates-rs-1000-penalty-for-citizens-caught-without-face-mask/articleshow/76704532.cms')
//     .wait('body')    
//     .wait("._3lvqr") 
//     .evaluate(() => document.querySelector('body').innerHTML)
//     // .end()
//     .then((response) => {
//         resolve(PageData(response,i))
//     })
//     .catch((err) => {
//         reject(err);
//     })

//   })
// }
// function PageData(html,i)
// {
//   console.log("in pagedata")
//   const $ = cheerio.load(html);
//  imgSrc=$('body').find("section._2suu5 ._3v5m2>._2gIK- img").attr('src');
//  console.log(imgSrc);
//  return imgSrc;
// }