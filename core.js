(()=>{
    'use strict'
    
        let cartas=[];
        let jugadas=0;
        let contador=0;
        let escudos=['C','D','H','S']
        let match=true;
        let carta_rebelada='';
        let numero_carta;
        let int_numero_carta;


        let robot_carta_rebelada='';
        let robot_contador=0;
        let robot_numero_carta;
        let robot_int_numero_carta;

        let carta_img=document.querySelectorAll("img");

        let n_small=document.querySelectorAll("small");

        let rpta=document.querySelector("h1");

        let box_1=document.querySelector(".box_1");
        let box_2=document.querySelector(".box_2");

        let img_user_card=[];

        let img_robot_card=[];

        let guardar_cartas_robot=[];


        for(let i=0;i<6;i++){
            img_user_card[i]=document.createElement("img");
            console.log(img_user_card[i]);
        }
        for(let i=0;i<6;i++){
            img_robot_card[i]=document.createElement("img");
            console.log(img_robot_card[i]);
        }



        //Generacion de deck
        for(let i=1;i<=13;i++){
            for (let escudo of escudos){
                cartas.push( i + escudo);
            }
        }

        console.log(cartas);
        //Mezcla de la baraja

        cartas = _.shuffle(cartas);

        console.log(cartas);

        //Captua de los botones
        let btn=document.querySelectorAll("button");
        let btn_2=btn[1];
        let btn_1=btn[0];
        let btn_3=btn[2];

        //Secuencia de funciones al hacer click en el 1er boton
        btn_1.addEventListener("click",nueva_partida);

        //Secuencia de funciones al hacer click en el 2do boton
        btn_2.addEventListener("click", pedir_carta);
        btn_2.addEventListener("click",detectar_numero);   

        //Secuencia de funciones al hacer click en el 3er boton
        btn_3.addEventListener("click",comparar);


        let carta_ctm=document.querySelector("#ctm");



        function pedir_carta(){

            //Por parte del jugador
            console.log("-------------");
            carta_rebelada = cartas[jugadas];
            
            console.log("Carta rebelada:", carta_rebelada);
            console.log(jugadas);
            

            //Por parte del robot
            robot_carta_rebelada=cartas[(cartas.length-jugadas-1)];
            console.log("Carta rebelada del robot:", robot_carta_rebelada);
            
            guardar_cartas_robot[jugadas]=robot_carta_rebelada;
            console.log(guardar_cartas_robot);

            if(jugadas==0){
                carta_img[0].src=`assets/cartas/Playing Cards/SVG-cards-1.3/${carta_rebelada}.svg`;
            }

            else if(jugadas>0){
                img_user_card[jugadas].src=`assets/cartas/Playing Cards/SVG-cards-1.3/${carta_rebelada}.svg`;
                box_1.appendChild(img_user_card[jugadas]);
                box_1.children[jugadas].style.left=`${jugadas*50}px`;


                img_robot_card[jugadas].src="assets/reverso.png";
                box_2.appendChild(img_robot_card[jugadas]);
                box_2.children[jugadas].style.left=`${jugadas*50}px`;
            }


            jugadas+=1;
        }

        function detectar_numero(){
            
            

            if(carta_rebelada.length==2){
                numero_carta=carta_rebelada[0];
                //console.log("N° de caracteres de la carta:", carta_rebelada.length);
                int_numero_carta=parseInt(numero_carta);
                contador=contador+int_numero_carta;
                //console.log("contador:", contador);
                //console.log(typeof contador);
            }
            else{
                numero_carta=carta_rebelada[0]+carta_rebelada[1];
                //console.log("N° de caracteres de la carta:", carta_rebelada.length);
                int_numero_carta=parseInt(numero_carta);
                contador=contador+int_numero_carta;
                //console.log("contador:", contador);
                //console.log(typeof contador);
            }


            //Agregar cartas -> PAL ROBOT CTM


            if(robot_carta_rebelada.length==2){
                robot_numero_carta=robot_carta_rebelada[0];
                //console.log("N° de caracteres de la carta:", carta_rebelada.length);
                robot_int_numero_carta=parseInt(robot_numero_carta);
                robot_contador=robot_contador+robot_int_numero_carta;
                //console.log("contador:", contador);
                //console.log(typeof contador);
            }
            else{
                robot_numero_carta=robot_carta_rebelada[0] + robot_carta_rebelada[1];
                //console.log("N° de caracteres de la carta:", carta_rebelada.length);
                robot_int_numero_carta=parseInt(robot_numero_carta);
                robot_contador=robot_contador+robot_int_numero_carta;
                //console.log("contador:", contador);
                //console.log(typeof contador);
            }

            n_small[0].textContent=contador;
            

            if(contador==21){
                rpta.textContent="¡GANASTE! > La suma de tus cartas es exactamente 21 <";
                btn_2.removeEventListener("click", pedir_carta);
                btn_2.removeEventListener("click",detectar_numero);
                btn_3.removeEventListener("click",comparar);
                
                rpta.parentElement.style.background="Orange";


                carta_ctm.src=`assets/cartas/Playing Cards/SVG-cards-1.3/${guardar_cartas_robot[0]}.svg`;

                for(let h=0;h<guardar_cartas_robot.length;h++){
                    img_robot_card[h].src=`assets/cartas/Playing Cards/SVG-cards-1.3/${guardar_cartas_robot[h]}.svg`;
                    
                }
                n_small[1].textContent=robot_contador;

            }
            
            else if(contador>21){
                btn_2.removeEventListener("click", pedir_carta);
                btn_2.removeEventListener("click",detectar_numero);    
                btn_3.removeEventListener("click",comparar);
                rpta.textContent="¡PERDISTE! > El limite de suma de cartas permitido es 21, has sacado un monto mayor <";

                rpta.parentElement.style.background="Red";


                carta_ctm.src=`assets/cartas/Playing Cards/SVG-cards-1.3/${guardar_cartas_robot[0]}.svg`;

                for(let h=0;h<guardar_cartas_robot.length;h++){
                    img_robot_card[h].src=`assets/cartas/Playing Cards/SVG-cards-1.3/${guardar_cartas_robot[h]}.svg`;
                    
                }
                n_small[1].textContent=robot_contador;

            }


            
        }
            
        function nueva_partida(){

            jugadas=0;
            cartas = _.shuffle(cartas);

            btn_2.addEventListener("click", pedir_carta);
            btn_2.addEventListener("click",detectar_numero);
            btn_3.addEventListener("click",comparar); 

            rpta.textContent="BlackJack asi bien prron";
            rpta.parentElement.style.background="Black";
            rpta.style.color="White";


            n_small[0].textContent="[-]";
            n_small[1].textContent="[-]";

            for(let j=0;j<img_user_card.length;j++){
                img_user_card[j].remove();
            }

            for(let k=0;k<img_user_card.length;k++){
                img_robot_card[k].remove();
            }

            carta_img[0].src="assets/reverso.png";
            carta_ctm.src="assets/reverso.png";



            contador=0;
            robot_contador=0;
            
        }

        function comparar(){

            

            if(jugadas>0){
                carta_ctm.src=`assets/cartas/Playing Cards/SVG-cards-1.3/${guardar_cartas_robot[0]}.svg`;

                for(let h=0;h<guardar_cartas_robot.length;h++){
                    img_robot_card[h].src=`assets/cartas/Playing Cards/SVG-cards-1.3/${guardar_cartas_robot[h]}.svg`;
                    
                }
                n_small[1].textContent=robot_contador;
            }

            



            if(contador>robot_contador){
                rpta.textContent="¡GANASTE! > La suma de tus cartas es mayor que la del rival <";
                rpta.parentElement.style.background="Orange";
                rpta.style.color="Black";
                
            }
            else if(contador==robot_contador){
                rpta.textContent="¡EMPATE! > La suma de tus cartas es igual que la del rival <";
                rpta.parentElement.style.background="Yellow";
                rpta.style.color="Black";
                
            }
            else{
                rpta.textContent="¡PERDISTE!>La suma de tus cartas es menor que la del rival<";
                rpta.parentElement.style.background="Red";
                
            }

            btn_2.removeEventListener("click", pedir_carta);
            btn_2.removeEventListener("click",detectar_numero);


        }

})();