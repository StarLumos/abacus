import React, { createContext, useContext, useState } from 'react'


const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
}

const darkTheme = {
    background: '#000000',
    text: '#FFFFFF',
}

const ThemeContext = createContext(lightTheme)

const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = isDarkMode ? darkTheme : lightTheme

  return ( // @ts-ignore
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider, lightTheme, darkTheme }
