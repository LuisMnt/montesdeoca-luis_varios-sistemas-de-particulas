let sistemasParticulas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // update y display de cada sistema de particulas
  for (let sistema of sistemasParticulas) {
    sistema.display();
    sistema.update();
  }
}

function mouseClicked() {
  // Crea un nuevo sistema de particulas en la posición del clic
  let nuevoSistema = new SistemaParticulas(mouseX, mouseY);
  sistemasParticulas.push(nuevoSistema);
}

class SistemaParticulas {
  constructor(x, y) {
    // Inicializa la posición del sistema y genera particulas aleatorias
    this.posicion = createVector(x, y);
    this.particulas = [];
    for (let i = 0; i < 100; i++) {
      let px = random(-100, 100);
      let py = random(-100, 100);
      this.particulas.push(
        new Particula(this.posicion.x + px, this.posicion.y + py)
      );
    }
  }

  update() {
    // Actualizar partículaa del sistema
    for (let particula of this.particulas) {
      particula.verificarLimites(this);
      particula.update();
    }
  }

  display() {
    //cuadrado invisible
    noFill();
    noStroke();
    rectMode(CENTER);
    rect(this.posicion.x, this.posicion.y, 200, 200);
    for (let particula of this.particulas) {
      particula.display();
    }
  }
}

class Particula {
  constructor(x, y) {
    this.posicion = createVector(x, y);
    this.velocidad = createVector(random(-3, 3), random(-3, 3));
    this.radio = 5;
  }

  update() {
    this.posicion.add(this.velocidad);
  }

  display() {
    fill(0);
    noStroke();
    circle(this.posicion.x, this.posicion.y, this.radio * 2);
  }

  verificarLimites(sistema) {
    // Verifica y aplica rebotes
    if (
      this.posicion.x - this.radio < sistema.izquierda() ||
      this.posicion.x + this.radio > sistema.derecha()
    ) {
      this.velocidad.x *= -1;
    }

    if (
      this.posicion.y - this.radio < sistema.arriba() ||
      this.posicion.y + this.radio > sistema.abajo()
    ) {
      this.velocidad.y *= -1;
    }
  }
}

SistemaParticulas.prototype.izquierda = function () {
  // Definir pared de rebote izq
  return this.posicion.x - 100;
};

SistemaParticulas.prototype.derecha = function () {
  // Definir pared de rebote der
  return this.posicion.x + 100;
};

SistemaParticulas.prototype.arriba = function () {
  // Definir pared de rebote super
  return this.posicion.y - 100;
};

SistemaParticulas.prototype.abajo = function () {
  // Definir pared de rebote inf
  return this.posicion.y + 100;
};
