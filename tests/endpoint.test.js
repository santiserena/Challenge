const { default: axios } = require("axios");
const app = require("../index");

describe("TESTS DE CHALLENGE", () => {
  it("Al encontrar una ciudad debe retornar un string comenzando con: The temperature consulted is...", async () => {
    const response = await axios("http://localhost:3000/api/madrid");
    expect(response.data.slice(0, 28)).toBe("The temperature consulted is");
  });

  it("seguidamente, el string debe contener un valor numérico.", async () => {
    const response = await axios("http://localhost:3000/api/roma");
    expect(parseInt(response.data.slice(29, 34))).toBeGreaterThan(
      -90
    ); /* siempre la temperatura será mayor a -90° */
  });

  it('Debe recibir un header con el nombre"x-response-time" y debe ser un string.', async () => {
    const response = await axios("http://localhost:3000/api/barcelona");
    expect(typeof response.headers["x-response-time"]).toBe("string");
  });

  it("Este string del header debe contener un valor numerico en ms.", async () => {
    const response = await axios("http://localhost:3000/api/cordoba");
    expect(
      parseInt(response.headers["x-response-time"].slice(0, -2))
    ).toBeGreaterThan(0); /* siempre el tiempo de respuesta será mas que cero */
  });

  it("Debe devolver un error al cargar una ciudad inexistente. (Antes del resultado final, \n por consola podrá visualizarse un contador con los 3 intentos de petición).", async () => {
    try {
      const response = await axios("http://localhost:3000/api/aaaaaaaaaaa");
    } catch (error) {
      expect(!!error).toBe(true);
    }
  });
});
