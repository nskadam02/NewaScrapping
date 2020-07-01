const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const nightmare = Nightmare({ show: true});
//const url = 'https://timesofindia.indiatimes.com/home/headlines';
scrapData=[]
len=0;
i=0;
//getImage();
function callgetImage(data)
{
  scrapData=data;
  len=data.length;
  scrapData.forEach(element => {
    element['imgPath']="";
  });

  // console.log(scrapData)
 getImage(i)
}
function getImage(i)
{ 
    console.log(scrapData[i].link)
     getDetail(scrapData[i].link,i).then((result)=>{
       console.log(result)
       if(result)
       {
         scrapData[i].imgPath=result.toString();
         console.log(scrapData[i])
         ++i
         if(i<len)
         {
         getImage(i);
         }
         else
         {
           return scrapData;
         }
       }
      
             
     }).catch((err)=>{
       console.log(err);
      getImage(i);
     })
   
}
function getDetail(url,i)
{
  console.log("in detail");
  return new Promise((resolve,reject)=>{
    nightmare
    .goto(url)
    .wait('body')   
    //.wait("._3lvqr") 
    .evaluate(() => document.querySelector('body').innerHTML)
    // .end()
    .then((response) => {
        resolve(PageData(response,i))
    })
    .catch((err) => {
        reject(err);
    })

  })
}
function PageData(html,i)             //actuall link scrapping
{
  console.log("in pagedata",i)
  const $ = cheerio.load(html);
 imgSrc=$('body').find("._2suu5 ._3v5m2>._2gIK- img ").attr('src');
 return imgSrc;
}
//.................................................
module.exports = {
  callgetImage
};