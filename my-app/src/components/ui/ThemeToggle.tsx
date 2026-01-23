import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const toggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    return ( 
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
      aria-label="Переключить тему"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    </button>
 );
}
 
export default ThemeToggle;