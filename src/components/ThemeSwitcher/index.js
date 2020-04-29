import React, { useState, useEffect } from 'react'

const ThemeSwitcher = () => {
  const [themeState, setThemeState] = useState(true);

  const handleChange = () => {
    setThemeState(!themeState);
    if (themeState) {
      localStorage.setItem('Theme', 'dark');
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
      
    } else if (!themeState){
      localStorage.setItem('Theme', 'light');
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
    }
  }
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme');
    if (getTheme === 'light') {
      return  document.documentElement.classList.add('theme-light');
    }
    else if (getTheme === 'dark') {
      return  document.documentElement.classList.add('theme-dark');
    }
    else {
      return  document.documentElement.classList.add('theme-light');
    }
  })
  return (
    <p onClick={handleChange}>
      {!themeState ? 'Light Theme' : 'Dark Theme'}
    </p>
  )
}

export default ThemeSwitcher;
