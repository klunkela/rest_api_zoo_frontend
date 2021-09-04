import axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/'
})

export const usersAPI = {
    getUserData(userId) {
        return instance.get('users/' + userId)
    },
    getUsers(page, limit) {
        return instance.get('users?_page=' + page + '&_limit=' + limit)
    },
    getUsersCount() {
        return instance.get('usersCount')
    }

}

export const animalsAPI = {
    async getAnimalsCount() {
        return await instance.get('animals/count')
    },
    async getAnimals(page, limit) {
        let p = page ? page : 1
        let l = limit ? limit : 100
        return await instance.get(`animals/page/${p}&limit=${l}`)
    },
    async postAnimal(cage_id, type, name, cold_resistant) {
        let t = type ? type : null
        let n = name ? name : null
        return await instance.post('animals', {
            "cage_id": cage_id, "type": t,
            "name": n, "cold_resistant": cold_resistant
        })
            .catch(function (error) {
                return error.response
            })

    },
    async deleteAnimal(animal_id) {
        return await instance.delete(`animals/${animal_id}`)

    },
    async putAnimal(id, cage_id, type, name, cold_resistant) {
        return await instance.put(`animals/${id}`, {
            "cage_id": cage_id, "type": type,
            "name": name, "cold_resistant": cold_resistant
        })
            .catch(function (error) {
                return error.response
            })

    },
    async getAnimal(animal_id) {
        return await instance.get(`animals/${animal_id}`)
            .catch(function (error) {
                return null
            })

    },
    async getAccessLevels() {
        return await instance.get(`animals/access_levels`)
            .catch(function (error) {
                return null
            })

    },

}

export const visitsAPI = {
    async getVisitsCount() {
        return await instance.get('visits/count')
    },
    async getVisits(page, limit) {
        let p = page ? page : 1
        let l = limit ? limit : 100
        return await instance.get(`visits/page/${p}&limit=${l}`)
    },
    async postVisit(ticket_price, worker_id) {
        return await instance.post('visits', {"ticket_price": ticket_price, "worker_id": worker_id})
            .catch(function (error) {
                return error.response
            })

    },
    async deleteVisit(visit_id) {
        return await instance.delete(`visits/${visit_id}`)

    },
    async putVisit(id, ticket_price, worker_id) {
        return await instance.put(`visits/${id}`, {"ticket_price": ticket_price, "worker_id": worker_id})
            .catch(function (error) {
                return error.response
            })

    },
    async getVisit(visit_id) {
        return await instance.get(`visits/${visit_id}`)
            .catch(function (error) {
                return null
            })

    },
    async getAccessLevels() {
        return await instance.get(`visits/access_levels`)
            .catch(function (error) {
                return null
            })

    },


}

export const loginAPI = {
    checkUserInDB(login, password) {
        return instance.post('login', {
            "login": login,
            "password": password
        })
            .catch(function (error) {
                return error
            })
    },
    regUser(login, password) {
        return instance.post('users', {
            "login": login,
            "password": password
        })
    },
    getLogins(setLogins) {
        instance.get('auth').then(response => {
            let logins = response.data.map(e => e.login)
            setLogins(logins)
        })
    },
    reLog(token) {
        return instance.get(`login/auth`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
    }
}
