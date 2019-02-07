import { ApiService } from './ApiService';

const endpoint= "flux";

export const FluxService = {
    
    list() {
        return ApiService.get(endpoint);
    },

    create(item) {
        return ApiService.post(endpoint, item);
    },

    update(item) {
        return ApiService.put(endpoint, item);
    },

    remove(id) {
        return ApiService.delete(endpoint, id);
    }
}