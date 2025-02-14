const { Router } = require('express');
const router = Router();
const { 
    createUser, getUsers,  getUserById, updateUser, deleteUser,
    createCliente, getClientes, getClienteById, updateCliente, deleteCliente,
    createServicio, getServicios, getServicioById, updateServicio, deleteServicio,
    createCita, getCitas, getCitaById, updateCita, deleteCita,
    createAtencion, getAtenciones, getAtencionById, updateAtencion, deleteAtencion
} = require('../controllers/index.controller');

// Rutas de usuarios
router.post('/usuarios', createUser);               // Crear usuario
router.get('/usuarios', getUsers);                  // Obtener todos los usuarios
router.get('/usuarios/:id', getUserById);           // Obtener usuario por ID
router.put('/usuarios/:id', updateUser);            // Actualizar usuario
router.delete('/usuarios/:id', deleteUser);         // Eliminar usuario

// Rutas de clientes
router.post('/clientes', createCliente);            // Crear cliente
router.get('/clientes', getClientes);               // Obtener todos los clientes
router.get('/clientes/:id', getClienteById);        // Obtener cliente por ID
router.put('/clientes/:id', updateCliente);         // Actualizar cliente
router.delete('/clientes/:id', deleteCliente);      // Eliminar cliente

// Rutas de servicios
router.post('/servicios', createServicio);          // Crear servicio
router.get('/servicios', getServicios);             // Obtener todos los servicios
router.get('/servicios/:id', getServicioById);      // Obtener servicio por ID
router.put('/servicios/:id', updateServicio);       // Actualizar servicio
router.delete('/servicios/:id', deleteServicio);    // Eliminar servicio

// Rutas de citas
router.post('/citas', createCita);                  // Crear cita
router.get('/citas', getCitas);                     // Obtener todas las citas
router.get('/citas/:id', getCitaById);              // Obtener cita por ID
router.put('/citas/:id', updateCita);               // Actualizar cita
router.delete('/citas/:id', deleteCita);            // Eliminar cita

// Rutas de atenciones
router.post('/atenciones', createAtencion);        // Crear atención
router.get('/atenciones', getAtenciones);           // Obtener todas las atenciones
router.get('/atenciones/:id', getAtencionById);     // Obtener atención por ID
router.put('/atenciones/:id', updateAtencion);      // Actualizar atención
router.delete('/atenciones/:id', deleteAtencion);   // Eliminar atención

module.exports = router;
