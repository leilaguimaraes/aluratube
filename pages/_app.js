import React from 'react';
import { ThemeProvider } from 'styled-components'
import { CSSReset } from '../src/components/CSSreset'
import ColorModeProvider, {ColorModeContext} from '../src/components/Menu/components/ColorMode';
import RegisterVideo from '../src/components/RegisterVideo';



const theme = {
  light: {
      backgroundBase: "#f9f9f9",
      backgroundLevel1: "#F9FDF2",
      backgroundLevel2: "#E6ECDD",
      borderBase: "#E6ECDD",
      textColorBase: "#22281E",
  },
  dark: {
      backgroundBase: "#202619",
      backgroundLevel1: "#465238",
      backgroundLevel2: "#5B6A49",
      borderBase: "#343E20",
      textColorBase: "#FFFFFF",
  }
};

function ProviderWrapper(props){
  return(
    <ColorModeProvider initialMode={"dark"}>
      {props.children}
    </ColorModeProvider>
  )
}
function MyApp({ Component, pageProps }) {
  const contexto = React.useContext(ColorModeContext)
  console.log(contexto.mode)
  return (
    
      <ThemeProvider theme={theme[contexto.mode]}>
        <CSSReset/>
        <Component {...pageProps} />
        <RegisterVideo />
      </ThemeProvider>
    
  )
}
export default function _App(props){
  return(
    <ProviderWrapper>
      <MyApp {...props}/>
    </ProviderWrapper>
  )
}