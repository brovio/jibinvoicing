# Project Overview

## Current Status

### Completed Features
- Full client management functionality
  - Import clients from CSV/JSON files
  - Export clients to CSV/JSON formats
  - View/edit/delete client information
  - Interactive table with clickable rows
  - Bulk selection capabilities
  - Search and filter functionality
- Basic routing structure
- Dark theme implementation
- Responsive layout design
- UI components using shadcn/ui

### Known Issues
- Timesheet CSV parsing functionality
  - Issues with parsing ZIP files containing CSV timesheets
  - Challenges with field mapping and data validation
  - Need to revisit the implementation approach

## Project Structure
```
src/
├── components/
│   ├── Clients/
│   │   ├── ClientModal.tsx
│   │   ├── ClientsHeader.tsx
│   │   ├── ClientsRow.tsx
│   │   ├── ClientsTable.tsx
│   │   ├── FormFields/
│   │   │   ├── BasicInfoFields.tsx
│   │   │   ├── BillingFields.tsx
│   │   │   └── ContactFields.tsx
│   │   └── hooks/
│   │       ├── useClientFilters.ts
│   │       └── useClientSelection.ts
│   ├── Timesheet/
│   │   ├── TimesheetHeader.tsx
│   │   ├── TimesheetRow.tsx
│   │   └── TimesheetTable.tsx
│   ├── ui/
│   │   └── [shadcn components]
│   ├── ExportButton.tsx
│   ├── FileUpload.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── Navigation.tsx
├── pages/
│   ├── Clients.tsx
│   ├── InvoiceTemplates.tsx
│   ├── Landing.tsx
│   └── Timesheets.tsx
├── utils/
│   ├── importUtils.ts
│   ├── timesheetParser.ts
│   └── toastUtils.ts
└── App.tsx
```

## Tasks to Complete

### High Priority
1. Timesheet Management
   - Implement robust CSV parsing from ZIP files
   - Create timesheet entry viewer/editor
   - Add timesheet export functionality
   - Implement timesheet filtering and search
   - Add bulk operations for timesheets

2. Invoice Templates
   - Complete invoice template preview functionality
   - Add template customization options
   - Implement template export system
   - Create template sharing mechanism

### Future Enhancements
1. Client Management
   - Add client categorization
   - Implement client activity history
   - Add client-specific invoice templates
   - Create client reporting features

2. Dashboard
   - Add quick actions for common tasks
   - Implement activity feed
   - Create summary statistics
   - Add data visualization components

3. General Improvements
   - Add comprehensive error handling
   - Implement data backup system
   - Add user preferences
   - Create user documentation

## Technical Debt & Improvements
1. Code Organization
   - Consider splitting large components (e.g., ClientsHeader.tsx)
   - Implement proper TypeScript interfaces for all components
   - Add proper JSDoc documentation

2. Testing
   - Add unit tests for utility functions
   - Implement integration tests for main features
   - Add end-to-end testing

3. Performance
   - Implement proper data pagination
   - Add data caching strategies
   - Optimize bundle size

## Development Guidelines
1. Design System
   - All external elements use 10px border radius
   - White elements on blue backgrounds use 1px #3f37c9 border
   - Follow Timesheets page as primary reference for styling

2. Code Style
   - Use TypeScript for all new components
   - Follow existing component structure
   - Implement proper error handling
   - Use shadcn/ui components where possible