const { Router } = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController')
const HouseController = require('./controllers/HouseController')
const DashboardController = require('./controllers/DashboardController')
const ReserveController = require('./controllers/ReserveController')

const routes = new Router()
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store)
routes.post('/houses', upload.single(`thumbnail`), HouseController.store)
routes.get('/houses', HouseController.index)
routes.put('/houses/:house_id', upload.single(`thumbnail`), HouseController.update)
routes.delete('/houses/:house_id', HouseController.destroy)
routes.get('/houses/:house_id', HouseController.show)

routes.get('/dashboard', DashboardController.show)

routes.post('/houses/:house_id/reserve', ReserveController.store)
routes.get('/reserves', ReserveController.index)
routes.delete('/reserves/cancel', ReserveController.destroy)

module.exports = routes

