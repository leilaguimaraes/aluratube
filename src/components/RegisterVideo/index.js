import React from "react";
import {StyledRegisterVideo} from "./styles";

const isCorrectURL = ^/(http|https):\/\/(www.)?(youtube.com/watch?v=)



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

export default function RegisterVideo(){
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  //falta o botao
  //precisa alterar o fundo para mais escuro.
  //formulario em si
  return(
    <StyledRegisterVideo>
      <button className="add-video" onClick={()=> setFormVisivel(true)}>
        + 
      </button>
      {formVisivel 
      ? (
        <form onSubmit={(evento) =>{
          evento.preventDefault();
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
          <input placeholder="URL" name="url" id="urldovideo" value={formCadastro.values.url} onChange={formCadastro.handleChange}/>

          <button type="submit">Cadastrar</button>
        </div>
      </form> 
      )
      : null}
    </StyledRegisterVideo>
  )  
}