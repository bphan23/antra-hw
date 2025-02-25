const API = (() => {
  const URL = "http://localhost:3000";
  const getCart = () => {
    // define your method to get cart data
    return fetch(`${URL}/cart`).then((res) => res.json());
  };

  const getInventory = () => {
    // define your method to get inventory data
    return fetch(`${URL}/inventory`).then((res) => res.json());
  };

  const addToCart = (inventoryItem) => {
    // define your method to add an item to cart
    return fetch(`${URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryItem),
    }).then((res) => res.json());
  };

  const updateCart = (id, name, prevAmount, newAmount) => {
    // define your method to update an item in cart
    return fetch(`${URL}/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, count: prevAmount + newAmount }),
    }).then((res) => res.json());
  };

  const deleteFromCart = (id) => {
    // define your method to delete an item in cart
    return fetch(`${URL}/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
      Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
  };

  return {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const Model = (() => {
  // implement your logic for Model
  class State {
    #onChange;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
    }
    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    set cart(newCart) {
      this.#cart = newCart;
      this.#onChange();
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
      this.#onChange();
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }
  const {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  } = API;
  return {
    State,
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const View = (() => {
  // implement your logic for View
  const inventoryListElement = document.querySelector(".inventory__list");
  const renderInventory = (inventory) => {
    let temp = "";
    inventory.forEach((item) => {
      const listItem = `<li id=${item.id} class="listItem">
      <span class="listItem__name">${item.content}</span>
      <button class="listItem__minusBtn">-</button>
      <span class="listItem__value">0</span>
      <button class="listItem__plusBtn">+</button>
      <button class="listItem__addBtn">add to cart</button>
    </li>`;

      temp += listItem;
    });
    inventoryListElement.innerHTML = temp;
  };

  const cartListElement = document.querySelector(".cart__list");
  const checkoutBtnElement = document.querySelector(".checkout-btn");
  const renderCart = (cart) => {
    let temp = "";
    cart.forEach((item) => {
      const cartItem = `<li id=${item.id} class="listItem">
        <span class="listItem__name">${item.name}</span>
        <span class="listItem__value">x ${item.count}</span>
        <button class="cart__deleteBtn">delete</button>
      </li>`;
      temp += cartItem;
    });
    cartListElement.innerHTML = temp;
  };

  return {
    renderInventory,
    inventoryListElement,

    renderCart,
    cartListElement,
    checkoutBtnElement,
  };
})();

const Controller = ((model, view) => {
  // implement your logic for Controller
  const state = new model.State();

  const init = () => {
    state.subscribe(() => {
      view.renderInventory(state.inventory);
      view.renderCart(state.cart);
    });

    model.getInventory().then((data) => {
      state.inventory = data;
    });

    model.getCart().then((data) => {
      state.cart = data;
    });
  };

  const handleUpdateAmount = () => {
    view.inventoryListElement.addEventListener("click", (event) => {
      const element = event.target;

      let elements = element.parentElement.children;
      let number = elements.item(2); // value element
      let value = parseInt(number.innerHTML);
      // console.log(value);

      // minus --> minus 1 if not 0 or negative
      if (element.className == "listItem__minusBtn" && value >= 1) {
        number.innerHTML = value - 1;
      }

      // plus --> add 1
      if (element.className === "listItem__plusBtn") {
        number.innerHTML = value + 1;
      }
    });
  };

  const handleAddToCart = () => {
    view.inventoryListElement.addEventListener("click", (event) => {
      const element = event.target;
      const elements = element.parentElement.children;
      const number = elements.item(2).innerHTML; // value element
      const value = parseInt(number, 10); // Ensure the value is parsed as a base-10 integer
      const name = elements.item(0).innerHTML;

      // IF COUNT IS 0 DO NOTHING
      if (element.className === "listItem__addBtn" && value !== 0) {
        const id = element.parentElement.getAttribute("id");

        const newItem = {
          id,
          name,
          count: value,
        };
        console.log(newItem);

        // update --> (id, newAmount)
        // add --> (inventoryItem)

        model.getCart().then((data) => {
          let itemFound = false;

          const updatePromises = data.map((item) => {
            // IF ALREADY IN UPDATE
            if (item.id === id) {
              itemFound = true;
              return model
                .updateCart(id, item.name, item.count, value)
                .then((updatedItem) => {
                  state.cart = state.cart.map((cartItem) =>
                    cartItem.id === id ? updatedItem : cartItem
                  );
                });
            }
          });

          Promise.all(updatePromises).then(() => {
            if (!itemFound) {
              // IF ITEM IS NOT IN CART - ADD SPECIFIED AMOUNT
              model.addToCart(newItem).then((addedItem) => {
                state.cart = [...state.cart, addedItem];
              });
            }
          });
        });
      }
    });
  };

  const handleDelete = () => {
    view.cartListElement.addEventListener("click", (event) => {
      const element = event.target;
      if (element.className == "cart__deleteBtn") {
        const id = element.parentElement.getAttribute("id");
        model
          .deleteFromCart(id)
          .then(() => {
            return model.getCart();
          })
          .then((data) => {
            state.cart = data;
          });
      }
    });
  };

  const handleCheckout = () => {
    view.checkoutBtnElement.addEventListener("click", (event) => {
      model.checkout().then((data) => {
        console.log("checkout");
        console.log(data);
      });
    });
  };

  const bootstrap = () => {
    init();
    handleUpdateAmount();
    handleAddToCart();
    handleDelete();
    handleCheckout();
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
