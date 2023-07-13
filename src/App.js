// react
import React,{useEffect, useState} from "react";
// Own Css 
 import "./App.css";


export default function App() {
// react Hook For State Handler
  const [data , setData]=useState([]);
  const [filter,setFilter] = useState([]);
  const [search,setSearch] = useState("");
  const [list,setList] = useState([]);
  const [a,setA] = useState(false);
  const [rc,setRc] = useState(25);
  const [name,setName] = useState("New User!");

 

// Fetch Function   
  fetch("./data.json").then(
    function(res){
    return res.json()
  }).then(function(data){
  // store Data in State Data Variable
    setData(data)
  }).catch(
    function(err){
      console.log(err, ' error')
    }
  )

  


  const handleFilter = (x)=>{

    setList([]);

    if(data){
    data.map((e)=>{

      let ui = x.toLowerCase();
      let id = '';
      let c=0;
      let li = list;
      for(let i in e){

        let p = e[i].toLowerCase();
        id = e['id'];
        if( (p.includes(ui))){
          
          let dict = {"id":e['id'],
          "genre": e['genre'],
          "name": e['name'],
          "author": e['author'],
          "price": e['price'],
          "date": e['date'],
          "link":e['link']};
          li.push(dict);
          li.reverse();
          let h = li.length;
          setRc(h);

          setList(li);

          console.log(rc);
          
        }
        
        
      
      }

      

      // if(sx==se){
      //   console.log(e)
      // }
      // else{
      //   console.log(0)
      // }
      
    })
  }
  setA(true);

  }

  const handleSearch = (e)=>{

    let val = document.getElementById("search").value;

    if(val!=""){

    setList([]);

    handleFilter(val);

    }

}

  
setInterval(function(){
  let ls = localStorage.getItem("name");
  if(ls){
    setName(ls);
  }
},1000)



  return (

    <>
    <div className="App">

      <div className="search">

          <input type="text" placeholder="Search Book's  title / author "  id="search"


          /><br></br>

          <button onClick={handleSearch}>search</button>

          <button className="log" onClick={()=>{
            window.location="./login.html";
          }}>login</button>

          <button className="reg" onClick={()=>{
            window.location="./register.html";
          }}>register</button>

         < i id="name"> Welcome .{name} </i>

      </div>

      <div className="rc">

        <p>The number of results : {rc}</p>

      </div>


      {
        // use data State Variable For Get Data Use JavaScript Map Mathod
       data && !a? data.map(
          function(data){
                  return (<div className="card" 
                  onClick={()=>{
                    window.location = data.link;
                  }}> 
                  <h4> Genre: {data.genre}</h4>
                  <h2> {data.name}</h2>
                  <h3> Author:{data.author}</h3>
                  <h5>Pub.data: {data.date}</h5>
              </div>)
          }
        ):
        list.map(
          function(data){
                  return (<div className="card"
                  onClick={()=>{
                    window.location = data.link;
                  }}
                  > 
                  <h4> Genre: {data.genre}</h4>
                  <h2> {data.name}</h2>
                  <h3> Author:{data.author}</h3>
                  <h5>Pub.data: {data.date}</h5>
              </div>)
          }
        )
      }

      <div className="footer">

        <h1> LMP </h1>


      </div>


    </div>


    </>

  );
}
