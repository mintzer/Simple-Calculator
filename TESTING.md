# Manual Testing Checklist

This checklist verifies that the calculator application has been implemented correctly.

## Window Creation
- [ ] Window opens when application starts
- [ ] Window title displays "My First Python Calculator"
- [ ] Window size is 380x300 pixels
- [ ] Window is non-resizable (attempting to resize has no effect)
- [ ] Window can be closed properly without crashes

## Widget Visibility and Positioning
- [ ] Title label "Python Calculator" is visible at top (green, underlined, ~10% from top)
- [ ] First input field is visible and centered (~30% from top)
- [ ] Second input field is visible and centered (~40% from top)
- [ ] Operation label area is visible (~50% from top) - initially empty or reserved space
- [ ] Result label is visible (~60% from top) - initially shows "0"
- [ ] Four operation buttons (+, -, *, /) are visible in a row (~70% from top)
- [ ] Operation buttons are positioned at relative x positions (10%, 30%, 50%, 70%)
- [ ] Author button is visible at bottom center (~95% from top)

## Input Field Functionality
- [ ] First input field accepts keyboard text input
- [ ] Second input field accepts keyboard text input
- [ ] Input fields show placeholder hints when empty
- [ ] Text cursor appears when fields are clicked

## Button Functionality
- [ ] Plus (+) button is clickable
- [ ] Minus (-) button is clickable
- [ ] Multiply (*) button is clickable
- [ ] Divide (/) button is clickable
- [ ] Author button is clickable
- [ ] Clicking buttons does not crash the application

## Operation Button Behavior (Task 3 Scope)
- [ ] Clicking + button updates operation label to "Summation" with red text on light blue background
- [ ] Clicking - button updates operation label to "Subtraction" with green text on beige background
- [ ] Clicking * button updates operation label to "Multiplication" with blue text on olive background
- [ ] Clicking / button updates operation label to "Division" with yellow text on sage green background
- [ ] Result shows "0" after clicking any operation button

## Author Button Behavior (Task 3 Scope)
- [ ] Clicking Author button triggers placeholder behavior (console output or state change)
- [ ] Application does not crash when Author button is clicked
- [ ] Note: Full author dialog implementation is deferred to Task 4

## Application Stability
- [ ] Application starts without errors
- [ ] Application runs without crashes during normal interaction
- [ ] Application closes cleanly without hanging
- [ ] No panics or error messages appear in console during testing

## Task 4: Calculation and Integration Tests

### Valid Input Tests
- [ ] Enter "5" and "3", click +, verify "Summation" label and result "8"
- [ ] Enter "10" and "4", click -, verify "Subtraction" label and result "6"
- [ ] Enter "3" and "5", click *, verify "Multiplication" label and result "15"
- [ ] Enter "12" and "3", click /, verify "Division" label and result "4"

### Decimal Number Tests
- [ ] Enter "5.5" and "2.5", click +, verify result "8"
- [ ] Enter "7.5" and "2.5", click /, verify result "3"
- [ ] Enter ".123" and "0.456", click +, verify result works
- [ ] Enter "-.123" and "+.456", click +, verify signed decimals work

### Integer Display Tests
- [ ] Result "8" displays without decimal point (not "8.0")
- [ ] Result "3" displays without decimal point
- [ ] Result "3.5" displays with decimal point

### Invalid Input Tests
- [ ] Enter "abc" and "5", click +, verify error dialog appears with message:
  "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
- [ ] Enter "5" and "", click +, verify error dialog appears
- [ ] Enter "12.34.56" and "5", click +, verify error dialog appears
- [ ] After error dialog, application continues to function normally

### Division by Zero Tests
- [ ] Enter "10" and "0", click /, verify error dialog with division by zero message
- [ ] After division by zero error, application continues to function

### Author Dialog Tests
- [ ] Click Author button, verify info dialog appears with:
  "Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh"
- [ ] After closing dialog, application continues to function

### Color Scheme Verification
- [ ] Addition: Red text on light blue background (#9ed8ee)
- [ ] Subtraction: Green text on beige background (#ece7e2)
- [ ] Multiplication: Blue text on olive background (#cacba9)
- [ ] Division: Yellow text on sage green background (#8dad96)

### Edge Cases
- [ ] Very large numbers (e.g., "999999" + "999999")
- [ ] Very small decimals (e.g., "0.00001" * "0.00001")
- [ ] Negative results (e.g., "5" - "10" = "-5")
- [ ] Mixed integer and decimal operations (e.g., "5" * "2.5" = "12.5")

## Automated Tests

Run automated tests with:
```bash
cargo test
```

Expected: 13 tests passing, covering:
- Number validation (integers, decimals, signed numbers)
- Number parsing and formatting
- All four arithmetic operations
- Division by zero error handling
- Edge cases

## Notes
- All tasks (1-4) are now complete
- The calculator is fully functional with complete error handling
- This checklist covers both GUI infrastructure and calculation logic
