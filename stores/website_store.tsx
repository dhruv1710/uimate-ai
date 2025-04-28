import {create} from 'zustand';


export const useWebsiteStore = create((set)=>({
    url:'',
    setUrl:(url: string)=>set({url})
}))

