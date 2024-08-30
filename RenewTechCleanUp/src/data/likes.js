import { getUserData } from "../util.js"
import { get, post } from "./api.js"


const endpoints = {
    like: '/data/likes',
    likesBySolutionId: (id) => `/data/likes?where=solutionId%3D%22${id}%22&distinct=_ownerId&count`,
    likeByUserId: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeSolution(solutionId) {
    return await post(endpoints.like, {solutionId})
}

export async function getLikesBySolutionId(solutionId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.likesBySolutionId(solutionId))
    ]

    if (userData) {
        requests.push(get(endpoints.likeByUserId(solutionId, userData._id)))
    }

    const [likes, hasLiked] = await Promise.all(requests);

    return {
        likes,
        hasLiked: Boolean(hasLiked)
    }
}