import {atomWithStorage, createJSONStorage} from 'jotai/utils'

export const initUser = {
    id:'',
    name:'',
    password:'',
    email:'',
    role:''
}

export const userAtom = atomWithStorage("user",initUser,createJSONStorage(()=>sessionStorage));