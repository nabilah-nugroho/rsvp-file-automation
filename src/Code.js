function salinFileFinalRapi() {
  const folderTujuanId = PropertiesService
    .getScriptProperties()
    .getProperty("FOLDER_TUJUAN_ID");

  if (!folderTujuanId) {
    throw new Error("FOLDER_TUJUAN_ID belum diset di Script Properties.");
  }

  try {
    const folder = DriveApp.getFolderById(folderTujuanId.trim());
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    const rolesAllowed = ["Staff", "LCVP", "Team Leader/Manager", "President"];

    for (let i = 1; i < data.length; i++) {
      const namaPengirim = String(data[i][2]).trim(); // Kolom C
      const roleCell = String(data[i][3]).trim();     // Kolom D
      const urlCell = String(data[i][6]).trim();      // Kolom G

      const matchesRole = rolesAllowed.some(role => roleCell.includes(role));
      const isNewies = roleCell.includes("Newies");

      if (urlCell && urlCell.includes("drive.google.com") && matchesRole && !isNewies) {
        try {
          const fileIdMatch = urlCell.match(/[-\w]{25,}/);

          if (!fileIdMatch) {
            Logger.log(`⚠️ SKIP Baris ${i + 1}: Link Drive tidak valid`);
            continue;
          }

          const fileId = fileIdMatch[0];
          const fileAsli = DriveApp.getFileById(fileId);

          const namaLama = fileAsli.getName();
          const ekstensi = namaLama.includes(".")
            ? namaLama.substring(namaLama.lastIndexOf("."))
            : "";

          const namaBaru = sanitizeFileName_(namaPengirim) + ekstensi;

          fileAsli.makeCopy(namaBaru, folder);
          Logger.log(`BERHASIL: Menyimpan sebagai "${namaBaru}"`);
        } catch (e) {
          Logger.log(`SKIP Baris ${i + 1}: ${e.message}`);
        }
      }
    }

    Logger.log("SEMUA SELESAI! Cek folder Drive sekarang.");
  } catch (err) {
    Logger.log(`ERROR: ${err.message}`);
  }
}

function sanitizeFileName_(name) {
  return String(name).replace(/[\\/:*?"<>|]/g, "").trim();
}