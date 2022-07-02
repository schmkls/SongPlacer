import { useState, useEffect } from "react"
import axios from "axios"

//Thanks Web Dev Simplified: https://youtu.be/Xcet6msf3eE

export default function useAuth(code) {

    
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        if (!code)  return;

        console.log("logging in with code: " + code);
        axios
            .post("http://localhost:3002/login", {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                localStorage.setItem("access_token", res.data.accessToken);
                window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
            })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
                .post("http://localhost:3002/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(() => {
                    window.location = "/"
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    console.log("returning access token: " + accessToken);
    return accessToken
}