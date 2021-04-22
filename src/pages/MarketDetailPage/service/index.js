import api from '../../../service/axios';
import { APIFunctionType, APIKey } from '../../../configuration/market.config'

export function searchCompanyOverview(symbol, onSuccess, onError) {
    api.get(`query?function=${APIFunctionType.OVERVIEW}&symbol=${symbol}&apikey=${APIKey}`)
        .then(response => {
            onSuccess && onSuccess(response.data)
        })
        .catch(error => {
            onError && onError(error)
        })
}


export function findEarnings(symbol, onSuccess, onError) {
    api.get(`query?function=${APIFunctionType.EARNINGS}&symbol=${symbol}&apikey=${APIKey}`)
        .then(response => {
            onSuccess && onSuccess(response.data)
        })
        .catch(error => {
            onError && onError(error)
        })
}