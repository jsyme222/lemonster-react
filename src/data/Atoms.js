import { atom } from "jotai";

export const apiUrl = atom(process.env.REACT_APP_API);
export const projectListAtom = atom();
export const menuAtom = atom(false);
export const activeView = atom();
export const blogPosts = atom();
export const viewingPost = atom();
export const background = atom(null);

export const contactFormData = atom({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    questions: " ",
    services: {
        website: false,
        businessApplication: false,
        maintenance: false,
        other: false,
    }
})
