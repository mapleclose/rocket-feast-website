---
description: Create a new custom component using Untitled UI patterns
---

Create a new custom component for the Rocket Feast website:

1. Ask me for:
   - Component name
   - Component purpose/description
   - Where it should be located (base/application/marketing/shared-assets)

2. Before creating, check if similar functionality exists in `src/components/`

3. Create the component following these guidelines:
   - Use TypeScript with proper interface definitions
   - Export interface for props
   - Add JSDoc comments for documentation
   - Use existing Untitled UI components as building blocks
   - Apply Tailwind CSS for styling
   - Follow React Aria patterns for accessibility
   - Include proper keyboard navigation
   - Support dark/light mode via theme variables
   - Make it responsive by default

4. Component structure:
   ```typescript
   // Component interface
   export interface ComponentNameProps {
     // Props with JSDoc comments
   }

   // Component implementation
   export function ComponentName({ props }: ComponentNameProps) {
     // Implementation
   }
   ```

5. After creation, show me:
   - Where the file was created
   - Example usage code
   - Any additional setup needed

Ensure the component follows the brand guidelines and design system defined in `.claude/brand-guidelines.md`.
