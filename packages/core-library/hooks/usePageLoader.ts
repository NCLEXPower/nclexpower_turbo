import { useEffect, useRef, useState } from 'react'
import { useRouter } from '../core'

type PageLoaderReturnType = {
    isPageLoading: boolean
    handleRouteChangeStart: () => void
    handleRouteChangeComplete: () => void
}

export const usePageLoader = (): PageLoaderReturnType => {
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const router = useRouter()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleRouteChangeStart = () => {
            setIsPageLoading(router.loading)
    }

    const handleRouteChangeComplete = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsPageLoading(router.loading);
        }, 2000);
    }

    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [])

    return { isPageLoading, handleRouteChangeStart, handleRouteChangeComplete }
}