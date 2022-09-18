const House = require('../models/House')
const User = require('../models/User')
const yup = require('yup')

class HouseController {
    async index (req, res) {
        const { status } = req.query
        const houses = await House.find({ status })
        return res.json(houses)
    }
    async store (req, res) {
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required()
        })
        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if (!(await schema.isValid(req.body))) return res.status(400).json({ error: "Falha na validação" })

        const house = await House.create({ 
            status,
            user: user_id,
            thumbnail: filename,
            location,
            price,
            description,
        })
        return res.json(house)
    }
    async update (req, res) {
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required()
        })
        
        const { filename } = req.file
        const { house_id } = req.params
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        const user = await User.findById(user_id) 
        const houses = await House.findById(house_id)

        if (String(user._id) !== String(houses.user)) return res.status(401).json({ error: "Não autorizado" })
        if (!(await schema.isValid(req.body))) return res.status(400).json({ error: "Falha na validação" })

        await House.updateOne({ _id: house_id }, {
            status,
            user: user_id,
            thumbnail: filename,
            location,
            price,
            description,
        })
        
        return res.json()
    }
    async show (req, res) {
        const { house_id } = req.params
        const house = await House.findById(house_id)
        if (!house) return res.status(404).json({ error: "Casa não encontrada" })
        return res.json(house)
    }
    async destroy (req, res) {
        const { house_id } = req.params
        const { user_id } = req.headers

        const user = await User.findById(user_id)
        const house = await House.findById(house_id)

        if (String(user._id) !== String(house.user)) return res.status(401).json({ error: "Não autorizado" })
        if (!house) return res.status(404).json({ error: "Casa não encontrada" })

        await House.deleteOne(house)

        return res.json({ message: "Casa deletada com sucesso!" })
    }
}

module.exports = new HouseController()