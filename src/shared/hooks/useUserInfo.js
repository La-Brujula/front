import { useMemo, useState } from "react"
import { brujulaUtils } from '@shared/utils/brujulaUtils';


export const useUserInfo = (email = "") => {
    if (!email) return { user: undefined, error: undefined, loading: undefined }
    const brujula = brujulaUtils()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)


    useMemo(() => {
        (async () => {
            try {
                setLoading(true)
                email = email === "" ? brujula.getCurrentUserEmail() : email;
                const data = await brujula.getCurrentUserInfo(email)
                setUser({
                    ...data,
                    location: `${data.city}, ${data.state}`,
                });
                setLoading(false)
            } catch (e) {
                setError(e)
                setLoading(false)
            }
        })();
    }, [email])

    return { user, loading, error }
}