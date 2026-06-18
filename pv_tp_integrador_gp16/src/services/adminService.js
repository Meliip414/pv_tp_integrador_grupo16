const adminService = (() => {
const admins= [
        {nombre: 'Selena', sector: 'Soporte'},
        {nombre: 'Miranda', sector: 'Gerencia'}
    ];

    const login = (nombre, sector) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const encontrado = admins.find(
                    a => a.nombre === nombre && a.sector === sector
                );
                if (encontrado) {
                    resolve({ nombre: encontrado.nombre, sector: encontrado.sector});
                } else {
                    reject(new Error('Admin no encontrado'));
                }
            }, 800);
        });
    }
  return { login };

})();

export default adminService;