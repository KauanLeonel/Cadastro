import axios from "axios"; //É uma forma de ligar a API do Back com End, facilitando as coisas  

const api = axios.create({ //Criando api com base no axios
    baseURL: 'http://localhost:3000' //Em qual local está alocado o bacj
})

export default api //exportando