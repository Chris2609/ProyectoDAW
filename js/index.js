// obtener el canvas, establecer el contenido de este en 2d y rellenarlo de negro para confirmar su posicion
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
var psjJug1 = null;
var psjJug2 = null;

jonJug1.addEventListener("click", () => {
  psjJug1 = "/jon/jon";
  jonJug1.style.color = "green";
  davidJug1.style.color = "white";
  enriqueJug1.style.color = "white";
});

davidJug1.addEventListener("click", () => {
  psjJug1 = "/david/david";
  davidJug1.style.color = "green";
  jonJug1.style.color = "white";
  enriqueJug1.style.color = "white";
});

enriqueJug1.addEventListener("click", () => {
  psjJug1 = "/enrique/enrique";
  enriqueJug1.style.color = "green";
  jonJug1.style.color = "white";
  davidJug1.style.color = "white";
});

jonJug2.addEventListener("click", () => {
  psjJug2 = "/jon/jon";
  jonJug2.style.color = "green";
  davidJug2.style.color = "white";
  enriqueJug2.style.color = "white";
});

davidJug2.addEventListener("click", () => {
  psjJug2 = "/david/david";
  davidJug2.style.color = "green";
  jonJug2.style.color = "white";
  enriqueJug2.style.color = "white";
});

enriqueJug2.addEventListener("click", () => {
  psjJug2 = "/enrique/enrique";
  enriqueJug2.style.color = "green";
  jonJug2.style.color = "white";
  davidJug2.style.color = "white";
});

const botonIniciar = document.getElementById("iniciar");

psjEscogidos = setInterval(() => {
  if (psjJug1 != null && psjJug2 != null) {
    clearInterval(psjEscogidos);
    botonIniciar.style.color = "white";
    botonIniciar.addEventListener("click", () => {
      iniciar();
    });
  }
}, 100);

// Se declara fuera de la función para poder detener el tiempo cuando se reinicie el juego
var timeout;
var animationFrameIds = [];

function iniciar() {
  document.getElementById("vidaJug1").style.clipPath = "inset(0% 0% 0% 0%)";
  document.getElementById("vidaJug2").style.clipPath = "inset(0% 0% 0% 0%)";
  document.getElementById("vidaJug1").style.backgroundColor = "rgb(109, 223, 94)";
  document.getElementById("vidaJug2").style.backgroundColor = "rgb(109, 223, 94)";
  resultado.innerHTML = "";
  clearTimeout(timeout);
  animationFrameIds.forEach((id) => {
    cancelAnimationFrame(id);
  });
  const seleccionPersonajes = document.querySelectorAll(".seleccionPersonajes");
  seleccionPersonajes.forEach((selector) => {
    selector.style.display = "none";
  });

  //Creamos un constante para el fondo utilizando la clase sprite
  const fondo = new Sprite({
    posicion: {
      x: 0,
      y: 0,
    },
    imagenSrc: "./img/fondov2.png",
  });

  // Creamos una constante para el jugador1 utilizando la clase Jugador, pasandole el parametro de posicion como un objeto con con las coordenadas x,y en pixeles
  const jugador1 = new Jugador({
    nombre: "jugador1",
    posicion: {
      x: 50,
      y: 100,
    },
    color: "green",
    direccion: {
      x: 0,
      y: 0,
    },
    posicionLateral: {
      x: 0,
    },
    imagenSrc: "./img/sprites/" + psjJug1 + "Base.png",
    cantSprites: 2,
    escala: 2.8,
    hitboxTemporal: {
      x: 0,
      y: -25,
    },
    sprites: {
      quieto: {
        imagenSrc: "./img/sprites/" + psjJug1 + "Base.png",
        cantSprites: 2,
      },
      moviendo: {
        imagenSrc: "./img/sprites/" + psjJug1 + "Corriendo.png",
        cantSprites: 4,
      },
      salto: {
        imagenSrc: "./img/sprites/" + psjJug1 + "Salto.png",
        cantSprites: 4,
      },
      ataque: {
        imagenSrc: "./img/sprites/" + psjJug1 + "Ataque.png",
        cantSprites: 5,
      },
      proteccion: {
        imagenSrc: "./img/sprites/" + psjJug1 + "Proteccion.png",
        cantSprites: 3,
      },
      muerte: {
        imagenSrc: "./img/sprites/" + psjJug1 + "Muerte.png",
        cantSprites: 2,
      },
    },
  });

  // jugador1.pruebaMostrarPersonaje();

  const jugador2 = new Jugador({
    nombre: "jugador2",

    posicion: {
      x: canvas.width - 150,
      y: 100,
    },
    color: "red",
    direccion: {
      x: 0,
      y: 0,
    },
    posicionLateral: {
      x: 150,
      y: 1000,
    },
    imagenSrc: "./img/sprites/" + psjJug2 + "Base.png",
    cantSprites: 2,
    escala: 2.8,
    hitboxTemporal: {
      x: -100,
      y: -25,
    },
    sprites: {
      quieto: {
        imagenSrc: "./img/sprites/" + psjJug2 + "Base.png",
        cantSprites: 2,
      },
      moviendo: {
        imagenSrc: "./img/sprites/" + psjJug2 + "Corriendo.png",
        cantSprites: 4,
      },
      salto: {
        imagenSrc: "./img/sprites/" + psjJug2 + "Salto.png",
        cantSprites: 4,
      },
      ataque: {
        imagenSrc: "./img/sprites/" + psjJug2 + "Ataque.png",
        cantSprites: 5,
      },
      proteccion: {
        imagenSrc: "./img/sprites/" + psjJug2 + "Proteccion.png",
        cantSprites: 3,
      },
      muerte: {
        imagenSrc: "./img/sprites/" + psjJug2 + "Muerte.png",
        cantSprites: 2,
      },
    },
  });

  // jugador2.pruebaMostrarPersonaje();

  const teclas = {
    a: {
      presionada: false,
    },
    d: {
      presionada: false,
    },
    flechaIzquierda: {
      presionada: false,
    },
    flechaDerecha: {
      presionada: false,
    },
  };

  window.addEventListener("keydown", (event) => {
    // console.log(event.key);
    if (!jugador1.muerto) {
      switch (event.key) {
        case "w":
          jugador1.direccion.y = -6;
          break;
        case "s":
          jugador1.direccion.y = 6;
          jugador1.realizarProteccion();
          break;
        case "a":
          teclas.a.presionada = true;
          break;
        case "d":
          teclas.d.presionada = true;
          break;
        case " ":
          jugador1.realizarAtaque();
          break;
      }
    }

    if (!jugador2.muerto) {
      switch (event.key) {
        case "ArrowUp":
          jugador2.direccion.y = -6;
          break;
        case "ArrowDown":
          jugador2.direccion.y = 6;
          jugador2.realizarProteccion();
          break;
        case "ArrowLeft":
          teclas.flechaIzquierda.presionada = true;
          break;
        case "ArrowRight":
          teclas.flechaDerecha.presionada = true;
          break;
        case "Enter":
          jugador2.realizarAtaque();
          break;
      }
    }
  });

  window.addEventListener("keyup", (event) => {
    // console.log(event.key);
    switch (event.key) {
      case "w":
        jugador1.direccion.y = 0;
        break;
      case "s":
        jugador1.direccion.y = 0;
        break;
      case "ArrowUp":
        jugador2.direccion.y = 0;
        break;
      case "ArrowDown":
        jugador2.direccion.y = 0;
        break;
      case "a":
        teclas.a.presionada = false;
        break;
      case "d":
        teclas.d.presionada = false;
        break;
      case "ArrowLeft":
        teclas.flechaIzquierda.presionada = false;
        break;
      case "ArrowRight":
        teclas.flechaDerecha.presionada = false;
        break;
    }
  });

  // recibe el objeto de cada jugar al completo poder utilizar sus propiedades
  function colisionAtaque({ jugadorAtacante, jugadorAtacado }) {
    return (
      jugadorAtacante.ataque.posicion.x + jugadorAtacante.ataque.width >=
        jugadorAtacado.posicion.x &&
      jugadorAtacante.ataque.posicion.x <=
        jugadorAtacado.posicion.x + jugadorAtacado.anchura &&
      jugadorAtacante.ataque.posicion.y + jugadorAtacante.ataque.height >=
        jugadorAtacado.posicion.y &&
      jugadorAtacante.ataque.posicion.y <=
        jugadorAtacado.posicion.y + jugadorAtacado.altura
    );
  }

  function resetearTiempo() {
    tiempo = 60;
    tiempoRestante();
  }



  //Restar el contador, añadir condiciones de victoria y empate
  function tiempoRestante() {
    timeout = setTimeout(tiempoRestante, 1000);
    if (tiempo >= 0) {
      document.getElementById("contador").innerHTML = tiempo;
      tiempo--;
    } else if (tiempo <= 0) {
      animationFrameIds.forEach((id) => {
        cancelAnimationFrame(id);
      });
      clearTimeout(timeout);
      if (jugador1.vida > jugador2.vida) {
        // alert("Tiempo agotado, gana jugador 1");
        resultado.innerHTML = "Tiempo agotado, ¡gana el jugador 1!";
      } else if (jugador2.vida > jugador1.vida) {
        // alert("Tiempo agotado, gana jugador 2");
        resultado.innerHTML = "Tiempo agotado, ¡gana el jugador 2!";
      } else {
        // alert("Tiempo agotado, empate")
        resultado.innerHTML = "Tiempo agotado, ¡empate!";
      }
    }

    if (jugador1.vida <= 0) {
      clearTimeout(timeout);
      //cancelAnimationFrame(animationFrameId);
      // alert("jugador 2 gana");
      resultado.innerHTML = "¡Gana el jugador 2!";
    } else if (jugador2.vida <= 0) {
      clearTimeout(timeout);
      //cancelAnimationFrame(animationFrameId);
      // alert("Jugador 1 gana");
      resultado.innerHTML = "¡Gana el jugador 1!";
    }
  }

  resetearTiempo();

  function movimiento() {
    // sirve para hacer que el navegador redibuje el contenido continuamente al llamar a esta misma funcion

    animationFrameIds.push(window.requestAnimationFrame(movimiento));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pruebas colision entre personajes
    if (
      jugador1.posicion.x + jugador1.anchura >= jugador2.posicion.x &&
      jugador1.posicion.x <= jugador2.posicion.x + jugador2.anchura
    ) {
      if (
        jugador1.posicion.y + jugador1.altura >= jugador2.posicion.y &&
        jugador1.posicion.y <= jugador2.posicion.y + jugador2.altura
      ) {
        jugador1.direccion.x -= 4;
        jugador2.direccion.x += 4;
      }
    }
    fondo.actualizar();
    jugador1.actualizar();
    jugador2.actualizar();

    jugador1.direccion.x = 0;
    jugador2.direccion.x = 0;

    if (teclas.a.presionada) {
      jugador1.direccion.x = -4;
      jugador1.cambiarSprite("moviendo");
    } else if (teclas.d.presionada) {
      jugador1.direccion.x = 4;
      jugador1.cambiarSprite("moviendo");
    } else {
      jugador1.cambiarSprite("quieto");
    }

    if (jugador1.direccion.y < 0) {
      jugador1.cambiarSprite("salto");
    }

    if (teclas.flechaIzquierda.presionada) {
      jugador2.direccion.x = -4;
      jugador2.cambiarSprite("moviendo");
    } else if (teclas.flechaDerecha.presionada) {
      jugador2.direccion.x = 4;
      jugador2.cambiarSprite("moviendo");
    } else {
      jugador2.cambiarSprite("quieto");
    }

    if (jugador2.direccion.y < 0) {
      jugador2.cambiarSprite("salto");
    }

    // ataques

    if (
      colisionAtaque({ jugadorAtacante: jugador1, jugadorAtacado: jugador2 }) &&
      jugador1.atacando &&
      !jugador2.proteccion
    ) {
      jugador1.atacando = false;
      // console.log("ataque jug1");
      jugador2.vida -= 10;
      // document.getElementById("vidaJug2").style.width = jugador2.vida + "%";
      document.getElementById("vidaJug2").style.clipPath = `inset(0% ${
        100 - jugador2.vida
      }% 0% 0%)`;
      if (jugador2.vida == 70) {
        document.getElementById("vidaJug2").style.backgroundColor = "rgb(223, 204, 94)";
      } else if (jugador2.vida == 50) {
        document.getElementById("vidaJug2").style.backgroundColor = "rgb(216, 132, 63)";
      } else if (jugador2.vida == 20) {
        document.getElementById("vidaJug2").style.backgroundColor = "rgb(219, 61, 61)";
      }

      if (jugador2.vida <= 0) {
        jugador2.cambiarSprite("muerte");
      }
    }

    if (
      colisionAtaque({ jugadorAtacante: jugador2, jugadorAtacado: jugador1 }) &&
      jugador2.atacando &&
      !jugador1.proteccion
    ) {
      jugador2.atacando = false;
      jugador1.vida -= 10;
      // document.getElementById("vidaJug1").style.width = jugador1.vida + "%";
      document.getElementById("vidaJug1").style.clipPath = `inset(0% ${
        100 - jugador1.vida
      }% 0% 0%)`;

      if (jugador1.vida == 70) {
        document.getElementById("vidaJug1").style.backgroundColor = "rgb(223, 204, 94)";
      } else if (jugador1.vida == 50) {
        document.getElementById("vidaJug1").style.backgroundColor = "rgb(216, 132, 63)";
      }  else if (jugador1.vida == 20) {
        document.getElementById("vidaJug1").style.backgroundColor = "rgb(219, 61, 61)";
      }
      // console.log("ataque jug2");
      if (jugador1.vida <= 0) {
        jugador1.cambiarSprite("muerte");
      }
    }
  }

  movimiento();

  // En pantallas inferiores a 100hz se ejecuta la funcion de movimiento para compensar la falta de frames ya que de no ser ai los jugadores se mueven mas lento y con bastante delay
  let incializado = false;
  function fpsMeter() {
    let prevTime = Date.now(),
      frames = 0;

    animationFrameIds.push(requestAnimationFrame(function loop() {
      const time = Date.now();
      frames++;
      if (time > prevTime + 1000) {
        let fps = Math.round((frames * 1000) / (time - prevTime));
        prevTime = time;
        frames = 0;

        console.log("FPS:" + fps);
        if (fps < 100) {
          movimiento();
          movimiento();
        }
        incializado = true;
      }

      if (!incializado) requestAnimationFrame(loop);
    }));
  }

  fpsMeter();

  const personajes = document.getElementById("personajes");

  personajes.addEventListener("click", () => {
    clearTimeout(timeout);
    animationFrameIds.forEach((id) => {
      cancelAnimationFrame(id);
    });    contador.innerHTML = "";
    jugador1.vida = 100;
    jugador2.vida = 100;
    jugador1.posicion.x = 50;
    jugador1.posicion.y = 100;
    jugador2.posicion.x = canvas.width - 150;
    jugador2.posicion.y = 100;
    document.getElementById("vidaJug1").style.clipPath = "inset(0% 0% 0% 0%)";
    document.getElementById("vidaJug2").style.clipPath = "inset(0% 0% 0% 0%)";
    document.getElementById("vidaJug1").style.backgroundColor = "rgb(109, 223, 94)";
    document.getElementById("vidaJug2").style.backgroundColor = "rgb(109, 223, 94)";
    document.getElementById("resultado").innerHTML = "";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const seleccionPersonajes = document.querySelectorAll(
      ".seleccionPersonajes"
    );
    seleccionPersonajes.forEach((selector) => {
      selector.style.display = "block";
    });
  });
}
