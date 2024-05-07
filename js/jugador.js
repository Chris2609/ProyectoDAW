class Jugador extends Sprite{

    // Un constructor indica que parametros va a tener un objeto de la clase Sprite
    constructor({nombre, posicion, color, direccion, posicionLateral, imagenSrc, escala = 1, cantSprites = 1, hitboxTemporal = { x: 0, y: 0 }, velocidadSprite = 30, sprites}){

        super({posicion, imagenSrc, escala, cantSprites, hitboxTemporal})
        this.nombre = nombre
        this.color = color
        this.direccion = direccion
        this.altura = 200
        this.anchura = 100
        this.ataque = {
            posicion: {
                x: this.posicion.x,
                y: this.posicion.y
            },
            posicionLateral: {
                x: posicionLateral.x,
                y: posicionLateral.y
            
            },
            width: 250,
            height: 125,
        }
        this.atacando = false;
        this.vida = 100;

        this.spriteActual = 0;
        this.spritesPasados = 0;
        this.velocidadSprite = velocidadSprite;
        this.sprites = sprites;

        for(const sprite in this.sprites){
            sprites[sprite].imagen = new Image();
            sprites[sprite].imagen.src = sprites[sprite].imagenSrc;
        }

    }

    actualizar(){
        this.mostrarSprite();
        this.animacionSprite();
    
        this.ataque.posicion.x = this.posicion.x - this.ataque.posicionLateral.x;
        this.ataque.posicion.y = this.posicion.y;
        
        ctx.fillRect(this.ataque.posicion.x, this.ataque.posicion.y, this.ataque.width, this.ataque.height);
        
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
        this.velocidadSprite = 6;
        this.cambiarSprite('ataque');
        this.atacando = true;
        setTimeout(() => {
            this.atacando = false;
            this.velocidadSprite = 30; // Restaurar la velocidad del sprite a 30
        }, 100);
    }

    cambiarSprite(sprite){
        try {
            if(this.imagen === this.sprites.ataque.imagen && this.spriteActual < this.sprites.ataque.cantSprites - 1) return;

        } catch (error) {
            
        }
        
       switch (sprite) {
        case 'quieto':
            if (this.imagen !== this.sprites.quieto.imagen) {
                this.imagen = this.sprites.quieto.imagen;
                this.cantSprites = this.sprites.quieto.cantSprites;
                this.spriteActual = 0;
            }
            break;
        case 'moviendo':
            if (this.imagen !== this.sprites.moviendo.imagen) {
                this.imagen = this.sprites.moviendo.imagen;
                this.cantSprites = this.sprites.moviendo.cantSprites;
                this.spriteActual = 0;
            }
            break;
        case 'salto':
            if (this.imagen !== this.sprites.salto.imagen) {
                this.imagen = this.sprites.salto.imagen;
                this.cantSprites = this.sprites.salto.cantSprites;
                this.spriteActual = 0;
            }
            break;
       case 'ataque':
            if (this.imagen !== this.sprites.ataque.imagen) {
                this.imagen = this.sprites.ataque.imagen;
                this.cantSprites = this.sprites.ataque.cantSprites;
                this.spriteActual = 0;
            }
            break;
      
       }
    }
}