import React from "react";
import { format, parseISO } from 'date-fns';

type useDateFormatType = {
    isoDate: string,
    dateFormat?: string,
}

export const useDateFormat = () => {

    const getFormattedDate = (isoDate: string, dateFormat: string = "MMMM d, yyyy h:mm:ss a") => {

        /**
         * Check this page documentation for formating dates
         * https://date-fns.org/v2.29.3/docs/format
         */

        try {
            const date = parseISO(isoDate);
            const formattedDate = format(date, dateFormat);
            return formattedDate
        }
        catch {
            console.error('Invalid date format')
        }
    }

    return { getFormattedDate };
};
