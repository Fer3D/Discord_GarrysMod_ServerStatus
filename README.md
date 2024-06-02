# Bot de Discord para el Estado del Servidor de Gmod 📊
Script que permite obtener el estado de un servidor de Gmod gracias a un bot de Discord con nodeJS.

## 👀 Vista previa
![alt text](https://github.com/Fer3D/Discord_GarrysMod_ServerStatus/blob/main/preview.png?raw=true)

## 🛠 Instalación
- Copia los archivos de este repositorio en el archivo del servidor

- Instala los paquetes de NodeJS, si necesitas un tutorial detallado busca en Youtube o en Google.

  `npm install`

- Crea un canal en tu servidor de Discord, dale click derecho y "Copiar ID del canal", si no te sale esta opción ve a la configuración de tu Discord, "Avanzado" y activa "Modo Desarrollador".

- Cambia los parámetros en el archivo config.json

  config.json:
  ```json
  {
    "token": "Token de Discord - https://discord.com/developers/applications",
    "channelID": "ID del Canal",
    "ip": "IP del servidor de Gmod sin el puerto",
    "port": 27025
  }
  ```
- Inicia el script con:

  `npm start` o `node index`
