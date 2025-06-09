# Cursor Rules for React & Next.js Development

This document outlines the coding standards, best practices, and security guidelines for developing the ID Verification Agreement Portal using React and Next.js. All contributors must adhere to these rules to ensure code quality, maintainability, and security.

---

## 1. General Code Quality
- Use **TypeScript** for all components and files.
- Enforce **Prettier** and **ESLint** for code formatting and linting.
- Use meaningful, descriptive variable and function names.
- Keep functions and components small and focused (Single Responsibility Principle).
- Avoid code duplication; use reusable components and utility functions.
- Write clear, concise comments where necessary.
- Use consistent file and folder naming conventions (e.g., kebab-case for files, PascalCase for components).
- Remove unused code, variables, and imports.

## 2. React Best Practices
- Use **functional components** and React Hooks (avoid class components).
- Use **useState**, **useEffect**, and other hooks appropriately; avoid unnecessary re-renders.
- Use **Context API** or state management libraries (e.g., Redux, Zustand) for global state.
- Use **PropTypes** or TypeScript interfaces for component props.
- Avoid prop drilling; use context or composition where possible.
- Memoize expensive computations and components with `React.memo`, `useMemo`, and `useCallback`.
- Split large components into smaller, reusable ones.
- Use error boundaries for critical UI sections.

## 3. Next.js Best Practices
- Use **file-based routing** and keep routes organized.
- Use **getServerSideProps**, **getStaticProps**, and **getStaticPaths** appropriately for data fetching.
- Prefer **API routes** for backend logic and server-side operations.
- Use **dynamic imports** for code splitting and performance optimization.
- Optimize images with `next/image`.
- Use environment variables for configuration (never hardcode secrets).
- Keep sensitive logic on the server side (API routes or getServerSideProps).

## 4. Security Guidelines
- **Never expose secrets or API keys** in the frontend code or public repos.
- Sanitize all user inputs (e.g., brand name) to prevent XSS attacks.
- Validate and restrict file uploads (e.g., logo: type, size, content).
- Use HTTPS for all network requests.
- Implement CSRF protection for API routes if needed.
- Use secure HTTP headers (e.g., Content Security Policy, X-Frame-Options).
- Avoid using `dangerouslySetInnerHTML` unless absolutely necessary and always sanitize content.
- Keep all dependencies up to date and monitor for vulnerabilities.

## 5. Accessibility (a11y)
- Use semantic HTML elements (e.g., `<button>`, `<label>`, `<main>`).
- Ensure all interactive elements are keyboard accessible.
- Provide alt text for all images, especially uploaded logos.
- Use ARIA attributes where appropriate.
- Ensure sufficient color contrast for text and UI elements.
- Test with screen readers and keyboard navigation.

## 6. Performance
- Use **React.lazy** and **Suspense** for lazy loading components.
- Optimize images and assets (use `next/image`).
- Avoid unnecessary network requests and re-renders.
- Use pagination or virtualization for large lists.
- Minimize bundle size by importing only what is needed.

## 7. Testing
- Write unit tests for all components and utilities (Jest, React Testing Library).
- Write integration tests for critical flows (e.g., agreement generation, PDF preview).
- Ensure at least 80% code coverage.
- Use CI/CD to run tests on every pull request.

## 8. Documentation
- Document all components, hooks, and utilities (JSDoc or TypeScript doc comments).
- Maintain an up-to-date README with setup, usage, and deployment instructions.
- Document any architectural decisions or trade-offs.

## 9. Pull Request & Code Review
- All code must be peer-reviewed before merging.
- PRs should be small, focused, and well-described.
- Address all review comments before merging.
- Ensure all tests pass and linting checks are green.

---

**By following these rules, we ensure a robust, secure, and maintainable codebase for the ID Verification Agreement Portal.** 