import { del, get, post, put } from "./api.js"


const endpoints = {
    "allSolutions": '/data/solutions?sortBy=_createdOn%20desc',
    "solutions": '/data/solutions'
}

export async function getAllSolutions() {
    return await get(endpoints.allSolutions)
}

export async function createSolution(data) {
    return await post(endpoints.solutions, data)
}

export async function getSolutionById(id) {
    return await get(endpoints.solutions + `/${id}`)
}

export async function updateSolution(id, data) {
    return await put(endpoints.solutions + `/${id}`, data)
}

export async function deleteSolution(id) {
    return await del(endpoints.solutions + `/${id}`)
}