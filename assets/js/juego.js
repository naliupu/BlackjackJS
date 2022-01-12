/**
 * Patron modulo: es compatible con casi todas las versiones de JSON, nos ayuda a proteger el codigo /**
 */

/** Funciones anonimas auto-invocadas */

/** funcion flech */
(() => {
  'use strict'; //Habilita las opciones estrictas de JS.

  /**
   * Baraja:
   * 2C = Two of Clubs (Treboles)
   * 2D = Two of Dimaonds (Diamantes)
   * 2H = Two of Hearts (Corazones)
   * 2S = Two of Spades (Espadas)
   */
  let deck = [];

  /** Tipos de cartas. */
  const types = ["C", "D", "H", "S"];

  /** Cartas especiales. */
  const specials = ["A", "J", "Q", "k"];

  /** Puntos */
  let pointsPlayer = 0,
    pointsComputer = 0;

  /** Manejo del DOM HTML */
  const btnPedir = document.querySelector("#btnAskCart");
  const btnStop = document.querySelector("#btnStop");
  const btNew = document.querySelector("#btnNew");

  const divCartPlayer = document.querySelector("#jugador-cartas");
  const divCartComputer = document.querySelector("#computadora-cartas");

  const scoreView = document.querySelectorAll("#scoreView");

  /** Crea una baraja de cartas. */
  const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let special of specials) {
        deck.push(special + type);
      }
    }
    //   console.log(deck);// Baraja de cartas ordenado
    deck = _.shuffle(deck); //Utilize la libreria underscore , para que la baraja sea aleaotoria
    // console.log(deck);
  };
  createDeck();

  /** Pedir una carta de la baraja. */
  const askCart = () => {
    if (deck.length === 0) {
      throw "No hay cartas en la baraja";
    }
    // .pop: coge el ultimo elemento del array y lo elimina
    const cart = deck.pop();
    // console.log(cart);
    // console.log(deck);
    return cart;
  };

  /** Obtener el valor de la carta. EJM 2S = 2 */
  const valueCart = (cart) => {
    // const value = cart[0]; // Obtener el valor que esta en esa pocicion en ese objeto

    const value = cart.substring(0, cart.length - 1);

    //Operación ternaria
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;

    // let puntos = 0;

    // // isNaN: Evalua si lo que hay en los parentesis es un numero o no
    // if (isNaN(value)) {
    //   console.log("No es un numero!");
    //   puntos = value === "A" ? 11 : 10;
    // } else {
    //   console.log("Es un numero");
    //   // Multiplicamos el valor * 1 , para psarlo a tipode dato numerico, para poderlo sumar
    //   puntos = value * 1;
    // }
    // console.log(puntos);
  };

  /** Computadora */
  const turnComputer = (pointsMinimum) => {
    do {
      const cart = askCart();
      pointsComputer = pointsComputer + valueCart(cart);
      scoreView[1].innerHTML = pointsComputer;

      const uploadCart = document.createElement("img");
      uploadCart.classList.add("cartas");
      uploadCart.src = `./assets/cartas/${cart}.png`;
      divCartComputer.append(uploadCart);

      if (pointsMinimum > 21) {
        break;
      }
    } while (pointsComputer < pointsMinimum && pointsComputer <= 21);

    setTimeout(() => {
      if (pointsComputer === pointsMinimum) {
        alert("EMPATE");
      } else if (pointsMinimum > 21) {
        alert("PERDISTE");
      } else if (pointsComputer > 21) {
        alert("GANASTE");
      } else {
        alert("PERDISTE");
      }
    }, 10);
  };

  // Eventos
  // Nota
  // cuando agregamos una function como argumento de otra function, se le conoce como callback, puede ser una funcion tradicional o una funcion flecha

  btnPedir.addEventListener("click", () => {
    const cart = askCart();
    pointsPlayer = pointsPlayer + valueCart(cart);
    scoreView[0].innerHTML = pointsPlayer;

    const uploadCart = document.createElement("img");
    uploadCart.classList.add("cartas");
    uploadCart.src = `./assets/cartas/${cart}.png`;
    divCartPlayer.append(uploadCart);

    if (pointsPlayer > 21) {
      console.warn("Jugador perdio");
      btnPedir.disabled = true;
      btnStop.disabled = true;
      turnComputer(pointsPlayer);
    } else if (pointsPlayer === 21) {
      console.warn("21, genial");
      btnPedir.disabled = true;
      btnStop.disabled = true;
      turnComputer(pointsPlayer);
    }
  });

  btnStop.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnStop.disabled = true;
    turnComputer(pointsPlayer);
    // if(pointsPlayer){}
  });

  btNew.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = createDeck();
    pointsPlayer = 0;
    pointsComputer = 0;
    scoreView[0].innerText = 0;
    scoreView[1].innerText = 0;
    divCartPlayer.innerHTML = "";
    divCartComputer.innerHTML = "";
    btnPedir.disabled = false;
    btnStop.disabled = false;
    console.log(deck);

    // deck = [];
    // console.log(deck);
    // deck = createDeck();
    // console.log(deck);
  });
})();


/** funcion normal */
// (function(){
// })
