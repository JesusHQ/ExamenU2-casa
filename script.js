document.addEventListener('DOMContentLoaded', function () {
    const lastCommandElement = document.getElementById('last-command');
    let lastExecutedCommandId = null;  // Variable para almacenar el ID de la última orden ejecutada
  
    function executeCommand(command, id) {
      if (lastExecutedCommandId !== id) {
        console.log(`Ejecutando: ${command}`);
        // Aquí agregas la lógica específica para ejecutar los comandos que has definido
        switch (command) {
          case 'enciende la luz de la recámara':
            document.querySelector('.foco-recamara').src = 'img/foco_on1.png';
            break;
          case 'apaga la luz de la recámara':
            document.querySelector('.foco-recamara').src = 'img/foco_off.png';
            break;
          case 'enciende la luz de la sala':
            document.querySelector('.foco-sala').src = 'img/foco_on1.png';
            break;
          case 'apaga la luz de la sala':
            document.querySelector('.foco-sala').src = 'img/foco_off.png';
            break;
          case 'enciende las luces del jardín':
            document.querySelector('.foco-jardin1').src = 'img/foco-jardin-on.png';
            document.querySelector('.foco-jardin2').src = 'img/foco-jardin-on.png';
            document.querySelector('.foco-jardin3').src = 'img/foco-jardin-on.png';
            document.querySelector('.foco-jardin4').src = 'img/foco-jardin-on.png';
            document.querySelector('.foco-jardin5').src = 'img/foco-jardin-on.png';
            break;
          case 'apaga las luces del jardín':
            document.querySelector('.foco-jardin1').src = 'img/foco-jardin-off.png';
            document.querySelector('.foco-jardin2').src = 'img/foco-jardin-off.png';
            document.querySelector('.foco-jardin3').src = 'img/foco-jardin-off.png';
            document.querySelector('.foco-jardin4').src = 'img/foco-jardin-off.png';
            document.querySelector('.foco-jardin5').src = 'img/foco-jardin-off.png';
            break;
          case 'enciende el ventilador':
            document.querySelector('.ventilador').src = 'img/ventilador-on.gif';
            break;
          case 'apaga el ventilador':
            document.querySelector('.ventilador').src = 'img/ventilador-off.png';
            break;
          case 'abre las cortinas':
            document.querySelector('.cortina1').src = 'img/cortina-abierta.png';
            document.querySelector('.cortina2').src = 'img/cortina-abierta.png';
            document.querySelector('.cortina3').src = 'img/cortina-abierta.png';
            break;
          case 'cierra las cortinas':
            document.querySelector('.cortina1').src = 'img/cortina-cerrada.gif';
            document.querySelector('.cortina2').src = 'img/cortina-cerrada.gif';
            document.querySelector('.cortina3').src = 'img/cortina-cerrada.gif';
            break;
          case 'activa la alarma de la casa':
            document.querySelector('.alarma').src = 'img/alarma-on.png';
            break;
          case 'apaga la alarma de la casa':
            document.querySelector('.alarma').src = 'img/alarma-off.png';
            break;
          case 'enciende las cámaras de seguridad':
            document.querySelector('.camara1').src = 'img/camara.gif';
            document.querySelector('.camara2').src = 'img/camara.gif';
            document.querySelector('.camara3').src = 'img/camara.gif';
            break;
          case 'apaga las cámaras de seguridad':
            document.querySelector('.camara1').src = 'img/camara-off.png';
            document.querySelector('.camara2').src = 'img/camara-off.png';
            document.querySelector('.camara3').src = 'img/camara-off.png';
            break;
            console.log('Comando de automatización del hogar:', command);
            // Aquí implementarías la lógica de control de dispositivos IoT o llamadas a otra API
            break;
          default:
            console.log('Comando no reconocido o no ejecutable en este contexto');
            break;
        }
        lastExecutedCommandId = id; // Actualizar el ID de la última orden ejecutada
      } else {
        console.log('Orden ya ejecutada:', command);
      }
    }
  
    function fetchLatestCommand() {
      const url = 'https://662eaf4d43b6a7dce30d8d96.mockapi.io/comandos'; 
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
          }
          return response.json();
        })
        .then(data => {
          if (data.length > 0) {
            const lastItem = data[data.length - 1];
            lastCommandElement.innerText = `Última orden: ${lastItem.orden}`;
            executeCommand(lastItem.orden, lastItem.id);  // Utilizando el campo 'id' para evitar repeticiones
          } else {
            lastCommandElement.innerText = "No hay datos disponibles.";
          }
        })
        .catch(error => {
          console.error('Error al recuperar datos:', error);
          lastCommandElement.innerText = "Error al cargar los datos.";
        });
    }
  
    // Llamada inicial inmediata y establecer intervalo para actualizar cada 2 segundos
    fetchLatestCommand();
    setInterval(fetchLatestCommand, 2000);
});
