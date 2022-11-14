import React from "react";
import {StyledRegisterVideo} from "./styles";
import { createClient } from '@supabase/supabase-js'
import config from "../../../config.json"

function getThumbnail(url){
  const youTubeId = url.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, '$7');
  const thumbnail = `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
  return thumbnail;
}
function useForm(propsDoForm){
  const [values, setValues] = React.useState(propsDoForm.initialValues);
  return{
    values,
    handleChange: (evento)=>{
        //console.log(evento.target)
        const value = evento.target.value
        const name = evento.target.name
        setValues({
          ...values,
          [name]: value,
        })
      },
      clearForm() {
      setValues({});
  }
}}

const PROJECT_URL = "https://zfuwqlmbqpejwawyqhty.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmdXdxbG1icXBlandhd3lxaHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzg4NzIsImV4cCI6MTk4MzkxNDg3Mn0.KUp1-kZRxyjBOljdxYQ2OAa6fvnX3VselVsqHoKXmPg"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export default function RegisterVideo(){
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  const playlistNames = Object.keys(config.playlists)

  return(
    <StyledRegisterVideo>
      <button className="add-video" onClick={()=> setFormVisivel(true)}>
        + 
      </button>
      {formVisivel 
      ? (
        <form onSubmit={(evento) =>{
          evento.preventDefault();

          //contrato entre o nosso front e o back;
          supabase.from("video").insert({
            title:formCadastro.values.titulo,
            url:formCadastro.values.url,
            thumb:getThumbnail(formCadastro.values.url),
            playlist:formCadastro.values.playlist ,
          })
          .then((oqueveio) => {
            console.log(oqueveio);
         })
         .catch((err) => {
            console.log(err);
         })

          setFormVisivel(false);
          formCadastro.clearForm();
        }}>
        <div>
          <button type="button" className="close-modal" onClick={()=>setFormVisivel(false)}>
            x
          </button>
          <label htmlFor="titulodovideo" hidden> Digite o título do vídeo </label>
          <input id="titulodovideo" name="titulo" placeholder="Título do vídeo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}/>

          <label htmlFor="urldovideo" hidden> Digite a url do vídeo </label>
          <input placeholder="URL" name="url" id="urldovideo" value={formCadastro.values.url} onChange={formCadastro.handleChange} required/>

          <select name="playlist" defaultValue="" onChange={formCadastro.handleChange} required>
            <option value="" disabled>
              Selecione uma playlist...
            </option>
            {playlistNames.map((playlistName) => {
            return (
            <option key={playlistName} value={playlistName}>{playlistName}</option>
              )
            })}  
          </select>
          <button type="submit">Cadastrar</button>
          {formCadastro.values.url.length > 11 ? <> <img className="thumbPreview" src={getThumbnail(formCadastro.values.url)}  /> </>  : null }
        </div>
      </form> 
      )
      : null}
    </StyledRegisterVideo>
  )  
}