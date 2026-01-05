// Library exports for integration tests and potential library usage
// This allows integration tests to access the calculator modules

// Module declarations - these are the actual module definitions
pub mod number;
pub mod calculator;

// Note: The app module is not exported as it's only used by the binary
// and contains GUI-specific code that shouldn't be part of the library API
