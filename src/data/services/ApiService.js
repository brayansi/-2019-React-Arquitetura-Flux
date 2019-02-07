const url = "http://localhost:3002/api/"

export const ApiService = {

    get(endpoint) {
        return fetch(`${url}${endpoint}`).then(reponse => reponse.json());
    },

    post(endpoint, data) {
        return fetch(`${url}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(reponse => reponse.json());
    },

    put(endpoint, data) {
        return fetch(`${url}${endpoint}?id=${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(reponse => reponse.json());
    },

    delete(endpoint, id) {
        return fetch(`${url}${endpoint}?id=${id}`, {
            method: 'DELETE',
        }).then(reponse => reponse.json());
    }

}