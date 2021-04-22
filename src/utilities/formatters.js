import { format, parseISO } from "date-fns";
import { addSeconds } from "date-fns/esm";

export const formatDate = (date, formatStr = 'MM/dd/yyyy') => {
    if (date) {
        return format(date, formatStr);
    }
    return '';
};

//Mes/dia/Ano
export const formatDateISOToDate = dateISO => {
    if (dateISO) {
        return format(parseISO(dateISO), "MM/dd/yyyy")
    }
    return "";
};


export const formatSecondsToDate = (seconds) => {
    if (seconds) {
        const date = addSeconds(new Date(0), seconds);
        return format(date, 'MM/dd/yyyy');
    }
    return '';
}