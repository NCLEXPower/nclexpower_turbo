import React, { useEffect, useState } from 'react'
import { useApi, useApiCallback } from './useApi'
import { ChatBotSsr } from '../types/global';
import { getChatBotMode } from '../ssr';
import { useExecuteToast } from '../contexts';

export const useChatBotMode = () => {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const { showToast } = useExecuteToast()

    const fetchChatbotMode = async () => {
        try {
            const mode = await getChatBotMode();
            setData(mode.mode === 1 ? true : false);
        } catch (error) {
            showToast("Something went wrong, Please try again later", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChatbotMode();
    }, []);
    return { data, loading, refetch: fetchChatbotMode };
}
