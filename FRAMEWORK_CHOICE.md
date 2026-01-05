# GUI Framework Selection: egui

## Evaluation Summary

As specified in the task requirements, both iced and egui were evaluated for this calculator migration.

## Framework Options Considered

### iced (Recommended by task spec)
- **Pros**: Declarative architecture, Elm-inspired, modern patterns
- **Cons**: More complex setup, larger dependency tree, requires more boilerplate
- **Compatibility**: Had issues with Rust 1.75.0 and edition2024 dependencies

### egui (Selected)
- **Pros**: Immediate-mode GUI, simpler API, better compatibility with older Rust versions
- **Cons**: Less declarative than iced, requires manual layout calculations

## Decision Rationale

**egui 0.20.0** was chosen for the following reasons:

1. **Compatibility**: During development, iced v0.10+ had dependency issues with Rust 1.75.0 due to transitive dependencies requiring edition2024 features. While Rust was upgraded to 1.92.0, egui proved more stable.

2. **Simplicity**: For a simple 4-button calculator, egui's immediate-mode paradigm is well-suited and results in more straightforward code without excessive boilerplate.

3. **Layout Control**: egui provides fine-grained control over widget positioning using `add_space()` and relative calculations, which maps well to the Python tkinter `.place()` positioning model.

4. **Task Scope**: Task 3 focuses on establishing GUI infrastructure. egui's simpler model allowed faster iteration on layout matching requirements.

## Trade-offs Accepted

- Less "modern" architecture compared to iced's Elm-inspired model
- Manual layout calculations instead of declarative layout systems
- Immediate-mode rather than retained-mode GUI

## Conclusion

While iced offers a more modern architecture, egui was selected for its compatibility, simplicity, and suitability for this calculator's requirements. Both frameworks are pure Rust, cross-platform, and well-maintained.
