import styled from "styled-components";

const StyledFavorite = styled.div`
display: flex ;
margin: 30px ;
.profilePicture{
  width: 100px ;
  border-radius: 50%;
}
a{
  margin: 0 32px ;
  color: ${({ theme }) => theme.textColorBase};
}

`

export function Favorite (props){
  const favoriteNames = Object.keys(props.favorites)
  return(
    <div>
      {favoriteNames.map((favoriteName) =>{
        const videos = props.favorites[favoriteName];
        return(
          <section key={favoriteName}>
            <h2>{favoriteName}</h2>
            <StyledFavorite>
            {videos.map((profile)=>{
              return(
                <a className="profileLink" key={profile.url} href={profile.url} target="_Blank">
                  <div>
                    <img className="profilePicture" src={profile.thumb} />
                  </div>
                  <span>{profile.title}</span>
                </a>
              )
            })}
            </StyledFavorite>
          </section>
        )
      })}

    </div>
  )

}