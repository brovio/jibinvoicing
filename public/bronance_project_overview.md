# Bronance

## Overview

Bronance is a modern, React-based timesheet and invoice management application designed for internal use at Brovio. It streamlines timesheet tracking, client management, and invoice generation by integrating data from various sources, such as:

- ZIP files containing CSV reports from Jibble.
- Brovio’s client information in CSV format.
- Company details for Brovio Ireland and Brovio Australia.

### Envisioned Invoice Creation Workflow

**Step 1: Import Timesheets**
- Upload ZIP files and extract the relevant CSV containing tracked time entries.

**Step 2: Import Clients**
- Load Brovio’s client data in CSV or JSON format.

**Option 1: Manual Invoice Creation**
- Filter timesheet entries by client or project.
- Select relevant entries and create an invoice.
- Choose the client from the "Brovio Clients" database.
- Assign the invoice to Brovio Ireland or Brovio Australia.
- Preview, edit, delete, or approve the invoice.
- Export invoices as multi-page A4 PDFs.
- Track invoices with statuses like "to send," "sent," or "paid."

**Option 2: Automatic Invoice Creation**
- Map timesheet projects to Brovio clients and assign Brovio entities (Ireland or Australia).
- Automatically generate invoices after uploading new Jibble ZIP files.
- Review and manage invoices via the "Invoices" page.

---

## Rules and Explanations

### ZIP File Processing
- Only the CSV file starting with "Tracked Time Raw Time Entries" will be processed.

### CSV Column Mapping
| CSV Column Name   | Description                              | Renamed To        |
|-------------------|------------------------------------------|-------------------|
| Date              | Date of the time entry                  | Date              |
| Full Name         | Staff member's name                     | Staff Member      |
| EntryType         | Status of entry (e.g., in, out)         | EntryType         |
| Time              | Time the entry was recorded             | Time              |
| Duration          | Task duration (e.g., 2h 30m)            | Duration          |
| Break             | Type of break taken                     | Break             |
| Break Type        | Paid or unpaid break                    | Break Type        |
| Project           | Project name (fallback for Client)      | Project           |
| Activity          | Specific task activity                  | Project           |
| Client            | Client name                             | Client            |
| Notes             | Task details                            | Tasks             |

### CSV Processing Rules
1. Merge task notes from "out" or "StartBreak" entries into the previous corresponding "in" entries.
2. Exclude timesheet entries where Duration = 0 (except for "StartBreak").
3. Convert Duration to a numeric value (e.g., "2h 28m" → 2.466667).
4. Use the "Client" column as the primary source. If blank, fallback to "Project." If both are blank, use the placeholder "ask-[Staff Member]."
5. Rename columns as specified in the mapping table.
6. Retain only rows with valid entries for timesheets or breaks.

---

## Web App Layout

### General Layout
1. **Header**: Thin header (~35px) with "Bronance" on the left and three icons on the right for:
   - Create New Invoice
   - Settings (modal)
   - Theme Selection
2. **Navigation Tabs**: Pages for Timesheets, Clients, Invoices, and Staff Info.

### Page Descriptions

#### Timesheets Page
- Upload ZIP files to extract and add CSV data.
- Search and filter by client or project.
- Toggle between "In" and "Start Break" views.
- Display columns for Date, Client, Project, Tasks, and Time.
- Sort columns and view entry details.
- Paginate entries (default 25 per page) with adjustable limits and navigation.
- Select entries for batch operations.

#### Clients Page
- Import/export client data as CSV/JSON.
- Add and edit client entries.
- Display clients in list, detail, or card views.

#### Invoice Preview
- Preview invoices with tasks, hours, rates, and totals.
- Add manual entries for items like hosting or SEO.
- Save as draft or export as PDF.

#### Invoice Management
- Filter invoices by client, project, or time period.
- View a sortable list of invoices with pagination.

#### Staff Info
- View individual staff contributions and performance insights.
- Include AI-powered analytics for underperformance detection.

---

## Glossary

- **Client**: The business entity receiving invoices.
- **Project**: The work being tracked in timesheets.
- **Tasks**: Specific activities or deliverables.
- **Staff Member**: The individual whose work is tracked.

---

## Future Enhancements

1. **UI/UX Improvements**:
   - Simplify navigation and improve accessibility.
   - Add customization options for themes and layouts.

2. **Automation**:
   - Streamline invoice creation workflows.
   - Integrate machine learning for task prediction.

3. **Integrations**:
   - Expand compatibility with external tools like QuickBooks and Xero.
