
function handleLogin(event) {
      event.preventDefault();
      document.getElementById('login-view').classList.remove('active');
      document.getElementById('app-view').classList.add('active');
      showToast('¡Bienvenido al Panel de Global Fit!');
    }

    function logout() {
      document.getElementById('app-view').classList.remove('active');
      document.getElementById('login-view').classList.add('active');
      showToast('Sesión cerrada correctamente');
    }

    function togglePasswordVisibility() {
      const passInput = document.getElementById('login-pass');
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
    }

    function switchModule(moduleId, element) {
      document.querySelectorAll('.module-view').forEach(mod => mod.style.display = 'none');
      
      const selectedModule = document.getElementById('module-' + moduleId);
      if (selectedModule) {
        selectedModule.style.display = 'block';
        // JS Animation: Fade in transition effect
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
        tienda: ['Inventario y Tienda Global Fit', 'Control de comida, bebidas, toallas, guantes y facturación'],
        caja: ['Caja y Registro de Pagos', 'Flujo de efectivo e historial de transacciones'],
        configuracion: ['Configuración del Sistema', 'Parámetros generales de la plataforma']
      };

      if (titles[moduleId]) {
        titleEl.textContent = titles[moduleId][0];
        subTitleEl.textContent = titles[moduleId][1];
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

    let recaudadoTiendaTotal = 48.50;

    function handleGuardarProducto(event) {
      event.preventDefault();
      const nombre = document.getElementById('prod-nombre').value;
      const categoria = document.getElementById('prod-cat').value;
      const stock = document.getElementById('prod-stock').value;
      const precio = parseFloat(document.getElementById('prod-precio').value).toFixed(2);

      const grid = document.getElementById('tienda-grid-container');
      const card = document.createElement('div');
      card.className = 'socio-card';
      card.setAttribute('data-category', categoria);
      card.setAttribute('data-name', nombre);

      card.innerHTML = `
        <div class="socio-card-header">
          <div class="socio-info-main">
            <div class="avatar-circle avatar-purple"><i class="fas fa-box"></i></div>
            <div>
              <div class="member-name">${nombre}</div>
              <div class="member-id">${categoria}</div>
            </div>
          </div>
          <span class="badge-status badge-success">Stock: <strong>${stock}</strong></span>
        </div>
        <div class="socio-details">
          <div class="socio-detail-item"><i class="fas fa-tag"></i> Precio: <strong>$${precio}</strong></div>
          <div class="socio-detail-item"><i class="fas fa-boxes"></i> Categoría: ${categoria}</div>
        </div>
        <button class="btn-ficha" onclick="venderDirectoProducto('${nombre}', ${precio}, 'custom')">Vender Rápido</button>
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

    function eliminarVentaTienda(rowId, monto) {
      const row = document.getElementById(rowId);
      if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.3s ease';
        setTimeout(() => {
          row.remove();
          recaudadoTiendaTotal -= monto;
          if (recaudadoTiendaTotal < 0) recaudadoTiendaTotal = 0;
          document.getElementById('total-ventas-tienda-badge').textContent = `Total Recaudado Hoy: $${recaudadoTiendaTotal.toFixed(2)}`;
          showToast('Venta anulada y eliminada por error correctamente');
        }, 300);
      }
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

      // JavaScript Animation for new card entrance
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
        <button class="btn-ficha" onclick="verFichaSocio('${nombre}', '${cedula}', '${plan}', 'Activo')">Ficha Téchnica</button>
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
        <td><button class="pill-btn" onclick="verFichaSocio('${nombre}', '${cedula}', '${plan}', 'Activo')">Ficha</button></td>
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

    function handleGuardarPlan(event) {
      event.preventDefault();
      const nombre = document.getElementById('plan-nombre').value;
      const duracion = document.getElementById('plan-duracion').value;
      const precio = parseFloat(document.getElementById('plan-precio').value).toFixed(2);
      const periodo = document.getElementById('plan-periodo').value;
      const beneficiosRaw = document.getElementById('plan-beneficios').value;
      
      const beneficiosList = beneficiosRaw ? beneficiosRaw.split(',').map(b => `<li><i class="fas fa-check-circle"></i> ${b.trim()}</li>`).join('') : `<li><i class="fas fa-check-circle"></i> Acceso general</li>`;

      const plansContainer = document.getElementById('plans-grid-container');
      const newPlanCard = document.createElement('div');
      newPlanCard.className = 'plan-card';
      
      // JavaScript entrance animation
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
      showToast(`¡Plan "${nombre}" creado exitosamente!`);
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

    function openAddEntrenadorModal() {
    document.getElementById('modal-add-entrenador').classList.remove('hidden');
    }

    function closeAddEntrenadorModal() {
        document.getElementById('modal-add-entrenador').classList.add('hidden');
        document.getElementById('form-add-entrenador').reset();
    }

    function handleSaveEntrenador(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('new-ent-nombre').value;
        const especialidad = document.getElementById('new-ent-especialidad').value;
        const email = document.getElementById('new-ent-email').value;
        const telefono = document.getElementById('new-ent-telefono').value;

        console.log("Guardando entrenador:", { nombre, especialidad, email, telefono });

        alert('¡Entrenador registrado con éxito!');
        closeAddEntrenadorModal();
    }

    function openHorarioModal(nombreEntrenador, especialidadEntrenador, horariosData) {
        document.getElementById('horario-nombre-entrenador').innerText = nombreEntrenador;
        document.getElementById('horario-especialidad').innerText = especialidadEntrenador;

        const container = document.getElementById('horario-list-container');
        container.innerHTML = '';

        horariosData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-sm';
            row.innerHTML = `
                **${item.dia}
                ${item.hora}
            `;
            container.appendChild(row);
        });

        document.getElementById('modal-horario').classList.remove('hidden');
    }

    function closeHorarioModal() {
        document.getElementById('modal-horario').classList.add('hidden');
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

  const name = document.getElementById('reg-name')?.value;
  const email = document.getElementById('reg-email')?.value;
  const pass = document.getElementById('reg-pass')?.value;
  const confirmPass = document.getElementById('reg-confirm-pass')?.value;

  if (pass !== confirmPass) {
    showToast('Las contraseñas no coinciden');
    return false;
  }

  closeRegisterModal();
  document.getElementById('register-form')?.reset();

  const loginEmail = document.getElementById('login-email');
  if (loginEmail && email) {
    loginEmail.value = email;
  }

  showToast('¡Registro exitoso! Ya puedes iniciar sesión.');
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

function switchModule(moduleName, element) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}
/*final de registro */