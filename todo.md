# ID Verification Agreement Portal - Development TODO

This document tracks all tasks for building the ID Verification Agreement Portal based on the PRD. Tasks are organized by development phases and prioritized for efficient delivery.

---

## 🚀 Phase 1: Project Setup & Foundation
**Goal:** Set up development environment and project structure

### Development Environment
- [x] Initialize Next.js project with TypeScript
- [x] Set up ESLint and Prettier configuration
- [x] Configure Tailwind CSS for styling
- [x] Set up folder structure (`components/`, `utils/`, `types/`, `pages/`, `public/`)
- [x] Create `.env` files for environment variables
- [x] Set up Git repository and initial commit
- [x] Configure package.json with required dependencies

### Dependencies Installation
- [x] Install React and Next.js dependencies
- [x] Install PDF generation library (pdf-lib or react-pdf)
- [x] Install CSV parsing library (papaparse)
- [x] Install file upload handler (react-dropzone)
- [x] Install UI components library (shadcn/ui)
- [x] Install testing libraries (Jest, React Testing Library)
- [x] Install TypeScript types for all dependencies

---

## 🎨 Phase 2: UI/UX Design & Layout
**Goal:** Create the basic layout and design system

### Design System
- [x] Define color palette and typography
- [x] Create reusable UI components (Button, Input, Checkbox, etc.)
- [x] Integrate shadcn/ui design system
- [x] Refine header layout and container width for large screens (1440p+)
- [x] Design loading states and error handling UI
- [x] Create responsive layout for desktop and tablet
- [x] Implement dark/light mode (shadcn built-in support)

### Main Layout
- [x] Create main page layout with left/right split
- [x] Implement responsive grid system
- [x] Add header with branding
- [x] Create control panel container (left side)
- [x] Create PDF preview container (right side)
- [x] Add mobile-friendly responsive breakpoints
- [x] Add dotted grid background for visual appeal

---

## 📊 Phase 3: Data Management & CSV Processing
**Goal:** Process and structure the ID verification data

### CSV Data Processing
- [x] Create hardcoded data structure (replaced CSV processing)
- [x] Define TypeScript interfaces for check data
- [x] Parse and categorize all ID verification checks
- [x] Map data columns to UI-friendly format
- [x] Create data validation functions
- [x] Handle data structure gracefully
- [x] Create comprehensive check data from original CSV

### Data Structure
- [x] Define Check interface (name, price, category, TAT, etc.)
- [x] Create CheckCategory grouping structure
- [x] Implement total price calculation logic
- [x] Create data filtering and search utilities
- [x] Add data transformation utilities
- [x] Centralize data in `src/lib/id-checks.ts`

---

## 🎛️ Phase 4: Control Panel Implementation
**Goal:** Build the left-side control panel with all user inputs

### Brand Section
- [x] Create logo upload component with drag-and-drop
- [x] Implement file validation (type, size, format)
- [x] Add logo preview functionality
- [x] Create brand name input field with validation
- [x] Add error handling for invalid uploads
- [x] Fix logo replacement functionality (react-dropzone bug)
- [x] Implement logo compression/resizing
- [x] Store uploaded logo in state/session
- [x] Add "Replace" and "Delete" buttons with proper event handling

### ID Verification Checks
- [x] Create check list component with categories
- [x] Implement checkbox selection for each check
- [x] Add check descriptions and detailed information
- [x] Display price, TAT, method, and partner network for each check
- [x] Create category grouping with badges
- [x] Add search/filter functionality for checks
- [x] Implement "Select All" for categories
- [x] Add "Clear All" functionality for all selections
- [x] Create clean IDCard component layout
- [x] Implement scrollable verification section with sticky header
- [x] Add selected verifications preview with badges
- [x] Add category filter dropdown to search bar

### Price Calculation
- [x] Create real-time total price calculation
- [x] Display running total prominently
- [x] Add price breakdown by category
- [x] Format currency display (INR formatting)
- [x] Handle edge cases (no selections, etc.)
- [x] Show selected checks in dedicated preview area

### Download Button
- [x] Create download button component
- [x] Implement validation before download
- [x] Add deferred preview functionality with dedicated button
- [x] Add loading state during PDF generation
- [ ] Handle download errors gracefully
- [ ] Add success feedback after download

### Layout & UX Improvements
- [x] Implement flexible height layout (viewport responsive)
- [x] Fixed height for branding and total price sections
- [x] Scrollable verification section
- [x] Sticky header with search and clear all functionality
- [x] Consistent button styling and behavior
- [x] Prevent layout shift with conditional elements
- [x] Add glassmorphism styling to control panel

### Control Panel UI Refactor
- [x] Move existing verification checks UI into a new `JourneyBuilderModal` component.
- [x] Replace the current verification section in `ControlPanel.tsx` with a container that fills available space.
- [x] Inside the container, add a large, dashed-border button with a '+' icon and 'Create New Journey' text.

### Journey Builder Modal
- [x] Create a reusable `Modal` or `Dialog` component in `src/components/ui` if one doesn't exist.
- [x] Create the `JourneyBuilderModal` component.
- [x] It should contain the original verification checks UI (search, filters, categories, check cards).
- [x] Add an `Input` field at the top of the modal for the 'Journey Name'.
- [x] Add 'Save' and 'Discard' buttons to the modal footer.

### State Management for Journeys
- [x] Refactor application state in `page.tsx` to manage an array of journey objects.
- [x] Define the `Journey` type: `{ id: string; name: string; selectedChecks: { [key: string]: boolean }; totalPrice: number; }`.
- [x] Implement logic to add a new journey to the state upon saving from the modal.
- [x] The `onSave` handler should capture the journey name and selected checks.
- [x] Create derived state that flattens all checks and calculates a grand total price from all journeys to pass to the PDF components, ensuring existing PDF logic remains untouched.

### Displaying Journeys
- [x] Create a `JourneyCard` component to display a saved journey's details in the control panel.
- [x] The card should show the journey name and a list/summary of its selected checks.
- [x] Add 'Edit' and 'Delete' functionality to each `JourneyCard`.
- [x] Render the list of `JourneyCard` components in the control panel, above the 'Create New Journey' button.

### Total Price Section Refactor
- [x] Update the total price calculation logic to sum prices across all journeys for the *Control Panel*.
- [x] Redesign the total price section in `ControlPanel.tsx`.
- [x] Display a cost breakdown for each individual journey (e.g., "Journey 1: ₹500").
- [x] Display the final, cumulative total price for all journeys.

### 🎛️ Phase 4.6: Dynamic Price Editing
**Goal:** Allow users to edit the price of individual checks.

### UI Components for Price Editing
- [x] Create `EditPriceModal.tsx` component.
- [x] Modal: Add title "Edit Price for <CheckName>".
- [x] Modal: Add linked inputs for "Discount Percentage" and final "Price".
- [x] Modal: Display the new price and include "Save" & "Discard" buttons.
- [x] Update `IDCard.tsx` to show an "Edit" button on hover over the price.
- [x] Connect "Edit" button in `IDCard.tsx` to open the `EditPriceModal`.

### State Management for Price Overrides
- [ ] Create new state in `page.tsx` to store price overrides (e.g., `{ [checkName: string]: number }`).
- [ ] Implement a handler function in `page.tsx` to update the price for a specific check.

### Integration & Calculation Refactor
- [x] Pass price override state and handler down to `IDCard` through the component tree.
- [x] Refactor all price calculation logic (in journeys and grand total) to use the overridden price if it exists.

### 🎛️ Phase 4.7: Per-Check Multiplier for Special Checks
**Goal:** Allow users to specify how many educations or employments to verify, and update pricing accordingly.

- [ ] Add multiplier state to `page.tsx` (e.g., `{ [checkName: string]: number }`).
- [x] Create `MultiplierInputModal` component for user input.
- [ ] In `JourneyBuilderModal`, trigger modal when special checks are selected.
- [ ] Update price calculation logic to use multiplier (base price × multiplier).
- [ ] Ensure multiplier is reset on deselect.
- [ ] Pass multiplier state through to all relevant components and PDF.

---

## 📄 Phase 5: PDF Generation & Preview
**Goal:** Create real-time PDF preview and generation
**Note on Journeys:** PDF preview and creation logic are **out of scope** for the Journey Builder feature and will remain untouched. The PDF components will receive a flattened list of all selected checks and a single total price from all journeys combined. The concept of "journeys" will not be reflected in the PDF output, preserving the existing "SELECTED VERIFICATION SERVICES" table structure and insight inclusion logic.

### PDF Template Design
- [x] Design PDF layout matching sample agreement
- [x] Create header section with dual logos and brand name
- [x] Design table layout for selected checks
- [x] Add footer with total price and legal text
- [x] Implement professional styling and formatting
- [x] Ensure PDF is print-friendly
- [x] Add placeholder for client logo

### Real-time Preview
- [x] Create PDF preview component
- [x] Implement real-time rendering on input changes
- [x] Handle client-side rendering with dynamic import
- [x] Add loading states for preview updates
- [x] Fix Content Security Policy (CSP) issues
- [x] Make preview responsive with correct A4 aspect ratio
- [x] Handle preview scaling issues across different screen sizes

### PDF Generation
- [x] Implement PDF generation function (via preview)
- [x] Add logo embedding in PDF (both client and Equal logos)
- [x] Format check table with proper styling
- [x] Calculate and display total price
- [ ] Add date and legal text
- [ ] Optimize PDF file size
- [x] Test PDF compatibility across devices

---

## 🔧 Phase 6: Integration & State Management
**Goal:** Connect all components and manage application state

### State Management
- [ ] Set up React Context for global state
- [ ] Create reducers for complex state updates
- [ ] Implement state persistence (session storage)
- [ ] Add state validation and error handling
- [x] Create custom hooks for state management (via state lifting)
- [ ] Implement undo/redo functionality (optional)

### Component Integration
- [ ] Connect control panel to PDF preview
- [x] Implement real-time updates between components
- [x] Add event handling for user interactions
- [x] Create data flow between all components
- [x] Test component communication
- [x] Implement deferred state updates for performance
- [ ] Optimize re-rendering performance

### State Management Review
- [x] Create `AgreementContext.tsx` with a reducer and provider.
- [x] Wrap `RootLayout` with `AgreementProvider`.
- [x] Review state management in `src/app/page.tsx`.

### Component Refactoring
- [x] **Refactor `AgreementTemplate.tsx`**
  - [x] Create `src/components/pdf` directory for PDF components.
  - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
  - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
  - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
  - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
  - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
  - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
  - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.

### Styling Improvements
- [ ] **Review `globals.css` and `tailwind.config.ts` for efficiency.

### Type Safety
- [ ] **Enhance TypeScript usage in `src/types` and across the application.

---

## 🔒 Phase 7: Security & Validation
**Goal:** Implement security measures and input validation

### Input Validation
- [ ] Validate brand name input (XSS prevention)
- [ ] Implement file upload security checks
- [ ] Add MIME type validation for logos
- [ ] Sanitize all user inputs
- [ ] Add rate limiting for file uploads
- [ ] Implement CSRF protection

### Security Headers
- [x] Configure Content Security Policy
- [x] Add secure HTTP headers in Next.js config
- [ ] Implement file upload restrictions
- [ ] Add error logging for security events
- [ ] Test for common vulnerabilities

---

## ♿ Phase 8: Accessibility & Performance
**Goal:** Ensure accessibility and optimize performance

### Accessibility
- [ ] Add proper ARIA labels and roles
- [ ] Implement keyboard navigation
- [ ] Add alt text for all images
- [ ] Test with screen readers
- [ ] Ensure color contrast compliance
- [ ] Add focus indicators
- [ ] Test keyboard-only navigation

### Performance Optimization
- [ ] Implement lazy loading for components
- [ ] Optimize image loading and compression
- [ ] Add loading states and skeletons
- [ ] Minimize bundle size
- [ ] Implement caching strategies
- [ ] Add performance monitoring
- [ ] Test on various devices and connections

---

## 🧪 Phase 9: Testing
**Goal:** Comprehensive testing of all functionality

### Unit Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

## 📋 Notes & Decisions
- **Data Strategy:** Using hardcoded TypeScript data structure instead of CSV uploads for reliability and performance
- **UI Library:** Successfully integrated shadcn/ui for consistent design system
- **Layout:** Implemented flexible viewport-responsive layout with sticky headers
- **State Management:** Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature. Deferred state updates are now in place.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

---

**Last Updated:** December 2024
**Next Review:** After finalizing PDF download.

### Optimization Plan

**Phase 1: Codebase Analysis & Low-Hanging Fruit**

- [x] **Project Overview:** Examine the project structure, dependencies in `package.json`, and Next.js configuration (`next.config.js`).
- [x] **Component Analysis:** Review components in `src/components` for optimization opportunities (e.g., memoization, splitting large components).
- [x] **Static Asset Optimization:** Check static assets in `public` for web optimization.
- [x] **Code & Dependency Cleanup:** Find and remove unused files, dependencies, or code.

**Phase 2: Performance Enhancements**

- [x] **Bundle Size Analysis:** Use `@next/bundle-analyzer` to inspect the JavaScript bundle.
  - [x] Install and configure `@next/bundle-analyzer`.
  - [x] Run `npm run analyze` and analyze the output.
- [x] **Code Splitting & Lazy Loading:** Identify components/pages for dynamic import with `next/dynamic`.
- [x] **State Management Review:** Optimize application state management to reduce re-renders.
  - [x] Create `AgreementContext.tsx` with a reducer and provider.
  - [x] Wrap `RootLayout` with `AgreementProvider`.
  - [x] Refactor `page.tsx` and all child components to use the context.

**Phase 3: Refactoring & Best Practices**

- [x] **Component Refactoring:** Refactor key components for readability, maintainability, and best practices.
  - [x] **Refactor `AgreementTemplate.tsx`**
    - [x] Create `src/components/pdf` directory for PDF components.
    - [x] Move `PdfHeader` logic to `src/components/pdf/PdfHeader.tsx`.
    - [x] Move `ServicesTable` logic to `src/components/pdf/ServicesTable.tsx`.
    - [x] Move `InsightsTable` logic to `src/components/pdf/InsightsTable.tsx`.
    - [x] Move `GenericTable` logic to `src/components/pdf/GenericTable.tsx`.
    - [x] Move `PricingSummary` logic to `src/components/pdf/PricingSummary.tsx`.
    - [x] Move `TermsAndConditions` logic to `src/components/pdf/TermsAndConditions.tsx`.
    - [x] Move `PdfFooter` logic to `src/components/pdf/PdfFooter.tsx`.
    - [x] Refactor `AgreementTemplate.tsx` to assemble the new, smaller components.
- [ ] **Styling Improvements:** Review `globals.css` and `tailwind.config.ts` for efficiency.
- [ ] **Type Safety:** Enhance TypeScript usage in `src/types` and across the application.

---

## 🎛️ Phase 7: Content Editing & Customization
**Goal:** Allow users to edit all text and tables in the agreement.

### State Management for Editable Content
- [ ] **Extend `AgreementContext`**:
    - [ ] Move `valueAddedServices`, `aggregatorServices`, and `pricingNotes` from `lib/agreement-data.ts` to `AgreementContext.tsx` to serve as the initial, editable state.
    - [ ] Add new fields to the context state for all editable content:
        - `agreementTitle: string` (for the main header).
        - `agreementIntroText: string` (for the introductory paragraph).
        - `valueAddedServices: { name: string; description: string }[]`.
        - `aggregatorServices: { name: string; description: string }[]`.
        - `pricingNotes: string[]`.
        - `termsAndConditionsText: string`.
    - [ ] Create a new reducer action, like `UPDATE_AGREEMENT_CONTENT`, to handle saving all changes from the modal at once.

### Refactor PDF Components for Dynamic Content
- [ ] **`PdfHeader.tsx`**: Modify to accept and render an `agreementTitle` prop.
- [ ] **`AgreementTemplate.tsx`**:
    - [ ] Update to pull all editable content (title, intro text, tables, notes, T&Cs) from `AgreementContext`.
    - [ ] Pass the dynamic content down as props to the relevant child PDF components.
    - [ ] Update the introductory text section to use `agreementIntroText` from the context.
- [ ] **`GenericTable.tsx`**: This component is already data-driven, so it will just need to receive the editable `valueAddedServices` and `aggregatorServices` data from context via `AgreementTemplate`.
- [ ] **`PricingSummary.tsx`**: Refactor to dynamically render editable `pricingNotes`.
- [ ] **`TermsAndConditions.tsx`**: Modify to accept and render a `termsAndConditionsText` prop.

### Enhance `AdditionalCostsModal.tsx` for Content Editing
- [ ] **UI Overhaul with Tabs**:
    - [ ] Reorganize the modal using a `Tabs` component (`components/ui/tabs`) to manage different editable sections without cluttering the UI. Create tabs like: "Fees & Notes", "Service Tables", and "Text Content".
- [ ] **"Text Content" Tab**:
    - [ ] Add an `Input` control for the `agreementTitle` ("ID Verification Agreement").
    - [ ] Add a `Textarea` for the `agreementIntroText`.
    - [ ] Add a `Textarea` for the `termsAndConditionsText`.
- [ ] **"Fees & Notes" Tab**:
    - [ ] Keep the existing inputs for "Set-up Fee" and "Annual Fee".
    - [ ] Add a UI to manage the `pricingNotes`. This could be a `Textarea` (one note per line) or a dynamic list of `Input` fields with "Add" and "Remove" buttons.
- [ ] **"Service Tables" Tab**:
    - [ ] Create an editable grid/form for "Value-added Services". It should allow users to edit the name and description of each service and to add or remove rows.
    - [ ] Do the same for "Aggregator Services".
- [ ] **Update Save Logic**:
    - [ ] On opening the modal, populate its local state with the current values from `AgreementContext`.
    - [ ] Modify the `handleSave` function to dispatch the `UPDATE_AGREEMENT_CONTENT` action, sending all the updated fields back to the global state.

---

## 🐞 Phase 8: Testing & Bug Fixes
**Goal:** Ensure the application is stable and bug-free

### Testing
- [ ] Write tests for utility functions
- [ ] Test individual components
- [ ] Test state management logic
- [ ] Test PDF generation functions
- [ ] Test data structure and filtering
- [ ] Achieve 80%+ code coverage

### Integration Testing
- [ ] Test complete user flows
- [ ] Test PDF generation end-to-end
- [ ] Test file upload functionality
- [ ] Test error handling scenarios
- [ ] Test responsive design
- [ ] Test accessibility features

### Manual Testing
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test with various file types and sizes
- [ ] Test edge cases and error scenarios
- [ ] User acceptance testing (UAT)
- [ ] Performance testing under load

---

## 🚢 Phase 10: Deployment & Documentation
**Goal:** Deploy application and create documentation

### Deployment Preparation
- [ ] Configure production environment variables
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (optional)

### Documentation
- [ ] Update README with setup instructions
- [ ] Document API endpoints (if any)
- [ ] Create user guide/manual
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Add changelog and versioning

### Launch Preparation
- [ ] Final testing in production environment
- [ ] Performance monitoring setup
- [ ] Backup and recovery procedures
- [ ] User training materials
- [ ] Support documentation
- [ ] Go-live checklist

---

## 📈 Phase 11: Post-Launch & Enhancements
**Goal:** Monitor, maintain, and enhance the application

### Monitoring & Maintenance
- [ ] Set up uptime monitoring
- [ ] Monitor user feedback and usage analytics
- [ ] Regular security updates
- [ ] Performance optimization based on usage
- [ ] Bug fixes and improvements
- [ ] Regular backups

### Future Enhancements
- [ ] User authentication system
- [ ] Admin panel for managing checks/pricing
- [ ] Multi-language support
- [ ] E-signature integration
- [ ] API for programmatic access
- [ ] Advanced reporting features

---

## 📊 Progress Tracking

**Overall Progress:** 80% (Core functionality complete)

### Phase Completion Status:
- [x] Phase 1: Project Setup & Foundation (14/14) ✅
- [x] Phase 2: UI/UX Design & Layout (12/12) ✅
- [x] Phase 3: Data Management & Processing (12/12) ✅
- [x] Phase 4: Control Panel Implementation (26/28) ✅
- [x] Phase 4.5: Journey Builder Refactor (14/14) ✅
- [x] Phase 4.6: Dynamic Price Editing (10/10) ✅
- [x] Phase 4.7: Per-Check Multiplier for Special Checks (1/6)
- [x] Phase 5: PDF Generation & Preview (16/17) ✅
- [x] Phase 6: Integration & State Management (7/11)
- [ ] Phase 7: Security & Validation (2/10)
- [ ] Phase 8: Accessibility & Performance (0/13)
- [ ] Phase 9: Testing (0/15)
- [ ] Phase 10: Deployment & Documentation (0/12)
- [ ] Phase 11: Post-Launch & Enhancements (0/12)

### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.
- ✅ Implemented deferred preview updates for better performance.
- ✅ Added a loading spinner for PDF generation.

### State Management:
- ✅ Lifted state from `ControlPanel` to `Home` page, effectively creating a custom hook pattern for this feature.
- ✅ Implemented deferred state updates to separate live data from preview data.
- **Next Phase:** Finalize PDF download and then move to comprehensive testing.

### PDF Preview & Generation (Phase 5):
- ✅ Implemented live PDF preview with `@react-pdf/renderer`.
- ✅ Fixed Content Security Policy (CSP) to allow WASM and blob rendering.
- ✅ Corrected logo rendering by converting blobs to data URLs.
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel and preview.

### Download Button:
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Layout & UX Improvements:
- ✅ Added glassmorphism styling to control panel

---

## 🎯 Current Sprint Focus
**Sprint Goal:** Implement the Journey Builder feature.
**Priority Tasks:**
1. Refactor `ControlPanel.tsx` to include the 'Create New Journey' button.
2. Create the `JourneyBuilderModal` with the verification checks UI.
3. Update state management to handle an array of journeys.
4. Implement the journey display and the new total price breakdown in the Control Panel.
5. Pass a flattened list of all checks and a grand total price to the PDF components, ensuring the PDF output does not change.

---

## 📋 Recent Accomplishments
### Control Panel Enhancements:
- ✅ Fixed logo upload "Replace" button functionality
- ✅ Simplified IDCard component structure
- ✅ Added responsive height layout (viewport-based)
- ✅ Implemented "Clear All" functionality with consistent styling
- ✅ Added selected verifications preview with badges
- ✅ Enhanced layout with fixed/flexible sections
- ✅ Added glassmorphism styling to control panel
- ✅ Prevented layout shifts with invisible elements
- ✅ Added category filter dropdown to search bar

### Data Management:
- ✅ Created comprehensive hardcoded data structure
- ✅ Replaced CSV processing with reliable TypeScript data
- ✅ Added detailed check information (TAT, method, partner network)
- ✅ Implemented efficient filtering and search capabilities
- ✅ Implemented responsive A4 aspect ratio for the preview.
- ✅ Designed a professional PDF header with dual logos and centered brand name.
- ✅ Lifted state to enable seamless data flow between control panel