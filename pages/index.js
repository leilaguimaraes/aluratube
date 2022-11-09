import React from "react";
import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu/Menu'
import { CSSReset } from '../src/components/CSSreset'
import { StyledTimeline } from '../src/components/Timeline'

function HomePage() {
  //console.log(config.playlists)
  const [valorDoFiltro, setvalorDoFiltro] = React.useState("Frost");
  return (
    <>
      <CSSReset />
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
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>Conteúdo</Timeline>
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
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
