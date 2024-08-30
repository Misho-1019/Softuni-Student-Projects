import { del, get, post, put } from "./api.js"


const endpoints = {
    allShows: '/data/shows?sortBy=_createdOn%20desc',
    shows: '/data/shows'
}

export async function getAllShows() {
    return await get(endpoints.allShows)
}

export async function createShow(data) {
    return await post(endpoints.shows, data)
}

export async function getShowById(id) {
    return await get(endpoints.shows + `/${id}`)
}

export async function updateShow(id, data) {
    return await put(endpoints.shows + `/${id}`, data)
}

export async function deleteShow(id) {
    return await del(endpoints.shows + `/${id}`)
}

export async function search(query) {
    return await get(`${endpoints.shows}?where=title%20LIKE%20%22${query}%22`)
}