var container=document.getElementById("card-container");
var projOb=[];
var count=0;
localStorage.setItem("cart",projOb);
var lst=document.getElementById("list");


//COLOUSEL FUNCTION
$(document).ready(function(){
    $('#corousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
    });
});


// FUNCTION TO FETCH DATA FROM BACKEND
function getData()
 {
   var http=new XMLHttpRequest();
   http.onreadystatechange=function()
   {
     if(this.readyState===4)
     { if(this.status===200)
       {
         response=JSON.parse(http.responseText);
         console.log(response);
         for(var i=0;i<response.length;i++)
         {
                      //FOR CLOTHING PAGE
                      if(response[i].isAccessory===false&&response[i].photos.length>0&&title=="clothing")
                      {
                        cards=cardCreator(response[i]);
                      }
                      //FOR ACCESSORIES PAGE
                      else if(response[i].isAccessory===true&&response[i].photos.length>0&&title=="accessories")
                      {
                        cardCreator(response[i]);
                      }
                      //FOR DETAIL PAGE
                      else if(title=="product_detail")
                      {
                        var imageContainer=document.getElementById("imageContainer");
                        var descContainer=document.getElementById("DESC");
                        var mainBody=document.getElementById("mainBody");
                        
                        if(response[i].id==window.localStorage.getItem("ID"))
                        {
                          console.log( ( response[i].photos.length ) );
                          


                          var picture=document.createElement("img");
                          picture.setAttribute("src",response[i].preview);  
                          picture.setAttribute("width","auto");
                          picture.setAttribute("height","100%");
                          picture.id="imgContainerPic";
              
              

                          var nam=document.createElement("h1");
                          var txt=document.createTextNode(response[i].name);
                          nam.appendChild(txt);
                          nam.id="descName";

                          var descBrand=document.createElement("h5");
                          var brandTxt=document.createTextNode(response[i].brand);
                          descBrand.appendChild(brandTxt);
                          descBrand.id="descBrand";

                          var descPrice=document.createElement("h3")
                          var descAmount=document.createTextNode("Price : Rs" + response[i].price);
                          descPrice.appendChild(descAmount);
                          descPrice.id="descPrice";

                          var descrpt=document.createElement("h4")
                          var desc=document.createTextNode("Description")
                          descrpt.appendChild(desc);
                          descrpt.id="descrpt";

                          var descText=document.createElement("p");
                          var descTxt=document.createTextNode(response[i].description);
                          descText.appendChild(descTxt);
                          descText.id="descText";

                          var btnAdd=document.createElement("button");
                          var btnText=document.createTextNode("Add To Cart");
                          btnAdd.appendChild(btnText);
                          btnAdd.id="btnAdd";

                          

                          var previewContainer=document.createElement("div");
                          previewContainer.id="prvwContainer";

                          for(var j=0;j<response[i].photos.length;j++)
                          {
                            var prvwImg=document.createElement("img");
                            prvwImg.setAttribute("src", response[i].photos[j]);
                            prvwImg.className="prvwImg";
                            prvwImg.id=j;

                            var prvwImgHolder=document.createElement("div");
                            prvwImgHolder.className="imageHolder"

                            console.log(prvwImg);
                            prvwImgHolder.appendChild(prvwImg);
                            previewContainer.appendChild(prvwImgHolder);
                          }

                          imageContainer.appendChild(picture);
                          console.log(mainBody);
                          descContainer.appendChild(nam);
                          
                          descContainer.appendChild(descBrand);
                          descContainer.appendChild(descPrice);
                          descContainer.appendChild(descrpt);
                          descContainer.appendChild(descText);
                          descContainer.appendChild(btnAdd);
                          descContainer.appendChild(previewContainer);
                          
                          
                          // projOb.push(response[i]);
                          // document
                          document.body.addEventListener("click",function(response){
                            if(event.target.id="btnAdd")
                            {
                              count++;
                              localStorage.setItem("count",count)
                              document.getElementById("count").innerHTML=localStorage.getItem("count");
                            //   projOb=(localStorage.getItem("cart"));
                            //   console.log(typeof(projOb));
                            //   projOb=projOb.split("");
                            //   console.log(typeof(projOb));
                            //   projOb.push(parseInt(localStorage.getItem("ID")));
                            //   console.log(projOb);
                            //   localStorage.setItem("cart",projOb);
                            // //   projOb.push(localStorage.getItem("ID"));console.log(projOb);
                            // //   localStorage.setItem("cart",projOb);
                            // // }
                            }
                          })
            
            }

          }
          //FOR CHECKOUT PAGE
          else if(title=="checkout")
          {
            if(response[i].id==window.localStorage.getItem("ID"))
            { 
              
              var cartList=document.createElement("ul")
              lst.appendChild(cartList);

            var listElement=document.createElement("li");
            var listvalue=document.createTextNode("NAME : "+response[i].name);
            listElement.id="listElement";

            var listPrice=document.createElement("li");
            var listAmount=document.createTextNode("Price : "+response[i].price);
            listPrice.id="listPrice";
            listPrice.appendChild(listAmount);

            listElement.appendChild(listvalue);
            cartList.appendChild(listElement);
            cartList.appendChild(listPrice);
            }
            

          }
         }
       }
       else
       {
         console.log("CALL FAILED")
       }
     }
 
    }
   http.open('GET',"https://5d76bf96515d1a0014085cf9.mockapi.io/product",true);
   http.send();
}

//FUNCTION TO CREATE CARDS
  function cardCreator(response)

{
  card=document.createElement("div");
  card.className="card";
  card.id=response.id;

  
  
  var pic=document.createElement("img")
  pic.setAttribute("src",response.preview);
  pic.setAttribute("width","100%");
  pic.className="pic";

  card.appendChild(pic);
  

  var dataContainer=document.createElement("div");
  dataContainer.className="dataContainer";

  card.appendChild(dataContainer);

  var name=document.createElement("h3")
  var nm=document.createTextNode(response.name)
  name.className="name";
  name.appendChild(nm);

  var brand=document.createElement('h5')
  var brandName=document.createTextNode(response.brand);
  brand.className="brand";
  brand.appendChild(brandName);

  var price=document.createElement('a');
  var amount=document.createTextNode("Price : Rs" + response.price);
  price.className="price";  
  price.appendChild(amount);

   dataContainer.appendChild(name);
   dataContainer.appendChild(brand);
   dataContainer.appendChild(price);
  var btn=document.createElement("button");
  var view=document.createTextNode("VIEW ITEM");
  btn.appendChild(view);
  btn.id="view"
  dataContainer.appendChild(btn);
  console.log(card);
  container.appendChild(card);
}

//FUNCTION CALL
getData();
var count=0,countdown=0;
//ON CLICK LISTENER
document.body.addEventListener("click",function(event){

  if(event.target.className=="card")
  {
    window.localStorage.setItem("ID",event.target.id);
    console.log(window.localStorage.getItem("ID"));
    window.open("./product_detail.html","_self");
  }
  if(event.target.id=="view")
  {
    window.localStorage.setItem("ID",event.target.id);
    console.log(window.localStorage.getItem("ID"));
    window.open("./product_detail.html","_self");
  }
  else if(event.target.className=="prvwImg")
  {
    var img=document.getElementById("imgContainerPic");
    img.setAttribute("src",event.target.src);
    
    // alert(event.target.src);
  }
  else if(event.target.id=="btnPlace")
  {
    window.open("./success.html","_self")
  }
})


//HOVER EFFECT FOR CARD
// document.body.addEventListener("mouseover",function(event){
//   if(event.target.className=="pic")
//   {
//   }
// })
