import { useEffect, useState } from "react"
import { brujulaUtils } from '@shared/utils/brujulaUtils';


export const useCurrentUser = () => {
    const brujula = brujulaUtils()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const data = await brujula.getCurrentUserInfo()
                setUser({
                    ...data,
                    username: data.nickname,
                    location: `${data.city}, ${data.state}`,
                });
                setLoading(false)
            } catch (e) {
                setError(e)
                setLoading(false)
            }
        })();
    }, [])

    return { user, loading, error }
}