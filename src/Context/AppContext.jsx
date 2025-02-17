import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    async function getUser() {
        // get authenticated user
        const res = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()

        if(res.ok) {
            setUser(data)
        }
    }

    // call the getUser method whenever the token is updated
    useEffect(() => {
        if(token) {
            getUser()
        }
    }, [token])

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}
