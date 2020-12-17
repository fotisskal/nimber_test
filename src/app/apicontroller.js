let base_url = 'https://opentdb.com';
let game_endpoint = '/api.php?';

async function request(endpoint, data) {
  try {
    const response = await fetch(
      base_url + game_endpoint + new URLSearchParams(data),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const json_response = async () => {
      return await response.json();
    };
    const response_data = async () => {
      return await json_response();
    };
    return response_data();
  } catch (e) {
    console.log(e);
    return {
      error: true,
      error_code: -1,
      error_description: 'The network request has failed',
    };
  }
}

class API {
  async get_questions(amount, difficulty, type) {
    try {
      return await request(game_endpoint, {
        amount: amount,
        difficulty: difficulty,
        type: type,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

let _api = new API();

exports.API = _api;
