
const DIRB_SERVICES_URL = process.env.REACT_APP_DIRB_SERVICES_URL

export const getDirbWordlists = () : Promise<Response> => {
    return fetch(`${DIRB_SERVICES_URL}/dirb/wordlists`, {
        method: 'GET',
    })
}
