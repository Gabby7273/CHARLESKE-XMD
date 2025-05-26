const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUxKYkpZcEdNbFJKUThoaXNnUU12emF3SEZJeGFhd3ZGK0hwQi8vaVhWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaG1UQWNickw3UDBid0pOd2hpdW1iVXFNRm9OZ0ttckUwRk02dW9TOVFuTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZS1RmK09zK2IweFprbENrd1V2dXk1eGZNVG1mVmw1cWVSTHAxSHl5Vm5rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkUmlXaTd0U3laVUJGaU92Mjd3dWN3cTA1RjBmRGVOZ01aRlVBbzNJZ3h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBEMVFaVTdydHVjYU1jSW52anVqZmlZU1k3MnVjSDQvQTExRHZzZlB1VzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRqeWJkdmVyRmZ2WWtBMEtVeXdpc1VEV0ViNmxWWEFvZkZlTU9iSmJtVFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkU3WGsxNmlFdy9QMFEyczJpMktqRll6RHdZRWcvbktha0xPaFZHcUlIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXE2NHlMMStaL3pSS2x6RUJJbUlIV3B2SFVLMDR0aktxMzAxNjkzQnlDcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJFZm1ETjY2ZXQyTFV6QlVSMjF0QlZ0OU50RlRiREUzZ1RxaGV4M0ZEQVBUZHNPUXhJVVcvMUszQUgxaWQwcFZUL0FNdkIyVktqWk80a0J5dUw2dUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjgsImFkdlNlY3JldEtleSI6IndQWDFOWVdnYkxYTEVBNitTZE16UENMVnBtTmpTZUtTRjFrQ0NJdnBZb3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTMyODcxMzI1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjcwQkEyRDkxQzBCNzNERkM2NzM2MThBNzBCNDlDODc4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgyNzE4MTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzUzMjg3MTMyNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFMTU3NTc3Mzk1QzM5NDk5RkUwOUI4N0JCQjcwQTk0RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MjcxODE5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1MzI4NzEzMjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0EyRTVBNkFCRjQ0RTQ3MDU2MDkxRjVCMEVFQTFBNUUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODI3MTgzNX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTMyODcxMzI1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM0RDQ5N0JFNDIzNjE1MUU4MURCRjcyRTRDQjUwNjI0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgyNzE4NTB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzUzMjg3MTMyNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBMzc3QTRDRTZDMTZCOUZDMEZGODFCQjNBQzYzNjlBRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MjcxODUwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1MzI4NzEzMjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUVBMTAyQUE0QzhGREJCQzE2RTc2MDVFQzM2NzRGODcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODI3MTg1NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjIzMzUzMjg3MTMyNTo2NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE0NDQ0MDMzNzM4Nzc2ODo2NkBsaWQiLCJuYW1lIjoi4pig77iPR0hPU1RPTE9HWfCfkoAifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k3bHF1Y0hFTHFGMHNFR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjUrdWI2aGNUNlE1OEFrbHRnSGd6T2tTakFYVHIyYlZSN1laSmFIS09uaDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlhmdE1WZ291cVh6TFY3Vmw5cUc1SFY4RXhqNVpCSUxxcDU2QWZPY05wMUtzVWNKRjFza21oaitCNlBwd1Vma21zRytpRzErU1R3dWQwdkZRZG5lYkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJibThrYjAxKzhsb1Q2OHg2YkszejYxRUhUWUJHMXZwQ1ZaVkVRd0p3UFNMMG43U2l4MHF6Q2ZTbVV6Z0ZvUFR5cXg2aTFIbnBaTGNRdEdLME9STkJDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzUzMjg3MTMyNTo2NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlZnJtK29YRStrT2ZBSkpiWUI0TXpwRW93RjA2OW0xVWUyR1NXaHlqcDRlIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDgyNzE4MTUsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSy9IIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Charles ke",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233532871325",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

