const gravedad = 0.2;

// Como va a haber mas de 1 sprite vamos a utilizar clases
class Sprite {
  // Un constructor indica que parametros va a tener un objeto de la clase Sprite
  constructor({ posicion, imagenSrc, escala = 1, cantSprites = 1, hitboxTemporal = { x: 0, y: 0 }}) {
    this.posicion = posicion;
    this.altura = 200;
    this.anchura = 100;
    this.imagen = new Image();
    this.imagen.src = imagenSrc;
    this.escala = escala;
    this.cantSprites = cantSprites;
    this.spriteActual = 0;
    this.spritesPasados = 0;
    this.velocidadSprite = 5;
    this.hitboxTemporal = hitboxTemporal;
  }

  mostrarSprite() {
    ctx.drawImage(
      this.imagen,
      this.spriteActual * (this.imagen.width / this.cantSprites),
      0,
      this.imagen.width / this.cantSprites,
      this.imagen.height,
      this.posicion.x - this.hitboxTemporal.x,
      this.posicion.y - this.hitboxTemporal.y,
      (this.imagen.width / this.cantSprites) * this.escala,
      this.imagen.height * this.escala
    );
  }

  animacionSprite() {
    this.spritesPasados++;
    if (this.spritesPasados % this.velocidadSprite === 0) {
      if (this.spriteActual < this.cantSprites - 1) {
        this.spriteActual++;
      } else {
        this.spriteActual = 0;
      }
    }
  }

  actualizar() {
    this.mostrarSprite();
  }
}
