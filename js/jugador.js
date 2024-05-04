class Jugador{

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

        this.ataque.posicion.x = this.posicion.x - this.ataque.posicionLateral.x;
        this.ataque.posicion.y = this.posicion.y;
        
        this.posicion.y += this.direccion.y;
        this.posicion.x += this.direccion.x;


        // si la posicion del jugador1 es mayor o igual a la altura del canvas - 50 se queda a 50 pixeles del borde inferior, sino, se aplica la gravedad a la
        // direccion "y", haciendo que los jugadores caigan hasta que se cumple la condicion antes mencionada
        if(this.posicion.y + this.altura >= canvas.height - 40){
            this.posicion.y = canvas.height - (this.altura + 40); 
            this.direccion.y = 0;
            // this.direccion.x = 0;
        } else {
            this.direccion.y += gravedad;
        }

        
        //hacer que los personajes no se salgan de los lados del canvas
        if(this.posicion.x <= 0){
            this.posicion.x = 0;
        } else if(this.posicion.x + this.anchura >= canvas.width){
            this.posicion.x = canvas.width - this.anchura;
        }
    }

    realizarAtaque(){
        this.atacando = true;
        setTimeout(() => {
            this.atacando = false;
        }, 100);
    }
}