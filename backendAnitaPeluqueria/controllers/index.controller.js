const { Pool } = require('pg'); // Asegúrate de tener la dependencia pg instalada
const pool = new Pool({
    user: 'postgres', // Nombre de usuario de la base de datos
    host: 'localhost',
    database: 'bdanitapeluqueria',
    password: 'gilcespanta1994',
    port: 5432,
});

// Funciones para Usuarios
const createUser = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, password, rol]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, email = $2, password = $3, rol = $4 WHERE id = $5 RETURNING *',
            [nombre, email, password, rol, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Funciones para Clientes
const createCliente = async (req, res) => {
    const { nombre, telefono, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clientes (nombre, telefono, email) VALUES ($1, $2, $3) RETURNING *',
            [nombre, telefono, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE clientes SET nombre = $1, telefono = $2, email = $3 WHERE id = $4 RETURNING *',
            [nombre, telefono, email, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Funciones para Servicios
const createServicio = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO servicios (nombre, precio) VALUES ($1, $2) RETURNING *',
            [nombre, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getServicios = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM servicios');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getServicioById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
        const result = await pool.query(
            'UPDATE servicios SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *',
            [nombre, precio, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM servicios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json({ message: 'Servicio eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Funciones para Citas
const createCita = async (req, res) => {
    const { cliente_id, fecha, estado, descripcion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO citas (cliente_id, fecha, estado, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
            [cliente_id, fecha, estado, descripcion]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCitas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM citas');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCitaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM citas WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCita = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, fecha, estado, descripcion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE citas SET cliente_id = $1, fecha = $2, estado = $3, descripcion = $4 WHERE id = $5 RETURNING *',
            [cliente_id, fecha, estado, descripcion, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCita = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM citas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.status(200).json({ message: 'Cita eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Funciones para Atenciones
const createAtencion = async (req, res) => {
    const { cita_id, usuario_id, servicio_id, observaciones } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO atenciones (cita_id, usuario_id, servicio_id, observaciones) VALUES ($1, $2, $3, $4) RETURNING *',
            [cita_id, usuario_id, servicio_id, observaciones]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAtenciones = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM atenciones');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAtencionById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM atenciones WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Atención no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAtencion = async (req, res) => {
    const { id } = req.params;
    const { cita_id, usuario_id, servicio_id, observaciones } = req.body;
    try {
        const result = await pool.query(
            'UPDATE atenciones SET cita_id = $1, usuario_id = $2, servicio_id = $3, observaciones = $4 WHERE id = $5 RETURNING *',
            [cita_id, usuario_id, servicio_id, observaciones, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Atención no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAtencion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM atenciones WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Atención no encontrada' });
        }
        res.status(200).json({ message: 'Atención eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente,
    createServicio,
    getServicios,
    getServicioById,
    updateServicio,
    deleteServicio,
    createCita,
    getCitas,
    getCitaById,
    updateCita,
    deleteCita,
    createAtencion,
    getAtenciones,
    getAtencionById,
    updateAtencion,
    deleteAtencion
};
