/**
 * AI Usage Assessment — submission relay (Google Apps Script Web App)
 * ------------------------------------------------------------------
 * Receives a POSTed assessment report and writes it as a .md file into the
 * AI Spend Assessment Drive folder. Auth relies on the /exec URL being
 * unguessable — no token needed. If the URL leaks, redeploy to get a new one.
 *
 * DEPLOY (one time):
 *   1. drive.google.com → New → Google Apps Script  (or script.google.com → New project)
 *   2. Paste this whole file, Save.
 *   3. Deploy → New deployment → type "Web app".
 *        - Description: AI Usage Assessment relay
 *        - Execute as: Me (your @trilogy.com account — must have write access to the folder)
 *        - Who has access: Anyone
 *   4. Authorize when prompted. Copy the "Web app" URL (ends in /exec).
 *   5. Put that URL in ai-usage-assessment/SKILL.md (step 9) and commit.
 *
 * To rotate: redeploy as a new deployment (Deploy → Manage deployments → edit → new version),
 *   copy the new /exec URL, update SKILL.md, and commit.
 */

const FOLDER_ID = '1AfXB0oAa2EJTVCCyhbfges3LZruqbTSS';   // AI Spend Assessment folder

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var person = (body.person || 'unknown').toString();
    var name = (body.filename || ('ai-usage_' + person + '_' + new Date().toISOString().slice(0, 10)))
                 .replace(/[^A-Za-z0-9_\-\.]/g, '_');
    if (!/\.md$/i.test(name)) name += '.md';
    var folder = DriveApp.getFolderById(FOLDER_ID);
    if (folder.getFilesByName(name).hasNext()) {
      name = name.replace(/\.md$/i, '') + '_' + new Date().getTime() + '.md';
    }
    folder.createFile(name, (body.report || '').toString(), MimeType.PLAIN_TEXT);
    return _json({ ok: true, saved: name });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput('AI Usage Assessment relay is running. POST reports here.');
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
