import React, { useState,useEffect } from 'react'
import "./Home.scss";
import axios from 'axios';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
const apiKey="12663d639df2f9d4895dc0312a67c993"
console.log(apiKey)
const imgurl="https://image.tmdb.org/t/p/original"

const Card=({img})=>{
    return(
    <img className='card' src={img} alt="cover" />
)}

const Row=({title,arr=[]})=>{
    return(
    <div className='row'>
        <h2>{title}</h2>
        <div>

        {
            arr.map((item,index)=>(
                <Card key={index}img={`${imgurl}/${item.poster_path}`}/>
    
            ))
        }
    
        </div>
     
    </div>
)}


const Home = () => {


  const [upcoming,setupcoming]=useState([])
  const [nowplaying,setnowplaying]=useState([])
  const [popular,setpopular]=useState([])
  const [rated,setrated]=useState([])

    useEffect(()=>{
      const fetchUpcoming=async()=>{
      const {data}=  await axios.get(`
      https://api.themoviedb.org/3/movie/upcoming?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2&api_key=${apiKey}`)
      setupcoming(data.results)
      }
      const fetchnowplaying=async()=>{
        const {data}=  await axios.get(`
        https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2&api_key=${apiKey}`)
        setnowplaying(data.results)
   
      }
      const fetchpopular=async()=>{
        const {data}=  await axios.get(`
        https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`)
        setpopular(data.results)
   
      }

      const fetchtoprated=async()=>{
        const {data}=  await axios.get(`
        https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`)
        setrated(data.results)
   
      }
    fetchUpcoming()
    fetchnowplaying()
    fetchpopular()
    fetchtoprated()
    },[])
  return (
    <section className='home'>
           <div
                className="banner"
                style={{
                    backgroundImage: popular[2]
                        ? `url(${`${imgurl}/${popular[2].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
      >
      {/* <h1>{popular[2].original_title}</h1>
      <h1>{popular[2].overview}</h1>  down is same but conditional rendering*/}
      {
        popular[2]&&(
          <h1>{popular[2].original_title}</h1>
   
        )
      }{
        popular[2]&&
          <p>{popular[2].overview}</p>
        
      }
      <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
      </div>
     
      <Row title={"Upcoming on netflix"}  arr={upcoming}/>
      <Row title={"Nowplaying"}  arr={nowplaying}/>
      <Row title={"popular"}  arr={popular}/>
      <Row title={"toprated"}  arr={rated}/>
  
     
      
    </section>
  )
}

export default Home

