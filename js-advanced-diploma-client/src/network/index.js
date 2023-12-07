export const auth = async (login, password) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    const result = await response.json();

    if (result.error === "Invalid route") {
      alert("Invalid route");
    }

    return result.payload != null
      ? { auth: true, token: result.payload.token }
      : { auth: false, error: result.error };
  } catch (error) {
    console.log(error);
    alert("Invalid route in catch");
  }
};

export const createAccount = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAccountsByToken = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAccount = async (token, id) => {
  try {
    const response = await fetch(`http://localhost:3000/account/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    const result = await response.json();
    if (result.error) {
      return undefined;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (token, accountId) => {
  try {
    const response = await fetch(`http://localhost:3000/account/${accountId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ZGV2ZWxvcGVyOnNraWxsYm94`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const transferFunds = async (token, from, to, amount) => {
  try {
    const response = await fetch("http://localhost:3000/transfer-funds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ from, to, amount }),
    });
    const result = await response.json();

    console.log("token:", token);
    console.log("from:", from);
    console.log("to:", to);
    console.log("amount:", amount);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCurrencies = async () => {
  try {
    const response = await fetch("http://localhost:3000/all-currencies", {
      method: "GET",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrencies = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/currencies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const exchangeCurrencies = async (token, from, to, amount) => {
  try {
    const response = await fetch("http://localhost:3000/currency-buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ from, to, amount }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrenciesFeed = (onMessageCallback) => {
  const ws = new WebSocket("ws://localhost:3000/currency-feed");

  ws.addEventListener("message", (event) => {
    const result = JSON.parse(event.data);
    onMessageCallback(result);
  });

  return ws;
};


export const getMapMark = async () => {
  try {
    const response = await fetch("http://localhost:3000/banks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
