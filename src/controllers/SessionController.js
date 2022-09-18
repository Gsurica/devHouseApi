const User = require('../models/User')
const yup = require('yup')

class SessionController {
    async store (req, res) {
        const schema = yup.object().shape({
            email: yup.string().required().email()
        })

        if (!(await schema.isValid(req.body))) return res.status(400).json({ error: "Use um e-mail para se cadastrar" })

        const { email } = req.body
        let user = await User.findOne({ email })
        if (!user) user = await User.create({ email })
        return res.json(user)
    }
}

module.exports = new SessionController()