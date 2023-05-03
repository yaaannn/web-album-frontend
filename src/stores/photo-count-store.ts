import { defineStore } from 'pinia';

export const usePhotoCountStore = defineStore({
    id: 'photoCount',
    state: () => {
        return {
            photoCount: 0,
        }
    },
    actions: {
        setPhotoCountState(val: number) {
            this.photoCount = val;
        },
    },
});