import { useState, useEffect } from 'react';

/**
 * Hook personalizado para "rebotar" (debounce) un valor.
 * Retrasa la actualización de un valor hasta que haya pasado un tiempo
 * determinado sin que este haya cambiado. Es ideal para optimizar
 * operaciones costosas como las búsquedas en tiempo real.
 *
 * @param {*} value El valor que se quiere debounced (ej: el texto de un input).
 * @param {number} delay El tiempo de espera en milisegundos (ej: 500).
 * @returns {*} El valor debounced, que solo se actualizará una vez que el
 * usuario deje de interactuar por el tiempo `delay`.
 */
export default function useDebounce(value, delay) {
  // Estado para almacenar el valor debounced
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Se crea un temporizador que actualizará el estado después del 'delay'
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Función de limpieza: Se ejecuta si el 'value' cambia antes de que
    // el temporizador termine, o si el componente se desmonta.
    // Esto cancela el temporizador anterior y evita actualizaciones innecesarias.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // El efecto se volverá a ejecutar solo si 'value' o 'delay' cambian

  return debouncedValue;
}
