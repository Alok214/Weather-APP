let loc=document.getElementById("location");
let ticon=document.getElementById("temp-icon");
let tvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");


searchButton.addEventListener('click' , (e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});
 const getWeather=async(city)=>{
     try{
         const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1eee0ad8418272f52c4edf6771800bdf`,
         {mode:'cors'} );

         const weatherData= await response.json();
         console.log(weatherData);
         const{name}=weatherData;
         const{feels_like}=weatherData.main;
         const{id,main}=weatherData.weather[0];
         loc.textContent= name;
         climate.textContent=main;
         tvalue.textContent= Math.round(feels_like-273);
         if(id<300 && id>200){
            ticon.src="./img/thunderstorm.svg"
        }
        else if(id<400 && id>300){
            ticon.src="./img/drizzal.svg"
        }
        else if(id<600 && id>400){
            ticon.src="./img/rain.svg"
        }
        else if(id<700 && id>600){
            ticon.src="./img/snow.svg"
        }
        else if(id<700 && id>800){
            ticon.src="./img/clouds.svg"
        }
        else if(id==800){
            ticon.src="./img/sun.svg"
        }
        else if(id>800){
            ticon.src="./img/clears.svg"
        }
        

     }
     catch(error){
         alert("City Not Found")
     }
 };



window.addEventListener("load",()=>{
    let long;
    let lat;
    if(navigator.geolocation){
navigator.geolocation.getCurrentPosition((position)=>
{
    long=position.coords.longitude;
    lat=position.coords.latitude;
    const proxy="https://cors-anywhere.herokuapp.com/"

    const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1eee0ad8418272f52c4edf6771800bdf `
    fetch(api).then((response)=>{
        return response.json();
    })
    .then (data=>{
        const{name}=data;
        const{feels_like}=data.main;
        const{id,main}=data.weather[0];

        loc.textContent=name;
        climate.textContent=main;
        tvalue.textContent=Math.round(feels_like-273);

if(id<300 && id>200){
    ticon.src="./img/thunderstorm.svg"
}
else if(id<400 && id>300){
    ticon.src="./img/drizzal.svg"
}
else if(id<600 && id>400){
    ticon.src="./img/rain.svg"
}
else if(id<700 && id>600){
    ticon.src="./img/snow.svg"
}
else if(id<700 && id>800){
    ticon.src="./img/clouds.svg"
}
else if(id==800){
    ticon.src="./img/sun.svg"
}
else{
    ticon.src="./img/clears.svg"
}

        console.log(data);
    })
}

)}
})