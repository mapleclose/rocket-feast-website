---
description: Review a component or page for accessibility compliance
---

Perform an accessibility review following WCAG 2.1 AA standards:

1. Ask me which file(s) or component(s) to review

2. Check for the following accessibility requirements:

   **Keyboard Navigation:**
   - All interactive elements are keyboard accessible
   - Proper tab order
   - Focus indicators are visible
   - No keyboard traps

   **ARIA & Semantic HTML:**
   - Proper use of semantic HTML elements
   - ARIA labels where needed (not over-used)
   - Landmark regions properly defined
   - Form labels associated with inputs

   **Visual Accessibility:**
   - Color contrast meets 4.5:1 for text
   - Color is not the only means of conveying information
   - Text can be resized up to 200%
   - Focus indicators have sufficient contrast

   **Content:**
   - Images have meaningful alt text
   - Headings follow proper hierarchy (h1 → h2 → h3)
   - Links have descriptive text
   - Error messages are clear and helpful

   **React Aria Integration:**
   - Using React Aria components correctly
   - Proper use of useButton, useTextField, etc.
   - Focus management in modals/dialogs
   - Announcement of dynamic content

3. Provide a detailed report with:
   - Issues found (categorized by severity: critical, major, minor)
   - Specific code locations
   - Recommended fixes with code examples
   - Overall accessibility score

4. If no issues found, confirm compliance and suggest any enhancements

Remember: Accessibility is non-negotiable for this project. All components must be fully accessible.
