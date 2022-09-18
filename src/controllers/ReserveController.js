const Reserve = require('../models/Reserve')
const User = require('../models/User')
const House = require('../models/House')

class ReserveController {
    async store (req, res) {
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body

        const house = await House.findById(house_id)
        const user = await User.findById(user_id)

        if (!house) return res.status(400).json({ error: "Essa casa não foi cadastrada!" })
        if (house.status !== true) return res.status(400).json({ error: "Solicitação indisponivel" }) 
        if (String(user._id) === String(house.user)) return res.status(401).json({ error: "Reserva não permitida" })
        

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        })
        await (await reserve.populate('house')).populate('user')
        return res.json(reserve)
    }
    async index (req, res) {
        const { user_id } = req.headers
        const reserves = await Reserve.find({ user: user_id }).populate('house')
        
        return res.json(reserves)
    }
    async destroy (req, res) {
        const { reserve_id } = req.body
        await Reserve.findByIdAndDelete(reserve_id)

        return res.json({
            message: "Reserva cancelada com sucesso!", 
            reserve_id,
        })
    }
}

module.exports = new ReserveController()