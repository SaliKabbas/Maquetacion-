
function handleLogin(event) {
      event.preventDefault();
      document.getElementById('login-view').classList.remove('active');
      document.getElementById('app-view').classList.add('active');
      showToast('¡Bienvenido al Panel de Global Fit!');
    }
    /*
    function logout() {
      document.getElementById('app-view').classList.remove('active');
      document.getElementById('login-view').classList.add('active');
      showToast('Sesión cerrada correctamente');
    }*/

    function togglePasswordVisibility() {
      const passInput = document.getElementById('login-pass');
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
    }

    function switchModule(moduleId, element) {
      document.querySelectorAll('.module-view').forEach(mod => mod.style.display = 'none');
      
      const selectedModule = document.getElementById('module-' + moduleId);
      if (selectedModule) {
        selectedModule.style.display = 'block';
        selectedModule.style.opacity = '0';
        selectedModule.style.transform = 'translateY(10px)';
        selectedModule.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        setTimeout(() => {
          selectedModule.style.opacity = '1';
          selectedModule.style.transform = 'translateY(0)';
        }, 10);
      }

      document.querySelectorAll('.sidebar-menu .nav-item').forEach(item => item.classList.remove('active'));
      if (element) {
        element.classList.add('active');
      } else {
        const matchingNav = document.querySelector(`.sidebar-menu .nav-item[data-module="${moduleId}"]`);
        if (matchingNav) matchingNav.classList.add('active');
      }

      const titleEl = document.getElementById('top-header-title');
      const subTitleEl = document.getElementById('top-header-subtitle');

      const titles = {
        inicio: ['Panel Principal', 'Resumen en tiempo real del gimnasio Global Fit'],
        socios: ['Gestión de Socios', 'Directorio y control de accesos de miembros'],
        membresias: ['Gestión de Membresías y Planes', 'Ofertas, precios y vigencia de suscripciones'],
        entrenadores: ['Personal de Entrenadores', 'Control de instructores y turnos de atención'],
        tienda: ['Tienda e Inventario', 'Control de stock de suplementos y accesorios'],
        caja: ['Caja y Registro de Pagos', 'Flujo de efectivo e historial de transacciones'],
        configuracion: ['Configuración del Sistema', 'Parámetros generales de la plataforma']
      };

      if (titles[moduleId]) {
        titleEl.textContent = titles[moduleId][0];
        subTitleEl.textContent = titles[moduleId][1];
      }
      const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('active-mobile')) {
      sidebar.classList.remove('active-mobile');
    }

    }

    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);

      const themeIcon = document.getElementById('theme-icon');
      const themeText = document.getElementById('theme-text');

      if (newTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Modo Claro';
        showToast('Modo Oscuro Activado');
      } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Modo Oscuro';
        showToast('Modo Claro Activado');
      }
    }

    function setSocioView(viewType) {
      const gridView = document.getElementById('socios-grid-view');
      const tableView = document.getElementById('socios-table-view');
      const btnGrid = document.getElementById('btn-view-grid');
      const btnTable = document.getElementById('btn-view-table');

      if (viewType === 'grid') {
        gridView.style.display = 'grid';
        tableView.style.display = 'none';
        btnGrid.classList.add('active');
        btnTable.classList.remove('active');
      } else {
        gridView.style.display = 'none';
        tableView.style.display = 'block';
        btnGrid.classList.remove('active');
        btnTable.classList.add('active');
      }
    }

    function filterMembresiasTable() {
      const query = document.getElementById('search-membresia').value.toLowerCase();
      const rows = document.querySelectorAll('#membresias-table tbody tr');

      rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    }

    function filterMembresiaTab(status, btn) {
      document.querySelectorAll('.filter-pills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const rows = document.querySelectorAll('#membresias-table tbody tr');
      rows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        row.style.display = (status === 'all' || rowStatus === status) ? '' : 'none';
      });
    }

    function filterSocios() {
      const query = document.getElementById('search-socio').value.toLowerCase();
      const statusFilter = document.getElementById('filter-socio-status').value;

      document.querySelectorAll('#socios-grid-view .socio-card').forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const status = card.getAttribute('data-status');
        const matchesQuery = name.includes(query);
        const matchesStatus = statusFilter === 'all' || status === statusFilter;

        card.style.display = (matchesQuery && matchesStatus) ? 'flex' : 'none';
      });

      document.querySelectorAll('#socios-table-element tbody tr').forEach(row => {
        const name = row.getAttribute('data-name').toLowerCase();
        const status = row.getAttribute('data-status');
        const matchesQuery = name.includes(query);
        const matchesStatus = statusFilter === 'all' || status === statusFilter;

        row.style.display = (matchesQuery && matchesStatus) ? '' : 'none';
      });
    }

    function openModal(modalId) {
      document.getElementById(modalId).classList.add('active');
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('active');
    }

    function handleGuardarSocio(event) {
      event.preventDefault();

      const nombre = document.getElementById('socio-nombre').value || 'Nuevo Socio';
      const cedula = document.getElementById('socio-cedula').value || 'V-00000000';
      const telefono = document.getElementById('socio-telefono').value || 'Sin N°';
      const plan = document.getElementById('socio-plan').value || 'Plan Estándar';

      const gridView = document.getElementById('socios-grid-view');
      const newCard = document.createElement('div');
      newCard.className = 'socio-card';
      newCard.setAttribute('data-name', nombre);
      newCard.setAttribute('data-status', 'Activo');

      newCard.style.opacity = '0';
      newCard.style.transform = 'scale(0.95)';
      newCard.style.transition = 'all 0.4s ease';

      const nameParts = nombre.split(' ');
      const initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[1][0]).toUpperCase() : nombre.substring(0,2).toUpperCase();

      newCard.innerHTML = `
        <div class="socio-card-header">
          <div class="socio-info-main">
            <div class="avatar-circle avatar-purple">${initials}</div>
            <div>
              <div class="member-name">${nombre}</div>
              <div class="member-id">${cedula}</div>
            </div>
          </div>
          <span class="badge-status badge-success">Activo</span>
        </div>
        <div class="socio-details">
          <div class="socio-detail-item"><i class="fas fa-phone"></i> ${telefono}</div>
          <div class="socio-detail-item"><i class="fas fa-id-card"></i> Plan: <strong>${plan}</strong></div>
          <div class="socio-detail-item"><i class="fas fa-calendar-alt"></i> Vence: 2026-10-20</div>
        </div>

        <div class="socio-card-actions-custom">
        <button class="btn-ficha" onclick="verFichaSocio('${nombre}', '${cedula}', '${plan}', 'Activo')">
        <i class="fas fa-eye"></i> Ficha
        </button>
        <button class="btn-ficha btn-editar" onclick="editarSocio(this)">
                 <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-ficha btn-toggle-status estado-inactivar"  onclick="toggleEstadoSocio(this)">
                  <i class="fas fa-user-slash"></i> Inactivar
        </button>
        </div>
      `;

      gridView.prepend(newCard);
      setTimeout(() => {
        newCard.style.opacity = '1';
        newCard.style.transform = 'scale(1)';
      }, 50);

      const tableBody = document.querySelector('#socios-table-element tbody');
      const newRow = document.createElement('tr');
      newRow.setAttribute('data-name', nombre);
      newRow.setAttribute('data-status', 'Activo');

      newRow.innerHTML = `
        <td><strong>${nombre}</strong></td>
        <td>${cedula}</td>
        <td>${telefono}</td>
        <td>${plan}</td>
        <td><span class="badge-status badge-success">Activo</span></td>
        <td>
        <button class="btn-ficha" onclick="verFichaSocio('${nombre}', '${cedula}', '${plan}', 'Activo')">
        <i class="fas fa-eye"></i> Ficha
        </button>
        <button class="btn-ficha btn-editar" onclick="editarSocio(this)">
                 <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-ficha btn-toggle-status estado-inactivar"  onclick="toggleEstadoSocio(this)">
                  <i class="fas fa-user-slash"></i> Inactivar
        </button>
        </td>
      `;

      tableBody.prepend(newRow);

      const kpiSocios = document.getElementById('kpi-socios-count');
      if (kpiSocios) {
        kpiSocios.textContent = parseInt(kpiSocios.textContent) + 1;
      }

      event.target.reset();
      closeModal('modal-nuevo-socio');
      showToast(`¡Socio ${nombre} registrado exitosamente!`);
    }

    // Variables globales para rastrear qué socio se está editando
let socioCardEnEdicion = null;
let socioRowEnEdicion = null;

function editarSocio(btnElement) {
 
  const tarjeta = btnElement.closest('.socio-card');
  const fila = btnElement.closest('tr');

  let nombre, cedula, telefono, plan;

  if (tarjeta) {
    socioCardEnEdicion = tarjeta;
    nombre = tarjeta.getAttribute('data-name');
    cedula = tarjeta.getAttribute('data-cedula') || tarjeta.querySelector('.member-id').textContent;
    
    
    const details = tarjeta.querySelectorAll('.socio-detail-item');
    telefono = details[0].textContent.trim();
    plan = tarjeta.getAttribute('data-plan') || details[1].querySelector('strong').textContent.trim();

   
    socioRowEnEdicion = document.querySelector(`#socios-table-element tbody tr[data-name="${nombre}"]`);
  } else if (fila) {
    socioRowEnEdicion = fila;
    nombre = fila.getAttribute('data-name');
    cedula = fila.cells[1].textContent;
    telefono = fila.cells[2].textContent;
    plan = fila.cells[3].textContent;

    
    socioCardEnEdicion = document.querySelector(`#socios-grid-view .socio-card[data-name="${nombre}"]`);
  }

  document.getElementById('edit-socio-nombre').value = nombre;
  document.getElementById('edit-socio-cedula').value = cedula;
  document.getElementById('edit-socio-telefono').value = telefono;
  
  const planSelect = document.getElementById('edit-socio-plan');
  if(planSelect) planSelect.value = plan;

  
  openModal('modal-editar-socio');
}

function handleGuardarEdicionSocio(event) {
  event.preventDefault();

 
  const nuevoNombre = document.getElementById('edit-socio-nombre').value;
  const nuevaCedula = document.getElementById('edit-socio-cedula').value;
  const nuevoTelefono = document.getElementById('edit-socio-telefono').value;
  const nuevoPlan = document.getElementById('edit-socio-plan').value;

 
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: '¿Guardar cambios?',
      text: 'Se actualizarán los datos del socio en el sistema.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, aplicar cambios',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        aplicarCambiosSocio(nuevoNombre, nuevaCedula, nuevoTelefono, nuevoPlan);
      }
    });
  } else {
    if (confirm('¿Estás seguro de que deseas aplicar estos cambios al socio?')) {
      aplicarCambiosSocio(nuevoNombre, nuevaCedula, nuevoTelefono, nuevoPlan);
    }
  }
}

// Función auxiliar que ejecuta la actualización del DOM
function aplicarCambiosSocio(nuevoNombre, nuevaCedula, nuevoTelefono, nuevoPlan) {
  // Extraer iniciales para el avatar
  const parts = nuevoNombre.trim().split(' ');
  const iniciales = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : nuevoNombre.substring(0, 2).toUpperCase();

  // Actualizar la tarjeta (Grid) si existe
  if (socioCardEnEdicion) {
    socioCardEnEdicion.setAttribute('data-name', nuevoNombre);
    socioCardEnEdicion.setAttribute('data-cedula', nuevaCedula);
    socioCardEnEdicion.setAttribute('data-plan', nuevoPlan);
    
    socioCardEnEdicion.querySelector('.member-name').textContent = nuevoNombre;
    socioCardEnEdicion.querySelector('.member-id').textContent = nuevaCedula;
    
    const avatar = socioCardEnEdicion.querySelector('.avatar-circle');
    if (avatar) avatar.textContent = iniciales;
    
    const details = socioCardEnEdicion.querySelectorAll('.socio-detail-item');
    if (details.length >= 2) {
      details[0].innerHTML = `<i class="fas fa-phone"></i> ${nuevoTelefono}`;
      details[1].innerHTML = `<i class="fas fa-id-card"></i> Plan: <strong>${nuevoPlan}</strong>`;
    }

    const estadoActual = socioCardEnEdicion.getAttribute('data-status');
    const btnFicha = socioCardEnEdicion.querySelector('.btn-ficha[onclick^="verFichaSocio"]');
    if (btnFicha) {
      btnFicha.setAttribute('onclick', `verFichaSocio('${nuevoNombre}', '${nuevaCedula}', '${nuevoPlan}', '${estadoActual}')`);
    }
  }

  // Actualizar la fila (Tabla) si existe
  if (socioRowEnEdicion) {
    socioRowEnEdicion.setAttribute('data-name', nuevoNombre);
    socioRowEnEdicion.cells[0].innerHTML = `<strong>${nuevoNombre}</strong>`;
    socioRowEnEdicion.cells[1].textContent = nuevaCedula;
    socioRowEnEdicion.cells[2].textContent = nuevoTelefono;
    socioRowEnEdicion.cells[3].textContent = nuevoPlan;

    const estadoActual = socioRowEnEdicion.getAttribute('data-status');
    const btnFicha = socioRowEnEdicion.querySelector('.btn-ficha[onclick^="verFichaSocio"]');
    if (btnFicha) {
      btnFicha.setAttribute('onclick', `verFichaSocio('${nuevoNombre}', '${nuevaCedula}', '${nuevoPlan}', '${estadoActual}')`);
    }
  }
  closeModal('modal-editar-socio');

  if (typeof Swal !== 'undefined') {
        showToast('Socio actualizado correctamente');
  } else {
    showToast('Socio actualizado correctamente');
  }
}





function handleGuardarPlan(event) {

  event.preventDefault(); 

  
  Swal.fire({
    title: '¿Guardar nuevo plan?',
    text: "Verifica que los datos y beneficios sean correctos.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, crear plan',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    
    if (result.isConfirmed) {
      
      const nombre = document.getElementById('plan-nombre').value;
      const duracion = document.getElementById('plan-duracion').value;
      const precio = parseFloat(document.getElementById('plan-precio').value).toFixed(2);
      const periodo = document.getElementById('plan-periodo').value;
      const beneficiosRaw = document.getElementById('plan-beneficios').value;
      
      const beneficiosList = beneficiosRaw 
        ? beneficiosRaw.split(',').map(b => `<li><i class="fas fa-check-circle"></i> ${b.trim()}</li>`).join('') 
        : `<li><i class="fas fa-check-circle"></i> Acceso general</li>`;

      const plansContainer = document.getElementById('plans-grid-container');
      const newPlanCard = document.createElement('div');
      newPlanCard.className = 'plan-card';
      
      newPlanCard.style.opacity = '0';
      newPlanCard.style.transform = 'translateY(20px)';
      newPlanCard.style.transition = 'all 0.4s ease';

      newPlanCard.innerHTML = `
        <div class="plan-name">${nombre}</div>
        <div class="plan-duration"><i class="fas fa-clock"></i> ${duracion}</div>
        <div class="plan-price-box">
          <span class="plan-price">$${precio}</span>
          <span class="plan-period">${periodo}</span>
        </div>
        <ul class="plan-features">
          ${beneficiosList}
        </ul>
        <button class="btn-assign-plan" onclick="showToast('Asignando ${nombre}...')">Asignar a Socio</button>
      `;

      plansContainer.appendChild(newPlanCard);
      
      setTimeout(() => {
        newPlanCard.style.opacity = '1';
        newPlanCard.style.transform = 'translateY(0)';
      }, 50);

      
      event.target.reset();
      closeModal('modal-nuevo-plan');

      showToast('Plan "' + nombre + '" creado exitosamente');
    }
  });
}

    function handleRegistrarPago(event) {
      event.preventDefault();
      const socio = document.getElementById('pago-socio').value;
      const monto = document.getElementById('pago-monto').value;
      const metodo = document.getElementById('pago-metodo').value;

      const tablaCaja = document.querySelector('#tabla-caja tbody');
      const row = document.createElement('tr');
      const reciboNum = '#' + Math.floor(10000 + Math.random() * 90000);
      row.innerHTML = `
        <td><strong>Cobro Membresía - ${socio}</strong></td>
        <td>${metodo}</td>
        <td>$${parseFloat(monto).toFixed(2)}</td>
        <td>Hoy, Reciente</td>
        <td><button class="pill-btn" onclick="showToast('Imprimiendo ${reciboNum}...')"><i class="fas fa-print"></i> ${reciboNum}</button></td>
      `;
      tablaCaja.prepend(row);

      closeModal('modal-pago');
      showToast(`Pago de $${monto} procesado correctamente`);
    }

    function renovarMembresia(nombre) {
      showToast('Membresía renovada para ' + nombre);
    }

    function verFichaSocio(nombre, cedula, plan, estado) {
      const content = document.getElementById('ficha-socio-content');
      content.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Cédula:</strong> ${cedula}</p>
        <p><strong>Plan Actual:</strong> ${plan}</p>
        <p><strong>Estado:</strong> ${estado}</p>
        <p><strong>Sede:</strong> Global Fit Sede Principal</p>
      `;
      openModal('modal-ficha-socio');
    }

    function showToast(message) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }



/* EDITAR ENTRENADOR */

    // Variable global para rastrear el entrenador en edición
let entrenadorCardEnEdicion = null;

// Función para abrir el modal limpio al crear un NUEVO entrenador
function abrirModalNuevoEntrenador() {
    entrenadorCardEnEdicion = null; // Reiniciar estado de edición
    const form = document.querySelector('#modal-nuevo-entrenador form');
    if (form) form.reset();
    openModal('modal-nuevo-entrenador');
}


/* EDITAR ENTRENADOR */
function abrirModalEditar(nombre, especialidad, email, telefono, turno) {
    // Buscar la tarjeta actual en el DOM por el nombre del entrenador
    const tarjetas = document.querySelectorAll('#module-entrenadores .socio-card');
    entrenadorCardEnEdicion = null;
    tarjetas.forEach(tarjeta => {
        const nombreTarjeta = tarjeta.querySelector('.member-name').textContent;
        if (nombreTarjeta === nombre) {
            entrenadorCardEnEdicion = tarjeta;
        }
    });

    // 1. Autocompletar los campos de texto
    document.getElementById('entrenador-nombre').value = nombre;
    document.getElementById('entrenador-especialidad').value = especialidad;
    document.getElementById('entrenador-email').value = email;
    document.getElementById('entrenador-telefono').value = telefono;
    
    // 2. Seleccionar el turno correcto en el menú desplegable (select)
    const selectHorario = document.getElementById('entrenador-horario');
    if (selectHorario) {
        selectHorario.value = turno; 
    }

    // 3. Abrir el modal
    openModal('modal-nuevo-entrenador');
}
/*apartado de registro */




function openRegisterModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeRegisterModal() {
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function submitRegister(event) {
  if (event) event.preventDefault();

  const email = document.getElementById('reg-email')?.value;

  if (typeof closeRegisterModal === 'function') {
      closeRegisterModal();
  } else {
      closeModal('modal-registro'); 
  }

  document.getElementById('register-form')?.reset();

  const loginEmail = document.getElementById('login-email');
  if (loginEmail && email) {
    loginEmail.value = email;
  }

  if (typeof showToast === 'function') {
      showToast('¡Registro exitoso! Ya puedes iniciar sesión.');
  } else if (typeof Swal !== 'undefined') {
      Swal.fire('¡Éxito!', '¡Registro exitoso! Ya puedes iniciar sesión.', 'success');
  }

  return false;
}

function handleLogin(event) {
  if (event) event.preventDefault();

  const loginView = document.getElementById('login-view');
  const appView = document.getElementById('app-view');

  if (loginView && appView) {
    loginView.classList.remove('active');
    appView.classList.add('active');
    showToast('Bienvenido a Global Fit');
  }
  return false;
}

function togglePasswordVisibility() {
  const passInput = document.getElementById('login-pass');
  if (passInput) {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  }
}





function showToast2(message) {
  const toast = document.getElementById('toast');
  if (toast2) {
    toast2.textContent = message;
    toast2.classList.add('show');
    setTimeout(() => {
      toast2.classList.remove('show');
    }, 3000);
  }
}
  

// Función para Inactivar a un socio visualmente
function toggleEstadoSocio(botonElemento) {
  // 1. Ubicar la tarjeta del socio y la etiqueta de estado
  const tarjeta = botonElemento.closest('.socio-card, .widget-card');
  const badgeEstado = tarjeta.querySelector('.badge-status');
  const estadoActual = tarjeta.getAttribute('data-status');

  // 2. Evaluar si está Inactivo para volver a Activar
  if (estadoActual === 'Inactivo') {
    // CAMBIAR A ACTIVO
    tarjeta.setAttribute('data-status', 'Activo');
    tarjeta.classList.remove('card-inactiva');

    // Actualizar la etiqueta (badge)
    badgeEstado.textContent = 'Activo';
    badgeEstado.className = 'badge-status badge-success';

    // Actualizar el botón a estado "Inactivar" (Rojo)
    botonElemento.className = 'btn-ficha btn-toggle-status estado-inactivar';
    botonElemento.innerHTML = '<i class="fas fa-user-slash"></i> Inactivar';

  } else {
    // CAMBIAR A INACTIVO (Aplica tanto si estaba 'Activo' como 'Por Vencer')
    tarjeta.setAttribute('data-status', 'Inactivo');
    tarjeta.classList.add('card-inactiva');

    // Actualizar la etiqueta (badge)
    badgeEstado.textContent = 'Inactivo';
    badgeEstado.className = 'badge-status badge-danger';

    // Actualizar el botón a estado "Activar" (Verde)
    botonElemento.className = 'btn-ficha btn-toggle-status estado-activar';
    botonElemento.innerHTML = '<i class="fas fa-user-check"></i> Activar';
  }
}

function handleGuardarEntrenador(event) {
  if (event && event.preventDefault) event.preventDefault();

  const nombre = document.getElementById('entrenador-nombre').value || 'Nuevo Entrenador';
  const especialidad = document.getElementById('entrenador-especialidad').value || 'Entrenador General';
  const email = document.getElementById('entrenador-email').value || 'entrenador@globalfit.com';
  const telefono = document.getElementById('entrenador-telefono').value || '+58 412-0000000';
  const horarioVal = document.getElementById('entrenador-horario').value || 'manana';

  let textoTurno = 'Mañana (06:00 AM - 01:00 PM)';
  if (horarioVal === 'tarde') {
    textoTurno = 'Tarde (01:00 PM - 06:00 PM)';
  } else if (horarioVal === 'noche') {
    textoTurno = 'Noche (06:00 PM - 10:00 PM)';
  } else if (horarioVal === 'completo') {
    textoTurno = 'Tiempo Completo (08:00 AM - 06:00 PM)';
  }

  const nameParts = nombre.trim().split(' ');
  const initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[1][0]).toUpperCase() : nombre.substring(0, 2).toUpperCase();

  // VERIFICAR SI ESTAMOS EN MODO EDICIÓN
  if (entrenadorCardEnEdicion) {
    
    entrenadorCardEnEdicion.querySelector('.member-name').textContent = nombre;
    entrenadorCardEnEdicion.querySelector('.member-id').textContent = especialidad;
    
    const avatar = entrenadorCardEnEdicion.querySelector('.avatar-circle');
    if (avatar) avatar.textContent = initials;

    const details = entrenadorCardEnEdicion.querySelectorAll('.socio-detail-item');
    if (details.length > 0) {
      details[0].innerHTML = `<i class="fas fa-clock"></i> Turno: ${textoTurno}`;
    }

    const botones = entrenadorCardEnEdicion.querySelectorAll('.btn-ficha');
    if (botones.length >= 3) {
      botones[0].setAttribute('onclick', `verHorarioEntrenador('${nombre}', '${especialidad}', '${horarioVal}')`);
      botones[1].setAttribute('onclick', `abrirModalEditar('${nombre}', '${especialidad}', '${email}', '${telefono}', '${horarioVal}')`);
      botones[2].setAttribute('onclick', `eliminarEntrenador(this, '${nombre}')`);
    }

    showToast(`¡Entrenador ${nombre} actualizado exitosamente!`);
    entrenadorCardEnEdicion = null; 
    
  } else {
    // CREAR NUEVO ENTRENADOR (Lógica Original)
    const grid = document.querySelector('#module-entrenadores .socios-grid');
    if (!grid) return;

    const bgClasses = ['avatar-green', 'avatar-purple', 'avatar-blue', 'avatar-amber'];
    const avatarClass = bgClasses[Math.floor(Math.random() * bgClasses.length)];

    const newCard = document.createElement('div');
    newCard.className = 'socio-card';
    newCard.style.opacity = '0';
    newCard.style.transform = 'scale(0.95)';
    newCard.style.transition = 'all 0.4s ease';

    newCard.innerHTML = `
      <div class="socio-card-header">
        <div class="socio-info-main">
          <div class="avatar-circle ${avatarClass}">${initials}</div>
          <div>
            <div class="member-name">${nombre}</div>
            <div class="member-id">${especialidad}</div>
          </div>
        </div>
        <span class="badge-status badge-success">Disponible</span>
      </div>
      <div class="socio-details">
        <div class="socio-detail-item"><i class="fas fa-clock"></i> Turno: ${textoTurno}</div>
        <div class="socio-detail-item"><i class="fas fa-users"></i> Socios asignados: 0</div>
      </div>
      <div class="socio-card-actions">
        <button class="btn-ficha" onclick="verHorarioEntrenador('${nombre}', '${especialidad}', '${horarioVal}')"><i class="fas fa-calendar-alt"></i> Ver Horario</button>
        <button class="btn-ficha btn-editar" onclick="abrirModalEditar('${nombre}', '${especialidad}', '${email}', '${telefono}', '${horarioVal}')"><i class="fas fa-edit"></i> Editar</button>
        <button class="btn-ficha btn-borrar" onclick="eliminarEntrenador(this, '${nombre}')"><i class="fas fa-trash"></i> Eliminar</button>
      </div>
    `;

    grid.appendChild(newCard);

    setTimeout(() => {
      newCard.style.opacity = '1';
      newCard.style.transform = 'scale(1)';
    }, 50);

    showToast(`¡Entrenador ${nombre} registrado exitosamente!`);
  }

  // Limpiar formulario y cerrar modal
  const form = document.querySelector('#modal-nuevo-entrenador form');
  if (form) form.reset();
  closeModal('modal-nuevo-entrenador');
}

/**
 * Elimina una tarjeta de entrenador de la maquetación solicitando confirmación.
 */
function eliminarEntrenador(btnElement, nombre) {
  const card = btnElement.closest('.socio-card');
  if (!card) return;

  if (typeof Confirmaciones !== 'undefined' && Confirmaciones.eliminar) {
    Confirmaciones.eliminar(nombre, () => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => card.remove(), 300);
    });
  } else {
    if (confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => card.remove(), 300);
      showToast(`Entrenador ${nombre} eliminado.`);
    }
  }
}

/**
 * Muestra el modal con el horario detallado de Lunes a Viernes asignado al entrenador.
 */
function verHorarioEntrenador(nombre, especialidad, horarioKey) {
  let turnoNombre = 'Mañana (06:00 AM - 01:00 PM)';
  let rangoHora = '06:00 AM - 01:00 PM';

  if (horarioKey === 'tarde') {
    turnoNombre = 'Tarde (01:00 PM - 06:00 PM)';
    rangoHora = '01:00 PM - 06:00 PM';
  } else if (horarioKey === 'noche') {
    turnoNombre = 'Noche (06:00 PM - 10:00 PM)';
    rangoHora = '06:00 PM - 10:00 PM';
  } else if (horarioKey === 'completo') {
    turnoNombre = 'Tiempo Completo / Rotativo';
    rangoHora = '08:00 AM - 06:00 PM';
  }

  const elTitle = document.getElementById('horario-modal-title');
  const elSubtitle = document.getElementById('horario-modal-subtitle');
  const elTurno = document.getElementById('horario-modal-turno-nombre');

  if (elTitle) elTitle.innerHTML = `<i class="fas fa-calendar-alt"></i> Horario: ${nombre}`;
  if (elSubtitle) elSubtitle.textContent = `Especialidad: ${especialidad}`;
  if (elTurno) elTurno.textContent = `Turno Asignado: ${turnoNombre}`;

  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dias.forEach(dia => {
    const elTime = document.getElementById(`time-${dia}`);
    if (elTime) elTime.textContent = rangoHora;
  });

  openModal('modal-horario-entrenador');
}


    function filterMembresiaTab(status, btn) {
      document.querySelectorAll('.filter-pills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const rows = document.querySelectorAll('#membresias-table tbody tr');
      rows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        row.style.display = (status === 'all' || rowStatus === status) ? '' : 'none';
      });
    }


    /* ----------------------------------------MODULO TIENDA ----------------------------------------- */

   
let recaudadoTiendaTotal = 48.50;
let idParaEliminar = null;
let tipoEliminacion = null; // Puede ser 'venta' o 'producto'
let montoAEliminar = 0;
let tarjetaEditandoseId = null;
let stockIdActual = null;

// Funciones de Filtro
function filterTienda() {
  const query = document.getElementById('search-tienda').value.toLowerCase();
  document.querySelectorAll('#tienda-grid-container .socio-card').forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    card.style.display = name.includes(query) ? 'flex' : 'none';
  });
}

function filterTiendaTab(category, btn) {
  document.querySelectorAll('#module-tienda .filter-pills .pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('#tienda-grid-container .socio-card').forEach(card => {
    const cat = card.getAttribute('data-category');
    card.style.display = (category === 'all' || cat === category) ? 'flex' : 'none';
  });
}

// 1. Guardar Nuevo Producto (Corregido con ID único)
function handleGuardarProducto(event) {
  event.preventDefault();
  const nombre = document.getElementById('prod-nombre').value;
  const categoria = document.getElementById('prod-cat').value;
  const stock = document.getElementById('prod-stock').value;
  const precio = parseFloat(document.getElementById('prod-precio').value).toFixed(2);

  // Generar ID único para la tarjeta dinámica
  const customId = 'prod-custom-' + Math.floor(Math.random() * 90000);

  const grid = document.getElementById('tienda-grid-container');
  const card = document.createElement('div');
  card.className = 'socio-card';
  card.id = customId; // Asignamos el ID único a la tarjeta
  card.setAttribute('data-category', categoria);
  card.setAttribute('data-name', nombre);

  // Mantenemos la estructura de clases del HTML original, asignando los IDs generados
  card.innerHTML = `
    <div class="socio-card-header">
      <div class="socio-info-main">
        <div class="avatar-circle avatar-purple"><i class="fas fa-box"></i></div>
        <div>
          <div class="member-name">${nombre}</div>
          <div class="member-id">${categoria}</div>
        </div>
      </div>
      <span class="badge-status badge-success">Stock: <strong id="stock-p-${customId}">${stock}</strong></span>
    </div>
    <div class="socio-details">
      <div class="socio-detail-item"><i class="fas fa-tag"></i> Precio: <strong>$<span id="precio-p-${customId}">${precio}</span></strong></div>
      <div class="socio-detail-item"><i class="fas fa-boxes"></i> Categoría: ${categoria}</div>
    </div>

    <div class="socio-card-actions-custom">
      <button class="btn-ficha" onclick="venderDirectoProducto('${nombre}', ${precio}, '${customId}')">Vender Rápido</button>
      
        <button class="pill-btn btn-ficha btn-editar" onclick="abrirModalEditarProducto('${customId}', '${customId}')">
          <i class="fas fa-pen"></i> Editar
        </button>
        <button class="pill-btn btn-ficha btn-toggle-status estado-inactivar " onclick="eliminarProductoCard('${customId}')">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      
    </div>
  `;

  grid.prepend(card);
  
  // Actualizar select de facturación
  const select = document.getElementById('factura-prod-select');
  const opt = document.createElement('option');
  opt.value = `${nombre}|${precio}`;
  opt.textContent = `${nombre} ($${precio})`;
  select.appendChild(opt);

  event.target.reset();
  closeModal('modal-nuevo-producto');
  showToast(`Producto "${nombre}" agregado al inventario`);
}

// 2. Lógica de Ventas
function venderDirectoProducto(nombre, precio, id) {
  const cant = 1;
  const total = precio * cant;
  recaudadoTiendaTotal += total;
  document.getElementById('total-ventas-tienda-badge').textContent = `Total Recaudado Hoy: $${recaudadoTiendaTotal.toFixed(2)}`;

  const tabla = document.querySelector('#tabla-ventas-tienda tbody');
  const rowId = 'venta-row-' + Math.floor(Math.random() * 90000);
  const facturaNum = '#FAC-' + Math.floor(3030 + Math.random() * 90);

  const tr = document.createElement('tr');
  tr.id = rowId;
  tr.innerHTML = `
    <td><strong>${facturaNum}</strong></td>
    <td>${nombre}</td>
    <td>${cant}</td>
    <td>Efectivo Rápido</td>
    <td>$${total.toFixed(2)}</td>
    <td>
      <button class="pill-btn" style="color: #ef4444; border-color: rgba(239,68,68,0.3);" onclick="eliminarVentaTienda('${rowId}', ${total})">
        <i class="fas fa-trash"></i> Eliminar Venta
      </button>
    </td>
  `;
  tabla.prepend(tr);
  showToast(`Venta de ${nombre} facturada correctamente`);
}

function handleFacturarTienda(event) {
  event.preventDefault();
  const prodData = document.getElementById('factura-prod-select').value.split('|');
  const nombre = prodData[0];
  const precio = parseFloat(prodData[1]);
  const cant = parseInt(document.getElementById('factura-cant').value);
  const metodo = document.getElementById('factura-metodo').value;

  const total = precio * cant;
  recaudadoTiendaTotal += total;
  document.getElementById('total-ventas-tienda-badge').textContent = `Total Recaudado Hoy: $${recaudadoTiendaTotal.toFixed(2)}`;

  const tabla = document.querySelector('#tabla-ventas-tienda tbody');
  const rowId = 'venta-row-' + Math.floor(Math.random() * 90000);
  const facturaNum = '#FAC-' + Math.floor(3025 + Math.random() * 90);

  const tr = document.createElement('tr');
  tr.id = rowId;
  tr.innerHTML = `
    <td><strong>${facturaNum}</strong></td>
    <td>${nombre}</td>
    <td>${cant}</td>
    <td>${metodo}</td>
    <td>$${total.toFixed(2)}</td>
    <td>
      <button class="pill-btn" style="color: #ef4444; border-color: rgba(239,68,68,0.3);" onclick="eliminarVentaTienda('${rowId}', ${total})">
        <i class="fas fa-trash"></i> Eliminar Venta
      </button>
    </td>
  `;
  tabla.prepend(tr);

  event.target.reset();
  closeModal('modal-facturar-tienda');
  showToast(`Factura ${facturaNum} emitida por $${total.toFixed(2)}`);
}

function actualizarTotalRecaudado(montoARestar) {
  const badgeTotal = document.getElementById('total-ventas-tienda-badge');
  if (badgeTotal) {
      let textoActual = badgeTotal.innerText;
      let match = textoActual.match(/\$([\d.]+)/);
      if (match) {
          let totalActual = parseFloat(match[1]);
          let nuevoTotal = Math.max(0, totalActual + montoARestar);
          badgeTotal.innerText = `Total Recaudado Hoy: $${nuevoTotal.toFixed(2)}`;
      }
  }
}

function mostrarToastNotificacion(mensaje) {
  const toast = document.getElementById('toast-notificacion');
  if (toast) {
      // Opcional: Actualizar el mensaje del toast si se provee
      if(mensaje) {
          toast.querySelector('span').innerText = mensaje;
      }
      toast.style.display = 'flex';
      setTimeout(() => {
          toast.style.display = 'none';
      }, 3000);
  }
}

// 3. Funciones de Preparación de Eliminación (Unificadas)
function eliminarVentaTienda(rowId, montoVenta) {
  idParaEliminar = rowId;
  tipoEliminacion = 'venta';
  montoAEliminar = montoVenta;
  const modal = document.getElementById('modal-eliminar-custom');
  if (modal) modal.style.display = 'flex';
}

function eliminarProductoCard(cardId) {
  idParaEliminar = cardId;
  tipoEliminacion = 'producto';
  const modal = document.getElementById('modal-eliminar-custom');
  if (modal) modal.style.display = 'flex';
}

// 4. Edición de Producto (Corregida y unificada a 1 sola función)
function abrirModalEditarProducto(cardId, stockId) {
  tarjetaEditandoseId = cardId;
  stockIdActual = stockId;
  
  const card = document.getElementById(cardId);
  if (card) {
      const nombre = card.querySelector('.member-name').innerText;
      const stockEl = document.getElementById('stock-p-' + stockId);
      const precioEl = document.getElementById('precio-p-' + stockId);

      // Si encuentra los elementos los carga, si no, coloca 0
      document.getElementById('edit-prod-nombre').value = nombre;
      document.getElementById('edit-prod-stock').value = stockEl ? stockEl.innerText : '0';
      document.getElementById('edit-prod-precio').value = precioEl ? precioEl.innerText : '0.00';

      document.getElementById('modal-editar-producto').style.display = 'flex';
  }
}

// 5. Un solo event listener Global para manejar ambos modales (Eliminar y Editar)
document.addEventListener('DOMContentLoaded', () => {
  // Lógica del Modal Eliminar
  const modalEliminar = document.getElementById('modal-eliminar-custom');
  const btnCancelarEliminar = document.getElementById('btn-cancelar-custom');
  const btnAceptarEliminar = document.getElementById('btn-aceptar-custom');

  if (btnCancelarEliminar) {
      btnCancelarEliminar.addEventListener('click', () => {
          if (modalEliminar) modalEliminar.style.display = 'none';
          idParaEliminar = null;
          tipoEliminacion = null;
      });
  }

  if (btnAceptarEliminar) {
      btnAceptarEliminar.addEventListener('click', () => {
          if (idParaEliminar) {
              const elemento = document.getElementById(idParaEliminar);
              if (elemento) {
                  elemento.remove(); // Borra tanto si es tabla (venta) como si es div (producto)
              }
              // Restar el saldo solo si eliminamos una venta
              if (tipoEliminacion === 'venta') {
                  actualizarTotalRecaudado(-montoAEliminar);
              }
          }
          
          if (modalEliminar) modalEliminar.style.display = 'none';
          idParaEliminar = null;
          tipoEliminacion = null;
          mostrarToastNotificacion("Se ha eliminado correctamente");
      });
  }

  // Lógica del Modal Editar
  const modalEditar = document.getElementById('modal-editar-producto');
  const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion-prod');
  const btnGuardarEdicion = document.getElementById('btn-guardar-edicion-prod');

  if (btnCancelarEdicion) {
      btnCancelarEdicion.addEventListener('click', () => {
          if(modalEditar) modalEditar.style.display = 'none';
          tarjetaEditandoseId = null;
          stockIdActual = null;
      });
  }

  if (btnGuardarEdicion) {
      btnGuardarEdicion.addEventListener('click', () => {
          if (tarjetaEditandoseId && stockIdActual) {
              const card = document.getElementById(tarjetaEditandoseId);
              
              if (card) {
                  const nuevoNombre = document.getElementById('edit-prod-nombre').value;
                  const nuevoStock = document.getElementById('edit-prod-stock').value;
                  const nuevoPrecio = parseFloat(document.getElementById('edit-prod-precio').value) || 0;

                  // Actualizar interfaz visual
                  card.querySelector('.member-name').innerText = nuevoNombre;
                  card.setAttribute('data-name', nuevoNombre);
                  
                  const stockEl = document.getElementById('stock-p-' + stockIdActual);
                  if(stockEl) stockEl.innerText = nuevoStock;
                  
                  const precioEl = document.getElementById('precio-p-' + stockIdActual);
                  if(precioEl) precioEl.innerText = nuevoPrecio.toFixed(2);

                  // Actualizar botón "Vender Rápido"
                  const btnVender = card.querySelector('.btn-ficha');
                  if (btnVender) {
                      btnVender.setAttribute('onclick', `venderDirectoProducto('${nuevoNombre}', ${nuevoPrecio}, '${stockIdActual}')`);
                  }
              }
          }

          if(modalEditar) modalEditar.style.display = 'none';
          tarjetaEditandoseId = null;
          stockIdActual = null;
          mostrarToastNotificacion("Cambios guardados");
      });
  }
});


// ==========================================
// CONTROL DEL MENU LATERAL (SIDEBAR) EN MOVILES
// ==========================================

// Exponer la función globalmente para que el HTML la detecte en teléfonos
window.toggleSidebar = function(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation(); // Evita que el evento se cancele en pantallas táctiles
  }

  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (sidebar) {
    sidebar.classList.toggle('active-mobile');
  }

  if (overlay) {
    overlay.classList.toggle('active');
  }
};

// Cierre automático al cambiar de módulo en móviles
const originalSwitchModule = window.switchModule;
if (typeof originalSwitchModule === 'function') {
  window.switchModule = function(moduleId, element) {
    originalSwitchModule(moduleId, element);
    
    // Si el sidebar está abierto en teléfono, cerrarlo al hacer clic en un módulo
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && sidebar.classList.contains('active-mobile')) {
      sidebar.classList.remove('active-mobile');
    }
    if (overlay && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  };
}