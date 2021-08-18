import { useState } from 'react';

const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const start_loading = () => setIsLoading(true);

    const stop_loading = () => setIsLoading(false);

    return [
        isLoading,
        start_loading,
        stop_loading
    ]

}