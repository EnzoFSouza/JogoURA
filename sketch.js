let canvas;
let screen = "menu";

var xVoltar = 10;
var yVoltar = 700;
var wVoltar = 100;
var hVoltar = 50;

function setup() {
  createCanvas(800, 800);
  this.tetris = new Tetris(10, 20);
  this.timer = new Timer();
  frameRate(60);
  palletteMono = [];
  for (let i = 0; i < pallette.length; i++) {
    let rgb = pallette[i];
    let gray = rgb[0] + rgb[1] + rgb[2];
    palletteMono[i] = [];
    palletteMono[i][0] = 255 * gray;
    palletteMono[i][1] = 255 * gray;
    palletteMono[i][2] = 255 * gray;
  }
}

function draw() {
  background('#0084FF');
  if (screen == "menu") {
    showMenu();
  } 
  
  else if (screen === "jogo") {
    if (this.timer.updateStep()) {
      applyInput(25);
    }
    this.tetris.update(); // Atualiza o jogo
    //this.tetris.display(canvas); 
    this.tetris.display(this); // Exibe o jogo
    botaoVoltar(xVoltar, yVoltar, wVoltar, hVoltar);
  }
  
  else if (screen == "instrucoes") {
    instrucoes();
    botaoVoltar(xVoltar, yVoltar, wVoltar, hVoltar);
  }
  
  else if (screen == "aprender") {
    aprender();
    botaoVoltar(xVoltar, yVoltar, wVoltar, hVoltar);
  }
  
  else if (screen == "sobre") {
    sobreURA();
    botaoVoltar(xVoltar, yVoltar, wVoltar, hVoltar);
  }
}

// Exibe o menu principal
function showMenu() {
  textSize(68);
  fill('white');
  textAlign(LEFT, BOTTOM);
  text("Um Robô por Aluno", (width/2) - 300, (height / 3) - 150);
  textSize(60);
  text("Tetris", (width/2) - 75, (height/3) - 25);

  //botao jogar
  textSize(32);
  fill(255);
  stroke('black');
  rect((width / 2) - 100, (height / 2) - 25, 200, 50, 10);
  noStroke();
  fill(0);
  text("Jogar", (width / 2) - 40, (height / 2) + 20);
  
  //botao instrucoes
  textSize(32);
  fill(255);
  stroke('black');
  rect((width / 2) - 100, (height / 2) + 50, 200, 50, 10);
  fill(0);
  noStroke();
  text("Instruções", (width / 2) - 70, (height / 2) + 90);
  
  //botao aprender
  textSize(32);
  fill(255);
  stroke('black');
  rect((width / 2) - 100, (height / 2) + 125, 200, 50, 10);
  fill(0);
  noStroke();
  text("Aprender", (width / 2) - 65, (height / 2) + 165);
  
  //botao sobre
  textSize(32);
  fill(255);
  stroke('black');
  rect((width / 2) - 100, (height / 2) + 200, 200, 50, 10);
  fill(0);
  noStroke();
  text("Sobre o URA", (width / 2) - 95, (height / 2) + 240);
  
  
}

function instrucoes(){
  textSize(60);
  fill('white');
  text("Instruções", 20, 70);
  
  textSize(50);
  text("Cima - Rotacionar", 20, 200);
      
  text("Esquerda - Mover para Esquerda", 20, 260);
      
  text("Direita - Mover para Direita", 20, 320);

  text("Baixo - Mover para Baixo", 20, 380);
  
  text("Espaço - Pausa", 20, 440);
      
  text("Enter - Restart", 20, 500);
}

function aprender(){
  textSize(60);
  fill('white');
  text("Aprender", 20, 70);
  textSize(30);
  text("O Software, lida com os códigos.\nJá o Hardware é responsável por lidar com o físico.", 50, 170);
  text("Arduino é um microcontrolador, ou seja, 'um cérebro' \nque controla outros sensores, como LEDs.", 50, 260);
  text("Através da combinação de Software e Hardware, é \npossível criar robôs para os mais diversos objetivos.", 50, 350);
}

function sobreURA(){
  textSize(60);
  fill('white');
  text("Sobre o URA", 20, 70);
  textSize(30);
  text("Projeto que tem como objetivo democratizar o acesso\nà robótica e à educação.", 50, 170);
}

function botaoVoltar(xVoltarF, yVoltarF, wVoltarF, hVoltarF){
  //o F no final significa que são variáveis da função, e não globais
  fill('white');
  stroke('black');
  rect(xVoltarF, yVoltarF, wVoltarF, hVoltarF, 10);
  textSize(30);
  fill('black');
  textAlign(LEFT, BOTTOM);
  noStroke();
  text("Voltar", xVoltarF + 10, yVoltarF + 40);
}

function mousePressed() {
  if (screen == "menu") {
    if (mouseX >= (width / 2) - 100 && mouseX <= (width / 2) + 100){
      if(mouseY >= (height / 2) - 25 && mouseY <= (height / 2) + 25) {
        //console.log("jogo");
        screen = "jogo";
      }
      else if(mouseY >= (height / 2) + 50 && mouseY <= (height/2) + 100){
        //console.log("instrucoes");
        screen = "instrucoes";
      }
      else if(mouseY >= (height / 2) + 125 && mouseY <= (height/2) + 175){
        //console.log("aprender");
        screen = "aprender";
      }
      else if(mouseY >= (height / 2) + 200 && mouseY <= (height/2) + 250){
        //console.log("sobre");
        screen = "sobre";
      }
    }
  }
  
  else{
    if( mouseX >= xVoltar && mouseX <= xVoltar + wVoltar && mouseY >= yVoltar && mouseY <= yVoltar + hVoltar){
      screen = "menu";
    }
  }
  
}



let keyPressUp = false;
let keyPressDown = false;
let keyPressLeft = false;
let keyPressRight = false;
var shapeList = [
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 2, 0, 0, 2, 0, 0, 2, 2], 
  [0, 3, 0, 0, 3, 0, 3, 3, 0], 
  [4, 4, 0, 0, 4, 4, 0, 0, 0],
  [0, 5, 5, 5, 5, 0, 0, 0, 0], 
  [0, 0, 0, 6, 6, 6, 0, 6, 0], 
  [7, 7, 7, 7], 
];
var palletteMono = [];
var pallette = [
  [255, 255, 255], // Branco
  [255, 255, 255], // Branco novamente
  [230, 230, 230], // Cinza
  [230, 230, 230], // Cinza novamente
  [16, 128, 255], // Azul 1
  [70, 102, 242], // Azul 2
  [236, 247, 30], // Amarelo
  [236, 247, 30], // Amarelo novamente
];

function applyInput(newDelay) {
  if (this.tetris.pause) return;
  if (keyPressUp) this.tetris.rotate = true;
  if (keyPressDown) this.tetris.ty = +1;
  if (keyPressLeft) this.tetris.tx = -1;
  if (keyPressRight) this.tetris.tx = +1;
  this.timer.reset(newDelay);
}
function keyPressed() {
  if (keyCode == 32) this.tetris.pause = !this.tetris.pause;
  if (keyCode == 13) this.tetris.restart = true;
  keyPressUp |= keyCode === UP_ARROW;
  keyPressDown |= keyCode === DOWN_ARROW;
  keyPressLeft |= keyCode === LEFT_ARROW;
  keyPressRight |= keyCode === RIGHT_ARROW;
  applyInput(200);
}
function keyReleased() {
  keyPressUp ^= keyCode === UP_ARROW;
  keyPressDown ^= keyCode === DOWN_ARROW;
  keyPressLeft ^= keyCode === LEFT_ARROW;
  keyPressRight ^= keyCode === RIGHT_ARROW;
}
class Tetris {
  constructor(nx, ny) {
    this.tGrid = new TGrid(nx, ny);
    this.timer = new Timer();
    this.restartGame();
    this.shapeNext = undefined;
    this.pickNextShape();
  }
  restartGame() {
    this.tGrid.clearGrid();
    this.restart = false;
    this.pause = false;
    this.gameOver = false;
    this.spawn = true;
    this.rotate = false;
    this.tx = this.ty = 0;
    this.level = 1;
    this.rowsPerLevel = 5;
    this.rowsCompleted = 0;
    this.shapesCount = 0;
    this.timer.reset(600);
  }
  pickNextShape() {
    this.shapeCurr = this.shapeNext;
    var indexNext = parseInt(random(shapeList.length));
    this.shapeNext = shapeList[indexNext].slice();
  }
  update() {
    if (this.restart) {
      this.restartGame();
    }
    if (this.pause) {
      return;
    }
    //   Forma nova
    if (this.spawn) {
      this.pickNextShape();
      this.tGrid.setShape(this.shapeCurr);
      this.shapesCount++;
      this.spawn = false;
    }
    // Atualiza a fase
    this.level += floor(this.rowsCompleted / this.rowsPerLevel);
    this.rowsCompleted %= this.rowsPerLevel;
    this.timer.duration = ceil(800 / sqrt(this.level));
    // Checa se o jogador perdeu o jogo
    this.gameOver = this.tGrid.collision(0, 0);
    if (this.gameOver) {
      return;
    }
    // 
    if (this.rotate) this.tGrid.rotateShape();
    if (!this.tGrid.collision(this.tx, 0)) this.tGrid.sx += this.tx;
    if (!this.tGrid.collision(0, this.ty)) this.tGrid.sy += this.ty;
    // Apply game step
    if (this.timer.updateStep()) {
      if (!this.tGrid.collision(0, 1)) {
        if (this.ty == 0) {
          this.tGrid.sy++;
        }
      } else {
        this.tGrid.splatShape();
        this.rowsCompleted += this.tGrid.updateRows();
        this.spawn = true;
      }
    }
    
    this.rotate = false;
    this.tx = this.ty = 0;
  }
  display(canvas) {
    var off, x, y, w, h, cell;
    var canvasW = canvas.width;
    var canvasH = canvas.height;
    off = 40;
    h = canvasH - 2 * off;
    w = canvasW - 2 * off;
    cell = ceil(Math.min(w / this.tGrid.nx, h / this.tGrid.ny));
    w = this.tGrid.nx * cell;
    h = this.tGrid.ny * cell;
    x = parseInt((canvasW - w) / 2.0);
    y = parseInt((canvasH - h) / 2.0);
    canvas.background('#0084FF'); //background maior
    canvas.strokeWeight(1);
    canvas.noStroke();
    canvas.fill(16);
    canvas.rect(x - 4, y - 4, w + 8, h + 8);
    canvas.fill(32);
    canvas.rect(x - 1, y - 1, w + 3, h + 3);
    // Tela do jogo
    var colors = this.pause || this.gameOver ? palletteMono : pallette;
    this.displayGrid(canvas, x, y, w, h, colors);
    // Spoiler da peça
    {
      var _w = x - 2 * off;
      var _h = canvasH - 2 * off;
      var _y = off;
      var _x = off + x + w;
      this.displayNextShape(canvas, _x, _y, _w, _h);
    }
    // Cabeçario
    {
      var ty = off + 30;
      var tx = x + w + x / 2;
      var txtTitle = "Tetris";
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.textSize(60);
      canvas.fill(20); //cor das informações do lado
      canvas.text(txtTitle, tx, ty);
    }
    // Nivel do jogo, ...
    {
      var ty = canvasH / 2 - 140;
      var tx1 = x + w + x / 2;
      var txtLevel = "Nível " + this.level;
      var txtProgress = "Linhas " + this.rowsCompleted + "/" + this.rowsPerLevel;
      var txtShapes = "Peças: " + this.shapesCount;
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.fill(0); //cor das informações do lado
      canvas.textSize(34);
      canvas.text(txtLevel, tx1, ty);
      canvas.fill(6); //cor das informações do lado
      canvas.textSize(20);
      canvas.text(txtShapes, tx1, (ty + 28));
      canvas.text(txtProgress, tx1, (ty + 50));
    }
    // Status
    var txtGameStatus = undefined;
    if (this.gameOver) txtGameStatus = "FIM DE JOGO";
    if (this.pause) txtGameStatus = "PAUSA";
    if (txtGameStatus !== undefined) {
      canvas.textSize(80);
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.fill(0);
      canvas.text(txtGameStatus, canvasW / 2 + 2, canvasH / 2 + 1);
      canvas.fill(255, 224, 0);
      canvas.text(txtGameStatus, canvasW / 2, canvasH / 2);
    }
  }
  displayGrid(pg, x, y, w, h, pallette) {
    var nx = this.tGrid.nx;
    var ny = this.tGrid.ny;
    var cw = w / nx;
    var ch = h / ny;
    // BG
    for (var gy = 0; gy < ny; gy++) {
      for (var gx = 0; gx < nx; gx++) {
        var cx = x + gx * cw;
        var cy = y + gy * ch;
        pg.stroke(44);
        if ((gx & 1) == 1) {
          pg.fill(66); //quadrados do jogo
        } else {
          pg.fill(77); //quadrados do jogo
        }
        pg.rect(cx, cy, cw, ch);
      }
    }
    // FG
    for (var gy = 0; gy < ny; gy++) {
      for (var gx = 0; gx < nx; gx++) {
        var cx = x + gx * cw;
        var cy = y + gy * ch;
        var valGrid = this.tGrid.getGridVal(gx, gy);
        if (valGrid > 0) {
          pg.stroke(0);
          var rgb = pallette[valGrid % pallette.length];
          pg.fill(rgb[0], rgb[1], rgb[2]); //preenche a cor das peças que já pararam
          pg.rect(cx, cy, cw, ch);
        }
      }
    }
    // Forma
    var ks = this.tGrid.shapeSize;
    var kr = ceil(this.tGrid.shapeSize / 2.0);
    for (var ky = 0; ky < ks; ky++) {
      for (var kx = 0; kx < ks; kx++) {
        var gx = this.tGrid.sx + kx - kr;
        var gy = this.tGrid.sy + ky - kr;
        var cx = x + gx * cw;
        var cy = y + gy * ch;
        var valShape = this.tGrid.getShapeVal(kx, ky);
        if (valShape != 0) {
          pg.stroke(0);
          var rgb = pallette[valShape % pallette.length];
          pg.fill(rgb[0], rgb[1], rgb[2]); //dá cor às formas que caem no jogo
          pg.rect(cx, cy, cw, ch);
        }
      }
    }
  }
  displayNextShape(pg, x, y, w, h) {
    var shape = this.shapeNext;
    var shapeSize = parseInt(sqrt(shape.length));
    var ks = shapeSize;
    var kr = shapeSize / 2.0;
    var cw = min(w / 5.0, h / 5.0);
    var ch = cw;
    for (var ky = 0; ky < ks; ky++) {
      for (var kx = 0; kx < ks; kx++) {
        var gx = kx - kr;
        var gy = ky - kr;
        var cx = x + gx * cw + w / 2.0;
        var cy = y + gy * ch + h / 2.0;
        cx = parseInt(cx);
        cy = parseInt(cy);
        var valShape = shape[ky * shapeSize + kx];
        if (valShape != 0) {
          pg.fill(255); //interior do quadrado que contém prox peca
        } else {
          pg.fill(66); //exterior
        }
        pg.stroke(64);
        pg.rect(cx, cy, cw, ch);
      }
    }
  }
}

class Timer {
  constructor() {
    this.duration = 600;
    this.time = 0;
  }
  reset(duration) {
    this.setTime();
    this.duration = duration;
  }
  setTime() {
    this.time = millis();
  }
  getTime() {
    return millis() - this.time;
  }
  updateStep() {
    if (this.getTime() >= this.duration) {
      this.setTime();
      return true;
    }
    return false;
  }
}

class TGrid {
  constructor(nx, ny) {
    this.nx = nx;
    this.ny = ny;
    this.grid = [];
    this.grid.length = nx * ny;
    this.clearGrid();
    this.setShape([0]);
  }
  clearGrid() {
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = 0;
    }
  }
  isInsideGrid(x, y) {
    return x >= 0 && x < this.nx && y >= 0 && y < this.ny;
  }
  setShape(shape) {
    this.shape = shape;
    this.shapeSize = parseInt(sqrt(shape.length));
    this.sx = ceil(this.nx / 2);
    this.sy = ceil(this.shapeSize / 2);
  }
  getGridVal(x, y) {
    if (!this.isInsideGrid(x, y)) {
      return -1;
    } else {
      return this.grid[y * this.nx + x];
    }
  }
  setGridVal(x, y, val) {
    this.grid[y * this.nx + x] = val;
  }
  getShapeVal(x, y) {
    return this.shape[y * this.shapeSize + x];
  }
  rotateShapeDir(CW) {
    var size = this.shapeSize;
    var cpy = this.shape.slice(0);
    if (CW) {
      var ib = 0,
        ia = size * size;
      for (var y = 1; y <= size; y++, ia++) {
        for (var x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia - x * size];
        }
      }
    } else {
      var ib = 0,
        ia = -1;
      for (var y = 1; y <= size; y++, ia--) {
        for (var x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia + x * size];
        }
      }
    }
  }
  rotateShape() {
    this.rotateShapeDir(true);
    if (this.collision(0, 0)) {
      this.rotateShapeDir(false);
    }
  }

  collision(tx, ty) {
    var ks = this.shapeSize;
    var kr = ceil(this.shapeSize / 2);
    for (var ky = 0; ky < ks; ky++) {
      for (var kx = 0; kx < ks; kx++) {
        var px = this.sx + kx - kr + tx;
        var py = this.sy + ky - kr + ty;
        var valGrid = this.getGridVal(px, py);
        var valShape = this.getShapeVal(kx, ky);
        if (valGrid * valShape != 0) {
          return true;
        }
      }
    }
    return false;
  }
  updateRows() {
    var rows = 0;
    for (var gy = 0; gy < this.ny; gy++) {
      var rowCompleted = true;
      for (var gx = 0; gx < this.nx; gx++) {
        var gi = gy * this.nx + gx;
        if (this.grid[gi] == 0) rowCompleted = false;
      }
      if (rowCompleted) {
        this.grid.copyWithin(this.nx, 0, gy * this.nx);
        rows++;
      }
    }
    if (rows > 0) {
      for (var gx = 0; gx < this.nx; gx++) {
        this.grid[gx] = 0;
      }
    }
    return rows;
  }
  splatShape() {
    let ks = this.shapeSize;
    let kr = ceil(this.shapeSize / 2);
    for (let ky = 0; ky < ks; ky++) {
      for (let kx = 0; kx < ks; kx++) {
        let px = this.sx + kx - kr;
        let py = this.sy + ky - kr;
        let valShape = this.getShapeVal(kx, ky);
        if (valShape != 0) {
          this.setGridVal(px, py, valShape);
        }
      }
    }
  }
}