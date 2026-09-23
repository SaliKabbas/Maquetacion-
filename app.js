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