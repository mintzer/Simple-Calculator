use eframe::egui;

// Type alias for future integration with Task #1's number type
// Once Task #1 is complete, this should be replaced with the actual number type
// e.g., pub type Number = CalculatorNumber; or similar
#[allow(dead_code)]
pub type Number = f64; // Placeholder - will be replaced with Task #1's type

// Message enum for button click events as specified in task architecture
// Names are specified in task requirements (PlusClicked, MinusClicked, etc.)
#[allow(clippy::enum_variant_names)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Message {
    PlusClicked,
    MinusClicked,
    MultiplyClicked,
    DivideClicked,
    AuthorClicked,
}

// Operation type enum for type-safe state management
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Operation {
    #[default]
    None,
    Addition,
    Subtraction,
    Multiplication,
    Division,
}

impl Operation {
    fn label(&self) -> &str {
        match self {
            Operation::None => "",
            Operation::Addition => "Summation",
            Operation::Subtraction => "Subtraction",
            Operation::Multiplication => "Multiplication",
            Operation::Division => "Division",
        }
    }

    fn colors(&self) -> OperationColor {
        match self {
            Operation::None => OperationColor::default(),
            Operation::Addition => OperationColor {
                // Red on light blue (#9ed8ee)
                label_color: egui::Color32::from_rgb(255, 0, 0),
                background_color: egui::Color32::from_rgb(158, 216, 238),
            },
            Operation::Subtraction => OperationColor {
                // Green on beige (#ece7e2)
                label_color: egui::Color32::from_rgb(0, 128, 0),
                background_color: egui::Color32::from_rgb(236, 231, 226),
            },
            Operation::Multiplication => OperationColor {
                // Blue on olive (#cacba9)
                label_color: egui::Color32::from_rgb(0, 0, 255),
                background_color: egui::Color32::from_rgb(202, 203, 169),
            },
            Operation::Division => OperationColor {
                // Yellow on sage green (#8dad96)
                label_color: egui::Color32::from_rgb(255, 255, 0),
                background_color: egui::Color32::from_rgb(141, 173, 150),
            },
        }
    }
}

pub struct CalculatorApp {
    pub input1: String,
    pub input2: String,
    pub operation: Operation,
    pub result: String,
}

impl Default for CalculatorApp {
    fn default() -> Self {
        Self {
            input1: String::new(),
            input2: String::new(),
            operation: Operation::None,
            result: "0".to_string(), // Initialize to "0" to match Python behavior
        }
    }
}


#[derive(Clone, Copy)]
pub struct OperationColor {
    pub label_color: egui::Color32,
    pub background_color: egui::Color32,
}

impl Default for OperationColor {
    fn default() -> Self {
        Self {
            label_color: egui::Color32::BLACK,
            background_color: egui::Color32::WHITE,
        }
    }
}

impl CalculatorApp {
    // Update method processes messages/events
    fn handle_message(&mut self, message: Message) {
        match message {
            Message::PlusClicked => {
                self.operation = Operation::Addition;
                self.result = "0".to_string();
                // Actual calculation will be implemented in Task 4
            }
            Message::MinusClicked => {
                self.operation = Operation::Subtraction;
                self.result = "0".to_string();
                // Actual calculation will be implemented in Task 4
            }
            Message::MultiplyClicked => {
                self.operation = Operation::Multiplication;
                self.result = "0".to_string();
                // Actual calculation will be implemented in Task 4
            }
            Message::DivideClicked => {
                self.operation = Operation::Division;
                self.result = "0".to_string();
                // Actual calculation will be implemented in Task 4
            }
            Message::AuthorClicked => {
                // Placeholder - actual dialog will be implemented in Task 4
                println!("Author: Pranta Sarker");
                println!("Batch: 6th");
                println!("Department: CSE");
                println!("North East University Bangladesh");
            }
        }
    }
}

impl eframe::App for CalculatorApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            // Calculate total available height for relative positioning
            let available_height = ui.available_height();

            ui.vertical_centered(|ui| {
                // Title at y=0.1 (10% from top)
                ui.add_space(available_height * 0.1);

                ui.label(
                    egui::RichText::new("Python Calculator")
                        .size(16.0)
                        .color(egui::Color32::from_rgb(0, 128, 0))
                        .underline(),
                );

                // First input field at y=0.3 (30% from top)
                ui.add_space(available_height * 0.2 - 30.0);

                ui.horizontal(|ui| {
                    ui.add_space(90.0);
                    ui.add_sized(
                        [200.0, 20.0],
                        egui::TextEdit::singleline(&mut self.input1)
                            .hint_text("Enter first number"),
                    );
                });

                // Second input field at y=0.4 (40% from top)
                ui.add_space(available_height * 0.1 - 20.0);

                ui.horizontal(|ui| {
                    ui.add_space(90.0);
                    ui.add_sized(
                        [200.0, 20.0],
                        egui::TextEdit::singleline(&mut self.input2)
                            .hint_text("Enter second number"),
                    );
                });

                // Operation label at y=0.5 (50% from top)
                ui.add_space(available_height * 0.1 - 20.0);

                // Always show operation label area (matches Python behavior)
                let operation_label = self.operation.label();
                ui.horizontal(|ui| {
                    ui.add_space(90.0);
                    if !operation_label.is_empty() {
                        let colors = self.operation.colors();
                        let frame = egui::Frame::none()
                            .fill(colors.background_color)
                            .inner_margin(egui::vec2(5.0, 5.0))
                            .stroke(egui::Stroke::new(1.0, egui::Color32::GRAY));
                        frame.show(ui, |ui| {
                            ui.add_sized(
                                [190.0, 20.0],
                                egui::Label::new(
                                    egui::RichText::new(operation_label).color(colors.label_color),
                                ),
                            );
                        });
                    } else {
                        // Reserve space even when no operation is selected
                        ui.add_sized([200.0, 30.0], egui::Label::new(""));
                    }
                });

                // Result label at y=0.6 (60% from top)
                ui.add_space(available_height * 0.1 - 20.0);

                ui.horizontal(|ui| {
                    ui.add_space(90.0);
                    ui.add_sized([200.0, 20.0], egui::Label::new(&self.result));
                });

                // Operation buttons at y=0.7 (70% from top)
                ui.add_space(available_height * 0.1 - 15.0);

                // Position buttons at relative x positions: 10%, 30%, 50%, 70%
                // to match Python's relx=0.1, 0.3, 0.5, 0.7
                let available_width = ui.available_width();
                ui.horizontal(|ui| {
                    // Plus button at 10% from left
                    ui.add_space(available_width * 0.1 - 20.0);
                    if ui.add_sized([40.0, 25.0], egui::Button::new("+")).clicked() {
                        self.handle_message(Message::PlusClicked);
                    }

                    // Minus button at 30% from left
                    ui.add_space(available_width * 0.2 - 40.0);
                    if ui.add_sized([40.0, 25.0], egui::Button::new("-")).clicked() {
                        self.handle_message(Message::MinusClicked);
                    }

                    // Multiply button at 50% from left
                    ui.add_space(available_width * 0.2 - 40.0);
                    if ui.add_sized([40.0, 25.0], egui::Button::new("*")).clicked() {
                        self.handle_message(Message::MultiplyClicked);
                    }

                    // Divide button at 70% from left
                    ui.add_space(available_width * 0.2 - 40.0);
                    if ui.add_sized([40.0, 25.0], egui::Button::new("/")).clicked() {
                        self.handle_message(Message::DivideClicked);
                    }
                });

                // Author button at y=0.95 (95% from top)
                ui.add_space(available_height * 0.25 - 30.0);

                if ui
                    .add_sized([60.0, 25.0], egui::Button::new("Author"))
                    .clicked()
                {
                    self.handle_message(Message::AuthorClicked);
                }
            });
        });
    }
}
