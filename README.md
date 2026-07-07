# RSVP File Automation

## Overview

This project was built to automate a handover task for AIESEC in UPN Veteran Jakarta.

The initial use case was collecting photos submitted through Google Forms. Since uploaded files often had different and inconsistent filenames, organizing them manually took a lot of time. Each file had to be downloaded, renamed based on the submitter’s name, and placed into the correct Google Drive folder for handover.

To simplify that process, I created this Google Apps Script automation to read submission data from Google Sheets, retrieve the submitted Google Drive files, rename them using each person’s name, and copy them into a designated folder automatically.

## Features

- Reads submission data from Google Sheets
- Filters entries based on selected roles
- Skips entries containing the `Newies` role
- Extracts file links from Google Drive URLs
- Copies submitted files into a target Google Drive folder
- Renames files using each submitter’s name
- Preserves the original file extension

## Use Cases

This script is useful for administrative workflows such as:

- collecting RSVP-related documents or photos
- organizing submissions from Google Forms / Google Sheets
- renaming uploaded files automatically based on participant names
- preparing structured handover files for internal team transitions
- managing member documents based on role-based filtering

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
