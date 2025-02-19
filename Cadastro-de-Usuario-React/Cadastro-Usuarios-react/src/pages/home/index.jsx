import "./style.css";
import Trash from "../../assets/trash.svg";

function Home() {
  const user = [
    {
      id: "1",
      name: "Kauan",
      age: 33,
      email: "slsa@gmail.com",
    },
    {
      id: "2",
      name: "Kauany",
      age: 33,
      email: "slsa@gmail.com",
    },
  ];

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" name="name" />
        <input placeholder="Idade" type="number" name="age" />
        <input placeholder="Email" type="email" name="email" />
        <button type="button">Cadastrar</button>
      </form>

      {user.map((user) => (
        <div key={user.id} className="card"> 
          <div>
            <p>Nome: <span>{user.name} </span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Trash} alt="imagem de lixeira" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
