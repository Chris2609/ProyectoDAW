const gravedad = 0.2;

// Como va a haber mas de 1 sprite vamos a utilizar clases
class Sprite{

    // Un constructor indica que parametros va a tener un objeto de la clase Sprite
    constructor({posicion, color, direccion, posicionLateral}){
        this.posicion = posicion
        this.color = color
        this.direccion = direccion
        this.altura = 200
        this.anchura = 100
        this.ataque = {
            posicion: {
                x: this.posicion.x,
                y: this.posicion.y
            },
            posicionLateral,
            width: 200,
            height: 75,
        }
        this.atacando = false;
        this.vida = 100;
    }

    pruebaMostrarPersonaje(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicion.x, this.posicion.y, this.anchura, this.altura);

        if(this.atacando){
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.ataque.posicion.x, this.ataque.posicion.y, this.ataque.width, this.ataque.height)  
        }
    }

    mostrarSprite(){

    }

    actualizar(){
        this.pruebaMostrarPersonaje();
    }
}
