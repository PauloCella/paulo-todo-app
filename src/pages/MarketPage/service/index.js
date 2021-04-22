import api from '../../../service/axios';
import { APIKey, APIFunctionType } from '../../../configuration/market.config';
import { organizations } from '../../../utilities/constants';


export function findEndpoint(keyword, onSuccess, onError) {
    api.get(`query?function=${APIFunctionType.SYMBOL_SEARCH}&keywords=${keyword}&apikey=${APIKey}`)
        .then(() => {
            onSuccess && onSuccess(organizations);
        })
        .catch(error => {
            onError && onError(error);
        })
}

function modifyData({ bestMatches }) {
    return bestMatches.map( object => {
        let newObject = {}
        Object.entries(object).forEach( item => {
            const name = item[0].split(' ')[1];
            const value = item[1];
            newObject[name] = value;
        });
        return newObject;
    });
}