const gravedad = 0.2;

// Como va a haber mas de 1 sprite vamos a utilizar clases
class Sprite{

    // Un constructor indica que parametros va a tener un objeto de la clase Sprite
    constructor({posicion, imagen}){
        this.posicion = posicion
        this.altura = 200
        this.anchura = 100
        this.imagen = new Image();
        this.imagen.src = imagen;
    }

    mostrarSprite(){
        ctx.drawImage(this.imagen, this.posicion.x, this.posicion.y);
    }

    actualizar(){
        this.mostrarSprite();
    }
}