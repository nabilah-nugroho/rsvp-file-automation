# RSVP File Automation

Google Apps Script untuk mengotomatisasi proses pengambilan file dari link Google Drive yang tercatat di Google Sheets, lalu menyalin file tersebut ke folder tujuan dengan nama baru berdasarkan nama pengirim.

## Features

- Membaca data dari Google Sheets
- Memfilter data berdasarkan role tertentu
- Mengabaikan entri dengan role `Newies`
- Mengambil file dari link Google Drive
- Menyalin file ke folder tujuan
- Mengganti nama file sesuai nama pengirim
- Menjaga ekstensi file asli

## Use Case

Script ini cocok untuk workflow administrasi internal seperti:
- pengumpulan dokumen RSVP
- pengumpulan assignment atau submission berbasis Google Form / Google Sheets
- pengelolaan file member berdasarkan role tertentu
- otomatisasi renaming file dari spreadsheet response

## How It Works

Script akan:

1. Membaca seluruh data dari sheet aktif
2. Mengambil:
   - **Nama pengirim** dari kolom **C**
   - **Role** dari kolom **D**
   - **Link file Google Drive** dari kolom **G**
3. Memproses hanya baris dengan role berikut:
   - `Staff`
   - `LCVP`
   - `Team Leader/Manager`
   - `President`
4. Mengabaikan baris yang mengandung role `Newies`
5. Mengambil file dari link Drive
6. Menyalin file ke folder tujuan
7. Mengganti nama file menjadi:
   - `Nama Pengirim + ekstensi file asli`

Contoh:
- nama pengirim: `Nabilah`
- file asli: `document.pdf`

hasil copy:
- `Nabilah.pdf`

---

## Project Structure

```bash
rsvp-file-automation/
├─ Code.gs
├─ appsscript.json
├─ .gitignore
└─ README.md