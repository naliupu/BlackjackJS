/**
 * Patron modulo: es compatible con casi todas las versiones de JSON, nos ayuda a proteger el codigo /**
 */

/** Funciones anonimas auto-invocadas */

/** funcion flecha */
const myModule = (() => {
  //Habilita las opciones estrictas de JS.
  "use strict";

  /**
   * Baraja:
   * 2C = Two of Clubs (Treboles)
   * 2D = Two of Dimaonds (Diamantes)
   * 2H = Two of Hearts (Corazones)
   * 2S = Two of Spades (Espadas)
   */
  let deck = [];

  /** Tipos de cartas. */
  const types = ["C", "D", "H", "S"],
    /** Cartas especiales. */
    specials = ["A", "J", "Q", "k"];

  /** Puntos */
  let pointsPlayers = [];

  /** Manejo del DOM HTML */
  const btnPedir = document.querySelector("#btnAskCart"),
    btnStop = document.querySelector("#btnStop"),
    btNew = document.querySelector("#btnNew");

  const divCartsPlayers = document.querySelectorAll(".divCarts"),
    scoreView = document.querySelectorAll("#scoreView");

  /** Inicializa el juego*/
  const initializeGame = (numPlayers = 2) => {
    deck = createDeck();
    pointsPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      pointsPlayers.push(0);
    }

    scoreView.forEach((elem) => (elem.innerHTML = 0));
    divCartsPlayers.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnStop.disabled = false;
  };

  /** Crea una baraja de cartas. */
  const createDeck = () => {
    deck = [];
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
    return _.shuffle(deck);
  };

  /** Pedir una carta de la baraja. */
  const askCart = () => {
    if (deck.length === 0) {
      throw "No hay cartas en la baraja";
    }
    return deck.pop();
  };

  /** Obtener el valor de la carta. EJM 2S = 2 */
  const valueCart = (cart) => {
    // const value = cart[0]; // Obtener el valor que esta en esa pocicion en ese objeto

    const value = cart.substring(0, cart.length - 1);

    //Operación ternaria
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  /** Acumular puntos de los jugadores */
  const accumulatePoint = (cart, turn) => {
    pointsPlayers[turn] = pointsPlayers[turn] + valueCart(cart);
    scoreView[turn].innerHTML = pointsPlayers[turn];
    return pointsPlayers[turn];
  };

  const createCart = (cart, turn) => {
    console.log(cart, turn);
    const uploadCart = document.createElement("img");
    uploadCart.classList.add("cartas");
    uploadCart.src = `./assets/cartas/${cart}.png`;
    divCartsPlayers[turn].append(uploadCart);
  };

  const determinarWinner = () => {
    const [pointsMinimum, pointsComputer] = pointsPlayers;
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
    }, 200);
  };

  /** Computadora */
  const turnComputer = (pointsMinimum) => {
    let pointsComputer = 0;
    do {
      const cart = askCart();
      pointsComputer = accumulatePoint(cart, pointsPlayers.length - 1);
      createCart(cart, pointsPlayers.length - 1);
    } while (pointsComputer < pointsMinimum && pointsComputer <= 21);

    determinarWinner();
  };

  btnPedir.addEventListener("click", () => {
    const cart = askCart();
    const pointsPlayers = accumulatePoint(cart, 0);
    createCart(cart, 0);

    if (pointsPlayers > 21) {
      console.warn("Jugador perdio");
      btnPedir.disabled = true;
      btnStop.disabled = true;
      turnComputer(pointsPlayers);
    } else if (pointsPlayers === 21) {
      console.warn("21, genial");
      btnPedir.disabled = true;
      btnStop.disabled = true;
      turnComputer(pointsPlayers);
    }
  });

  btnStop.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnStop.disabled = true;
    turnComputer(pointsPlayers[0]);
  });

  return {
    newGame: initializeGame, //Retorna para poder llamarlo desde un agente externo
  };
})();
