# Manual Testing Checklist for Task 3

This checklist verifies that the GUI framework and application structure have been implemented correctly.

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

## Notes
- Actual calculation logic (performing arithmetic) is out of scope for Task 3
- Input validation and error dialogs are deferred to Task 4
- Author information dialog is deferred to Task 4
- This checklist focuses on GUI infrastructure and event handling
