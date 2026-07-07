# RSVP File Automation

## Overview

This project was built to automate a handover task for AIESEC in UPN Veteran Jakarta.

The initial use case was collecting photos submitted through Google Forms. Since uploaded files often had different and inconsistent filenames, organizing them manually took a lot of time. Each file had to be downloaded, renamed based on the submitter’s name, and placed into the correct Google Drive folder for handover.

To simplify that process, I created this Google Apps Script automation to read submission data from Google Sheets, retrieve the submitted Google Drive files, rename them using each person’s name, and copy them into a designated folder automatically.

---

## Features

- Reads submission data from Google Sheets
- Filters entries based on selected roles
- Skips entries containing the `Newies` role
- Extracts file links from Google Drive URLs
- Copies submitted files into a target Google Drive folder
- Renames files using each submitter’s name
- Preserves the original file extension

---

## Use Cases

This script is useful for administrative workflows such as:

- collecting RSVP-related documents or photos
- organizing submissions from Google Forms / Google Sheets
- renaming uploaded files automatically based on participant names
- preparing structured handover files for internal team transitions
- managing member documents based on role-based filtering

---

## How It Works

The script processes the active Google Sheet and performs the following steps:

1. Reads all rows from the active sheet
2. Extracts:
   - **Submitter name** from column **C**
   - **Role** from column **D**
   - **Google Drive file link** from column **G**
3. Processes only rows that match one of these roles:
   - `Staff`
   - `LCVP`
   - `Team Leader/Manager`
   - `President`
4. Skips rows containing the role `Newies`
5. Extracts the file ID from the Google Drive link
6. Copies the file into a destination folder
7. Renames the copied file using the format:

```text
Submitter Name + original file extension
````

### Example

If the sheet contains:

* Submitter name: `Nabilah`
* Original file: `document.pdf`

The copied file will be saved as:

```text
Nabilah.pdf
```

---

## Project Structure

```bash
rsvp-file-automation/
├─ Code.gs
├─ appsscript.json
├─ .gitignore
├─ .env.example
└─ README.md
```

---

## Spreadsheet Format

This script assumes the spreadsheet follows the structure below:

| Column | Description            |
| ------ | ---------------------- |
| C      | Submitter name         |
| D      | Role                   |
| G      | Google Drive file link |

Make sure the sheet layout matches the column indexes used in the script.

---

## Configuration

For security reasons, the destination folder ID should not be hardcoded directly in the source code if the repository is public.

Instead, store it in **Google Apps Script Script Properties**.

### Required Script Property

| Key                | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `FOLDER_TUJUAN_ID` | The Google Drive folder ID where copied files will be saved |

---

## Installation & Setup

### 1. Open or clone the Apps Script project

Open the Google Apps Script project directly, or clone it locally using `clasp`.

### 2. Add the required Script Property

In Google Apps Script:

* Open **Project Settings**
* Find **Script properties**
* Add the following property:

```text
Key: FOLDER_TUJUAN_ID
Value: your_google_drive_folder_id
```

### 3. Make sure the spreadsheet format matches the expected structure

Ensure that:

* column **C** contains the submitter’s name
* column **D** contains the role
* column **G** contains the Google Drive file link

---

## How to Use

Follow these steps to use the automation:

### 1. Prepare the Google Sheet

Make sure your Google Sheet contains the required data in the correct columns:

| Column | Description            |
| ------ | ---------------------- |
| C      | Submitter name         |
| D      | Role                   |
| G      | Google Drive file link |

Each row should represent one submission.

---

### 2. Prepare the destination Google Drive folder

Create or choose a Google Drive folder where the copied files will be stored.

Copy the folder ID from the folder URL.

Example:

```text
https://drive.google.com/drive/folders/your_folder_id_here
```

The folder ID is the part after `/folders/`.

---

### 3. Set the Script Property

In your Google Apps Script project:

1. Open **Project Settings**
2. Scroll to **Script properties**
3. Add a new property:

```text
Key: FOLDER_TUJUAN_ID
Value: your_google_drive_folder_id
```

This allows the script to know where copied files should be saved.

---

### 4. Open the correct spreadsheet tab

Make sure the sheet you want to process is the **active sheet**, since the script reads data from:

```javascript
SpreadsheetApp.getActiveSheet()
```

If your spreadsheet has multiple tabs, open the correct one before running the script.

---

### 5. Run the script

From the Apps Script editor, run:

```javascript
salinFileFinalRapi()
```

On the first run, Google will ask for authorization. Grant the required permissions so the script can access Google Sheets and Google Drive.

---

### 6. Check the results

After the script finishes running:

* valid files will be copied into the destination folder
* each copied file will be renamed using the submitter’s name
* rows with invalid links, unmatched roles, or `Newies` roles will be skipped

You can also check the execution logs in Apps Script to see which rows were processed or skipped.

---

## Example Workflow

Suppose your spreadsheet contains the following row:

* **Name:** Nabilah
* **Role:** Staff
* **Drive Link:** a valid Google Drive file link

If the original uploaded file is:

```text
IMG_2481.jpg
```

The script will create a copy in the destination folder with the name:

```text
Nabilah.jpg
```

---

## Notes

* The script only processes rows that contain a valid Google Drive link
* Files are **copied**, not moved
* The copied file keeps the original extension
* If one row fails, the script skips it and continues processing the rest
* If the folder ID is invalid or inaccessible, the script will stop with an error

---

## Security Notes

If this repository is public, avoid exposing sensitive information such as:

* Google Drive folder IDs
* spreadsheet IDs
* internal email addresses
* participant/member data
* private file links

Recommended practices:

* store sensitive configuration in **Script Properties**
* use `.gitignore` for local or sensitive files such as `.clasp.json` and `.env`

Example `.gitignore`:

```gitignore
.clasp.json
.env
node_modules/
```

---

## Future Improvements

Possible future enhancements for this project:

* validate and sanitize filenames more thoroughly
* check for duplicate filenames before copying
* use a specific sheet name instead of the active sheet
* move role filters and column indexes into a dedicated config object
* generate a processing summary or log report
* add notification support for completed runs

---

## Tech Stack

* Google Apps Script
* Google Sheets
* Google Drive services via Apps Script

---

## Author

Built for internal file handover and submission management automation in AIESEC in UPN Veteran Jakarta.
