import './App.css'; // o el nombre del archivo donde está tu CSS
<div className="container">
  <div className="left-panel">
    <div className="left-panel-content">
      <h2>Iniciar Sesión</h2>
      <form>
        <input type="email" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <button>Iniciar sesión</button>
      </form>
      <p>
        ¿No tenés cuenta? <a href="#">Registrate</a>
      </p>
    </div>
  </div>

  <div className="right-panel">
    <h2>Bienvenido a GameTracker</h2>
    <p>Organiza y lleva el registro de tus juegos favoritos</p>
  </div>
</div>
