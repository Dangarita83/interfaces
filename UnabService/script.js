document.addEventListener("DOMContentLoaded", function () {
  // Manejo del registro
  const registroForm = document.getElementById("form-registro");
  if (registroForm) {
    registroForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      if (!usuario || !contrasena) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

      if (usuarios[usuario]) {
        alert("El usuario ya está registrado. Intenta iniciar sesión.");
        return;
      }

      usuarios[usuario] = contrasena;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "iniciarsesion.html";
    });
  }

  // Manejo del inicio de sesión
  const loginForm = document.getElementById("form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const usuario = document.getElementById("login-usuario").value.trim();
      const contrasena = document.getElementById("login-contrasena").value.trim();

      if (!usuario || !contrasena) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

      if (!usuarios[usuario]) {
        alert("Usuario no registrado.");
        return;
      }

      if (usuarios[usuario] !== contrasena) {
        alert("Contraseña incorrecta.");
        return;
      }

      sessionStorage.setItem("usuarioActivo", usuario);

      alert("Inicio de sesión exitoso.");
      window.location.href = "inicio.html";
    });
  }

  // 🎯 **Corrección: Restaurar mensaje de bienvenida en `inicio.html`**
  if (window.location.pathname.includes("inicio.html")) {
    const mensajeBienvenida = document.getElementById("mensaje-bienvenida");
    const usuarioActivo = sessionStorage.getItem("usuarioActivo");

    if (mensajeBienvenida) {
      mensajeBienvenida.innerText = usuarioActivo 
        ? `Bienvenido, ${usuarioActivo}` 
        : "Bienvenido, usuario invitado";
    }
  }

  // 🎯 **Corrección: Menú de perfil funcionando en `inicio.html`**
  const perfilContainer = document.querySelector(".perfil-container");
  const perfilIcon = document.getElementById("perfil-icon");
  const perfilMenu = document.getElementById("perfil-menu");

  if (perfilContainer) {
    if (window.location.pathname.includes("inicio.html")) {
      perfilContainer.style.display = "block";
    } else {
      perfilContainer.style.display = "none";
    }
  }

  if (perfilIcon && perfilMenu) {
    perfilIcon.addEventListener("click", function () {
      perfilMenu.classList.toggle("activo");
    });
  }

  const cerrarSesion = document.getElementById("cerrar-sesion");
  if (cerrarSesion) {
    cerrarSesion.addEventListener("click", function () {
      sessionStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada correctamente.");
      window.location.href = "iniciarsesion.html";
    });
  }

  // 🎯 **Corrección: Agregar mensaje de confirmación en `soporte.html`**
  if (window.location.pathname.includes("soporte.html")) {
    const formSoporte = document.getElementById("form-soporte");

    formSoporte.addEventListener("submit", function (event) {
      event.preventDefault();

      const asunto = document.getElementById("asunto").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();

      if (!asunto || !correo || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      alert("Gracias por informar. Nos pondremos en contacto contigo pronto.");
      formSoporte.reset();
    });
  }

  // 🎯 **Lógica para asistencia en "horaslibres.html"**
  if (window.location.pathname.includes("horaslibres.html")) {
    const listaHorasLibres = document.getElementById("lista-horaslibres");
    const horasTotalesContenedor = document.getElementById("horas-totales-contenedor");

    let historialHorasLibres = JSON.parse(localStorage.getItem("historialHorasLibres")) || [];
    let totalHoras = parseFloat(localStorage.getItem("totalHoras")) || 0;

    historialHorasLibres.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.fecha}</strong> - ${item.actividad} (${item.horas} horas)`;
      listaHorasLibres.appendChild(li);
    });

    horasTotalesContenedor.innerHTML = `<p><strong>Total: ${totalHoras} horas</strong></p>`;
  }

  // 🎯 **Lógica para mostrar cursos según el semestre seleccionado en `cursos.html`**
  if (window.location.pathname.includes("cursos.html")) {
    const semestreSelect = document.getElementById("semestre-select");
    const tablaCursos = document.getElementById("tabla-cursos");
    const mensajeSemestre = document.getElementById("mensaje-semestre");

    const semestreActual = 2;

    const cursosPorSemestre = {
      1: [
        { nombre: "Introducción a la Ingeniería", creditos: 3, salon: "A-101", horario: "08:00 - 10:00" },
        { nombre: "Fundamentos de Programación", creditos: 4, salon: "B-202", horario: "10:30 - 12:30" }
      ],
      2: [
        { nombre: "Matemáticas Avanzadas", creditos: 3, salon: "C-305", horario: "13:00 - 15:00" },
        { nombre: "Estructuras de Datos", creditos: 4, salon: "D-404", horario: "15:30 - 17:30" }
      ]
    };

    semestreSelect.addEventListener("change", function () {
      const semestreSeleccionado = parseInt(semestreSelect.value);
      tablaCursos.innerHTML = "";

      if (semestreSeleccionado > semestreActual) {
        mensajeSemestre.textContent = "Aún no estás en este semestre.";
        return;
      } else {
        mensajeSemestre.textContent = "";
      }

      const cursos = cursosPorSemestre[semestreSeleccionado] || [];
      cursos.forEach(curso => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${curso.nombre}</td>
          <td>${curso.creditos}</td>
          <td>${curso.salon}</td>
          <td>${curso.horario}</td>
        `;
        tablaCursos.appendChild(fila);
      });
    });

    semestreSelect.value = semestreActual;
    semestreSelect.dispatchEvent(new Event("change"));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // TODO TU CÓDIGO ORIGINAL SIN CAMBIOS

  // 🎯 **Corrección: Restaurar funcionalidad de asistencia en `horaslibres.html`**
  if (window.location.pathname.includes("asistencia.html")) {
    const formAsistencia = document.getElementById("form-asistencia");

    formAsistencia.addEventListener("submit", function (event) {
      event.preventDefault();

      const actividad = document.getElementById("actividad").value.trim();
      const feedback = document.getElementById("feedback").value.trim();
      const horas = parseFloat(document.getElementById("horas").value.trim());
      const fecha = new Date().toLocaleDateString();

      if (!actividad || !feedback || !horas) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      let historialHorasLibres = JSON.parse(localStorage.getItem("historialHorasLibres")) || [];
      let totalHoras = parseFloat(localStorage.getItem("totalHoras")) || 0;

      // Agregar la actividad al historial
      historialHorasLibres.push({ fecha, actividad, horas });
      localStorage.setItem("historialHorasLibres", JSON.stringify(historialHorasLibres));

      // Sumar las horas al total
      totalHoras += horas;
      localStorage.setItem("totalHoras", totalHoras);

      alert("¡Asistencia exitosa! Se ha registrado correctamente.");
      formAsistencia.reset();

      // Redirigir a inicio.html
      window.location.href = "inicio.html";
    });
  }
});