import React from 'react'
import { useDispatch } from 'react-redux';
import { getFromLS } from '../../utils/storage';

const ThemeChanger = () => {

    const dispatch = useDispatch();
    const themes = getFromLS("all-themes");

    const changeTheme = (theme) => {
        dispatch({ type: "SET_THEME", payload: theme })
    }

    return (
        <div>
            {
                Object.entries(themes.data).map((theme) => {
                    theme = theme[1]
                    return (
                        <button onClick={() => changeTheme(theme)} key={theme.id}>
                            theme.name
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ThemeChanger
