/**
 * Middleware para manejar rutas no encontradas (404).
 * Si ninguna ruta coincide, este middleware se ejecuta y pasa un error 404 al siguiente manejador de errores.
 */
const notFound = (req, res, next) => {
  const error = new Error(`No Encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pasa el error al siguiente middleware
};

/**
 * Middleware centralizado para manejar todos los errores de la aplicación.
 * Captura cualquier error pasado a través de `next(error)` y envía una respuesta JSON estandarizada.
 */
const errorHandler = (err, req, res, next) => {
  // A veces un error puede llegar con un código de estado 200, lo cambiamos a 500.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Mostramos el stack del error solo si no estamos en producción para facilitar el debug
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
