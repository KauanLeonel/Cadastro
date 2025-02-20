import { useEffect, useState, useRef } from "react"; //React Hooks
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api'



function Home() {
  const [users, setUsers] = useState([]) //Estado da variável com o estado
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers(){
    const usersFromApi =await api.get('/user')
    setUsers (usersFromApi.data)
  }

  async function createUsers(){
    await api.post('/user',{
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })
    getUsers()
  }

  async function deleteUsers(id){
    await api.delete(`/user/${id}`)
    getUsers()
  }

  useEffect(() =>{
    getUsers();
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" name="name" ref={inputName} />
        <input placeholder="Idade" type="number" name="age" ref={inputAge}/>
        <input placeholder="Email" type="email" name="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card"> 
          <div>
            <p>Nome: <span>{user.name} </span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="imagem de lixeira" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
