var posx1 = 50, posx2 = 50, posx3 = 50, posx4 = 490,posx5 = 490, posx6 = 490;
var yoshi_posx = 270, yoshi_posy = 400, gravidade = 0.4, velocidadeY = 0, lift = -12;
var vidas = 3, pontos = 0, recorde = 0;
var sortI = [3,6]; 
var sortII = [2,3,5,6]; 
var sortIII = [1,2,4,5]; 
var num_sorteado = 0;
var piso = 0;
var tela = 0;
var velocidadeTiro = 5, velocidadeTiro1 = 1;
var imagemInicio;
var imagemBG;
var imagemFinal;
var imageVidas;
var imagemPontos;
var yoshi = [];
var canhoes = [];
var bullet = [];
var posy1 = 265, posy2 = 372, posy3 = 480;
var frame = 0;
var tempo;
var aux_tempo = 0.1;

function setup() {
  createCanvas(540,540);
  frameRate(60);
  
}
function preload(){
  imagemInicio = loadImage("Sprites/_startScene.png");
  imagemBG = loadImage("Sprites/_backGroud.png");
  imagemVidas = loadImage("Sprites/vidas.png");
  imagemPontos = loadImage("Sprites/pontos.png");
  imagemFinal = loadImage("Sprites/gameover2.png");
  
  for(i=0;i<3;i++){
   bullet[i] =  loadImage("Sprites/Yoshi/bullet_esquerda.png");
  }
  for(i=3;i<6;i++){
   bullet[i] =  loadImage("Sprites/Yoshi/bullet_direita.png");
  }
  for(i=0;i<3;i++){
   canhoes[i] =  loadImage("Sprites/Yoshi/canhaum_esquerda.png");
  }
  for(i=3;i<6;i++){
   canhoes[i] =  loadImage("Sprites/Yoshi/canhaum_direita.png");
  }
  for(i=0;i<10;i++){
    yoshi[i] = loadImage("Sprites/Yoshi/yoshi_"+i+".png");
  }
}
function draw() {
  imageMode(CENTER);
  if (tela == 0){
     image(imagemInicio,270,270);
     vidas = 3;
     pontos = 0;
     tempo = 0;
     velocidadeTiro = 5;
     aux_tempo = 0.1;
  }
  else if(tela == 1){
    background(0);
    tempo += (1/60);
    image(imagemBG,270,270);
    image(imagemVidas,50,25);
    image(imagemPontos,50,75);
    image(yoshi[frame],yoshi_posx,yoshi_posy);
    
    image(bullet[0],posx1,posy1);
    image(bullet[1],posx2,posy2);
    image(bullet[2],posx3,posy3);
    image(bullet[3],posx4,posy1);
    image(bullet[4],posx5,posy2);
    image(bullet[5],posx6,posy3);
  
    if(keyIsDown(LEFT_ARROW)){
      if (yoshi_posx > 120){
        yoshi_posx -= 6;
        if(yoshi_posy >= 490){
          if(frame < 4){
            frame = 4;
          }
          if(frame < 7 && tempo > aux_tempo){
            frame += 1 ;
            aux_tempo = tempo+0.1;
          }else if(tempo > aux_tempo){
            frame = 4;
            aux_tempo = tempo+0.1;
          }
        }else{
          frame = 9;
        }
      }
    }
    if(keyIsDown(RIGHT_ARROW)){
      if (yoshi_posx < 460){
        yoshi_posx += 5;
        if(yoshi_posy >= 490){
          if(frame < 3 && tempo > aux_tempo){
            frame +=1 ;
            aux_tempo = tempo+0.1;
          }else if(tempo > aux_tempo){
            frame = 0;
            aux_tempo = tempo+0.1;
          }
        }else{
          frame = 8;
        }
      }
    }
    //imagem dos canhões
    image(canhoes[0],40,275);
    image(canhoes[1],40,382);
    image(canhoes[2],40,490);
    image(canhoes[3],500,275);
    image(canhoes[3],500,382);
    image(canhoes[5],500,490);
    if(num_sorteado == 0){
      if(piso == 0){
        num_sorteado = random(sortI);
      }else if(piso == 1){
        num_sorteado = random(sortII);
      }else{
        num_sorteado = random(sortIII);
      }
    }
    
    if(num_sorteado == 1  && piso == 2){
      if(posx1 < 490){ 
        posx1 +=velocidadeTiro;
        var d = dist(posx1,posy1,yoshi_posx,yoshi_posy);
        if(d < 50 && yoshi_posy < 265){
          posx1 = 50; 
          num_sorteado = 0;
          velocidadeY = lift;
          pontos += 30;
          if(pontos == 500 || pontos == 1000 || pontos == 1500 || pontos == 2000 || pontos == 3000){
           velocidadeTiro += velocidadeTiro1; 
           vidas+=1; 
          }
        }
        else if(d < 50){
          vidas -= 1;
          num_sorteado = 0;
          posx1 = 50;
        }
      }else{
        posx1 = 50;
        num_sorteado = 0;
      }
    }else if(posx1 != 50){
      posx1 = 50;
    }
    if(num_sorteado == 2 && (piso == 1 || piso == 2)){
      if(posx2 < 490){ 
        posx2 +=5;
        var d = dist(posx2,posy2,yoshi_posx,yoshi_posy);
        if(d < 50 && yoshi_posy < 365){
          posx2 = 50;
          num_sorteado = 0;
          velocidadeY = lift;
          piso = 2;
          pontos += 20;
          if(pontos == 500 || pontos == 1000 || pontos == 1500 || pontos == 2000 || pontos == 3000 ){
            velocidadeTiro += velocidadeTiro1;
            vidas+=1; 
          }
        }
        else if(d < 50){
          vidas -= 1;
          num_sorteado = 0;
          posx2 = 50;
        }
      }else if(posx2 >= 490 || (posx2 != 50)){
        posx2 = 50;
        num_sorteado = 0;
      }
    }else if(posx2 != 50){
      posx2 = 50;
    }
    if(num_sorteado == 3 && (piso == 0 || piso == 1)){
      if(posx3 < 490){ 
        posx3 +=velocidadeTiro;
        var d = dist(posx3,posy3,yoshi_posx,yoshi_posy);
        if(d < 50 && yoshi_posy < 465){
          posx3 = 50; 
          num_sorteado = 0;
          velocidadeY = lift;
          piso = 1;
          pontos += 10;
          if(pontos == 500 || pontos == 1000 || pontos == 1500 || pontos == 2000 || pontos == 3000 ){
            velocidadeTiro += velocidadeTiro1;
            vidas+=1; 
          }
        }
        else if(d < 50){
          vidas -= 1;
          num_sorteado = 0;
          posx3 = 50;
        }
      }else if(posx3 >= 490 || (posx3 != 50)){
        posx3 = 50;
        num_sorteado = 0;
      }
    }else if(posx3 != 50){
      posx3 = 50;
    }
    if(num_sorteado == 4 && piso == 2){
      if(posx4 > 90){ 
        posx4 -=velocidadeTiro;
        var d = dist(posx4,posy1,yoshi_posx,yoshi_posy);
        if(d < 50 && yoshi_posy < 265){
          posx4 = 490;
          num_sorteado = 0;
          velocidadeY = lift;
          pontos += 30;
          if(pontos == 500 || pontos == 1000 || pontos == 1500 || pontos == 2000 || pontos == 3000 ){
            velocidadeTiro += velocidadeTiro1;
            vidas+=1; 
          }
        }
        else if(d < 50){
          vidas -= 1;
          num_sorteado = 0;
          posx4 = 490;
        }
      }else if(posx4 <= 90 || (posx4 != 490)){
        posx4 = 490;
        num_sorteado = 0;
      }
    }else if(posx4 != 490){
      posx4 = 490;
    }
    if(num_sorteado == 5  &&  (piso == 1 || piso == 2)){
      if(posx5 > 90){ 
        posx5 -= velocidadeTiro;
        var d = dist(posx5,posy2,yoshi_posx,yoshi_posy);
        if(d < 50 && yoshi_posy < 365){
          posx5 = 490; 
          num_sorteado = 0;
          velocidadeY = lift;
          piso = 2;
          pontos += 20;
          if(pontos == 500 || pontos == 1000 || pontos == 1500 || pontos == 2000 || pontos == 3000 ){
            velocidadeTiro += velocidadeTiro1;
            vidas+=1; 
          }
        }
        else if(d < 50){
          vidas -= 1;
          num_sorteado = 0;
          posx5 = 490;
        }
      }else if(posx5 <= 90 || (posx5 != 490)){
        posx5 = 490;
        num_sorteado = 0;
      }
    }else if(posx5 != 490){
      posx5 = 490;
    }
    if(num_sorteado == 6 && (piso == 0 || piso == 1)){
      if(posx6 > 90){ 
        posx6 -= velocidadeTiro;
         var d = dist(posx6,posy3,yoshi_posx,yoshi_posy);
        if(d < 50 && yoshi_posy < 465){
          posx6 = 490;
          num_sorteado = 0;
          velocidadeY = lift;
          piso = 1;
          pontos += 10;
          if(pontos == 500 || pontos == 1000 || pontos == 1500 || pontos == 2000 || pontos == 3000 ){
            velocidadeTiro += velocidadeTiro1;
            vidas+=1; 
          }
        }
        else if(d < 50){
          vidas -= 1;
          num_sorteado = 0;
          posx6 = 490;
        }
      }else if(posx6 <= 90 || (posx6 != 490)){
        posx6 = 490;
        num_sorteado = 0;
      }
    }else if(posx6 != 490){
      posx6 = 490;
    }
  
    velocidadeY += gravidade;
    yoshi_posy += velocidadeY;
    
    if(yoshi_posy > 490){
      velocidadeY = 0;
      yoshi_posy = 490;
      if (piso > 0){
        piso = 0;
        num_sorteado = 0;
      }
    }
    fill(255);
    textSize(25);
    text(+vidas,55,33);
    text(+pontos,25,83);
    if(vidas == 0 && tela == 1){
     tela = 2;
     if(tela == 2){
       background(0);
       image(imagemFinal,270,270);
       fill(214, 214, 19);
       textSize(15);
       text("Você fez: "+pontos+" pontos.",200,350);
      if(pontos > recorde){
       recorde = pontos;
      }
      fill(214, 214, 19);
       textSize(15);
       text("Seu recorde é: "+recorde+" pontos.",200,370);
     }
    }
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW && tela == 1) {
    if(yoshi_posy == 490){
      velocidadeY += lift;
      frame = 8;
    }
  }
  if(keyCode === ENTER && tela == 0){
   tela = 1; 
  }
  if(keyCode === ENTER && tela == 2){
   tela = 0; 
  }
}
