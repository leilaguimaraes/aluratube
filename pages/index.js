import React from "react";
import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import { videoService } from "../src/services/videoService";
import { Favorite } from "../src/components/Favorites";
import { Footer } from "../src/components/Footer";





function HomePage() {
  const service = videoService();

  const [valorDoFiltro, setvalorDoFiltro] = React.useState("");

  const[playlists, setPlaylists] = React.useState({})
  
  React.useEffect(()=>{
    service
    .getAllVideos()
    .then((dados)=>{
      console.log(dados.data);
      const novasPlaylists = {...playlists}
      dados.data.forEach((video)=>{
        if(!novasPlaylists[video.playlist])
          novasPlaylists[video.playlist] = [];
        
        novasPlaylists[video.playlist].push(video);
      })
      setPlaylists(novasPlaylists);
    });
  }, [])


  return (
    <>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
          // backgroundColor: "red",
        }}
      >
        <Menu valorDoFiltro={valorDoFiltro} setvalorDoFiltro={setvalorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists}>
          Conteúdo
        </Timeline>
        <Favorite favorites = {config.favorites}/>
        <Footer/>
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
  background-color: ${({theme})=> theme.backgroundLevel1};
  .profilePicture {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user {
    margin-top: 16px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
  .banner {
    width: 100%;
    height: 230px;
    background-image: url(${config.bg});
    background-position: 0;
    background-repeat: no-repeat;
    background-size: cover;
    border: 0px;
  }
`
function Header() {
  return (
    <StyledHeader>
      <img className="banner" />
      <section className="user">
        <img
          className="profilePicture"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({searchValue, ...propriedades}) {
  const playlistNames = Object.keys(propriedades.playlists)
  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = propriedades.playlists[playlistName]
        //console.log(playlistName)
        //console.log(videos)
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video)=> {
                const titleNormalized = video.title.toLowerCase()
                const searchValueNormalized = searchValue.toLowerCase()
                return titleNormalized.includes(searchValueNormalized)
              }).map(video => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
