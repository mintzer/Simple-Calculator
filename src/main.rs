mod app;

use eframe::egui;

fn main() {
    let options = eframe::NativeOptions {
        initial_window_size: Some(egui::vec2(380.0, 300.0)),
        resizable: false,
        ..Default::default()
    };
    eframe::run_native(
        "My First Python Calculator",
        options,
        Box::new(|_cc| Box::new(app::CalculatorApp::default())),
    );
}
