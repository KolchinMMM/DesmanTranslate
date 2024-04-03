import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
    const [user, setUser] = useState(undefined);
    const [gotUser, setGotUser] = useState(false);

    async function ReAuth() {
        console.log("okay, try to get me")
        let rsp = await fetch("/api/whoami",
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        console.log(rsp)
        if (!rsp.ok) {
            console.log("what")
            setUser(undefined)
            return
        }

        try {
            rsp = await rsp.json()
            console.log("user")
            console.log(rsp)
        } catch (err) {
            rsp = null
            console.log("no user :(")
        }

        setUser(rsp)
    }

    const value = {
        user,
        ReAuth,
        gotUser,
    };


    useEffect(() => {
        ReAuth();
    }, [])

    useEffect(() => {
        setGotUser(user !== undefined)
    }, [user])

    return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };