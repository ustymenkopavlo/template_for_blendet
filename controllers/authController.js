

export async function register(req, res) {

}

export async function login(req, res) {}

export function getUser(req, res) {
    res.send(`Hello ${req.user.email}`)
}
