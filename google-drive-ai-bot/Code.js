/**
 * 🧠 GOOGLE DRIVE AI ASSISTANT — Apps Script Bot
 * 
 * Поиск по Google Drive + Gemini 2.0 Flash + Telegram + Память в Sheets
 *
 * ДЕПЛОЙ: https://script.google.com → New project → вставить → Deploy as Web App
 * Затем запустить setTelegramWebhook()
 */

const CONFIG = {
  TELEGRAM_TOKEN: "7292379298:AAGbKpeqxM6hi3myCwgsx-h8OvbxX5Ignr0",
  GEMINI_API_KEY: "AIzaSyAufDRPAXjL126DMaqztnYt-qNoJF_CUS8",
  GEMINI_MODEL:   "gemini-2.0-flash",
  OWNER_CHAT_ID:  171656163,
  MEMORY_SHEET_ID: "",  // ← оставь пустым, создастся автоматически
  MAX_SEARCH_RESULTS: 10,
  MAX_FILE_CHARS: 3000,
  SYSTEM_PROMPT: `Ты — AI-ассистент для поиска и анализа документов Google Drive.
Отвечай на русском языке. Будь конкретным и полезным.
Если документы не содержат ответа — скажи об этом честно.`
};

function doPost(e) {
  try {
    const update = JSON.parse(e.postData.contents);
    if (!update.message?.text) return ContentService.createTextOutput("ok");
    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const text   = update.message.text.trim();
    if (text.startsWith("/search ")) {
      handleSearch(chatId, userId, text.replace("/search ", ""));
    } else if (text === "/start") {
      sendTelegram(chatId, "👋 Привет! Напиши вопрос — найду в Google Drive и отвечу через Gemini.\n\nКоманды: /search, /memory, /clear, /stats");
    } else if (text === "/memory") {
      showMemory(chatId, userId);
    } else if (text === "/clear") {
      clearMemory(userId);
      sendTelegram(chatId, "🧹 Память очищена.");
    } else if (text === "/stats") {
      showStats(chatId);
    } else {
      handleQuestion(chatId, userId, text);
    }
  } catch(err) { Logger.log("doPost error: " + err); }
  return ContentService.createTextOutput("ok");
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status:"running",timestamp:new Date().toISOString(),version:"1.0"})).setMimeType(ContentService.MimeType.JSON);
}

function handleQuestion(chatId, userId, question) {
  sendTelegram(chatId, "🔍 Ищу в Google Drive...");
  saveMemory(userId, "Q: " + question);
  const files = searchDrive(question);
  if (files.length === 0) {
    const answer = askGemini("Контекст: " + getMemory(userId), question);
    saveMemory(userId, "A: " + answer.substring(0, 200));
    sendTelegram(chatId, answer + "\n\n_(документы в Drive не найдены)_");
    return;
  }
  sendTelegram(chatId, `📄 Найдено ${files.length} документов. Анализирую...`);
  const context = buildContext(files);
  const memory  = getMemory(userId, 3);
  const fullCtx = memory ? `История:\n${memory}\n\nДокументы:\n${context}` : `Документы:\n${context}`;
  const answer  = askGemini(fullCtx, question);
  saveMemory(userId, "A: " + answer.substring(0, 300));
  const sources = files.map((f,i) => `${i+1}. ${f.name} — ${f.url}`).join("\n");
  sendTelegram(chatId, answer + "\n\n📎 Источники:\n" + sources);
}

function handleSearch(chatId, userId, query) {
  sendTelegram(chatId, `🔍 Ищу: "${query}"`);
  const files = searchDrive(query);
  if (files.length === 0) { sendTelegram(chatId, "❌ Ничего не найдено."); return; }
  const list = files.map((f,i) => `${i+1}. ${f.name}\n   ${f.url}`).join("\n\n");
  sendTelegram(chatId, `✅ Найдено ${files.length} файлов:\n\n${list}`);
}

function searchDrive(query) {
  const results = [];
  const safeQ = query.replace(/'/g, "\\'");
  const mimes = [
    "application/vnd.google-apps.document",
    "application/vnd.google-apps.spreadsheet"
  ];
  for (const mime of mimes) {
    try {
      const it = DriveApp.searchFiles(`fullText contains '${safeQ}' and mimeType = '${mime}' and trashed = false`);
      let n = 0;
      while (it.hasNext() && n < 5) {
        const f = it.next();
        results.push({id:f.getId(), name:f.getName(), type:mime.includes("document")?"doc":"sheet", url:f.getUrl(), modified:f.getLastUpdated().toLocaleDateString("ru-RU")});
        n++;
      }
    } catch(e) { Logger.log("search error: "+e); }
  }
  return results;
}

function readFileContent(fileId, fileType) {
  try {
    if (fileType === "doc") return DocumentApp.openById(fileId).getBody().getText().substring(0, CONFIG.MAX_FILE_CHARS);
    if (fileType === "sheet") return SpreadsheetApp.openById(fileId).getActiveSheet().getDataRange().getValues().slice(0,20).map(r=>r.join(" | ")).join("\n").substring(0, CONFIG.MAX_FILE_CHARS);
  } catch(e) { Logger.log("readFile error: "+e); }
  return "";
}

function buildContext(files) {
  return files.slice(0,5).map(f => {
    const content = readFileContent(f.id, f.type);
    return content ? `=== ${f.name} ===\n${content}` : "";
  }).filter(Boolean).join("\n\n") || "Содержимое недоступно.";
}

function askGemini(context, question) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  try {
    const resp = UrlFetchApp.fetch(url, {
      method:"POST", contentType:"application/json", muteHttpExceptions:true,
      payload: JSON.stringify({
        system_instruction:{parts:[{text:CONFIG.SYSTEM_PROMPT}]},
        contents:[{parts:[{text:`Контекст:\n${context}\n\nВопрос: ${question}`}]}],
        generationConfig:{temperature:0.7, maxOutputTokens:1024}
      })
    });
    const data = JSON.parse(resp.getContentText());
    if (data.error) return `❌ Gemini: ${data.error.message}`;
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Нет ответа.";
  } catch(e) { return "❌ Ошибка Gemini: " + e.message; }
}

function getMemorySheet() {
  if (!CONFIG.MEMORY_SHEET_ID) {
    const ss = SpreadsheetApp.create("AI Assistant Memory");
    CONFIG.MEMORY_SHEET_ID = ss.getId();
    ss.getActiveSheet().setName("Memory").getRange("A1:D1").setValues([["user_id","timestamp","role","text"]]);
    Logger.log("Memory sheet created: " + ss.getUrl());
    return ss.getActiveSheet();
  }
  return SpreadsheetApp.openById(CONFIG.MEMORY_SHEET_ID).getSheetByName("Memory");
}

function saveMemory(userId, text) {
  try { getMemorySheet().appendRow([userId.toString(), new Date().toISOString(), text.startsWith("Q:")?"user":"assistant", text.substring(0,500)]); } catch(e) { Logger.log("saveMemory: "+e); }
}

function getMemory(userId, lastN=6) {
  try {
    const data = getMemorySheet().getDataRange().getValues().slice(1).filter(r=>r[0].toString()===userId.toString()).slice(-lastN*2);
    return data.map(r=>r[3]).join("\n");
  } catch(e) { return ""; }
}

function clearMemory(userId) {
  try {
    const sheet = getMemorySheet();
    const data = sheet.getDataRange().getValues();
    for (let i=data.length-1; i>=1; i--) { if (data[i][0].toString()===userId.toString()) sheet.deleteRow(i+1); }
  } catch(e) { Logger.log("clearMemory: "+e); }
}

function showMemory(chatId, userId) {
  const m = getMemory(userId, 10);
  sendTelegram(chatId, m ? "🧠 Память:\n\n"+m : "📭 Память пуста.");
}

function showStats(chatId) {
  try {
    const data = getMemorySheet().getDataRange().getValues().slice(1);
    sendTelegram(chatId, `📊 Статистика:\n• Пользователей: ${new Set(data.map(r=>r[0])).size}\n• Сообщений: ${data.length}\n• Модель: ${CONFIG.GEMINI_MODEL}`);
  } catch(e) { sendTelegram(chatId, "❌ "+e.message); }
}

function sendTelegram(chatId, text, parseMode="") {
  const payload = {chat_id:chatId, text:text.substring(0,4096), disable_web_page_preview:true};
  if (parseMode) payload.parse_mode = parseMode;
  try { UrlFetchApp.fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/sendMessage`, {method:"POST", contentType:"application/json", payload:JSON.stringify(payload), muteHttpExceptions:true}); } catch(e) { Logger.log("sendTelegram: "+e); }
}

// ============ УТИЛИТЫ (запускать вручную в редакторе) ============
function testDriveSearch() { Logger.log(JSON.stringify(searchDrive("проект"))); }
function testGemini() { Logger.log(askGemini("Тест.", "Как дела?")); }
function sendTestMessage() { sendTelegram(CONFIG.OWNER_CHAT_ID, "✅ Apps Script бот работает!"); }
function setTelegramWebhook() {
  const url = ScriptApp.getService().getUrl();
  const r = UrlFetchApp.fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/setWebhook`, {method:"POST",contentType:"application/json",payload:JSON.stringify({url}),muteHttpExceptions:true});
  Logger.log("Webhook: " + r.getContentText() + "\nURL: " + url);
}
function removeTelegramWebhook() {
  UrlFetchApp.fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_TOKEN}/deleteWebhook`,{method:"POST",muteHttpExceptions:true});
}
