import React from 'react';
import { ThemeProvider } from 'styled-components'
import { CSSReset } from '../src/components/CSSreset'
import ColorModeProvider, {ColorModeContext} from '../src/components/Menu/components/ColorMode';
import RegisterVideo from '../src/components/RegisterVideo';



const theme = {
  light: {
      backgroundBase: "#ffffff",
      backgroundLevel1: "#E0E6EB",
      backgroundLevel2: "#67668D",
      borderBase: "#E0E6EB",
      textColorBase: "#281E28",
  },
  dark: {
      backgroundBase: "#2E2230",
      backgroundLevel1: "#2B3A48",
      backgroundLevel2: "#67668D",
      borderBase: "#463648",
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