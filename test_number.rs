fn is_number(s: &str) -> bool {
    if s.is_empty() {
        return false;
    }

    // Handle simple cases first
    // Check if it's a simple decimal number (e.g., "123.456")
    if s.contains('.') {
        let parts: Vec<&str> = s.split('.').collect();
        if parts.len() == 2 {
            let before = parts[0];
            let after = parts[1];

            // Handle cases like ".123"
            if before.is_empty() && after.chars().all(|c| c.is_ascii_digit()) && !after.is_empty() {
                return true;
            }

            // Handle cases like "123.456" or "-123.456" or "+123.456"
            if !after.is_empty() && after.chars().all(|c| c.is_ascii_digit()) {
                if before.is_empty() {
                    return false; // Just "." is not valid
                }

                if before.chars().all(|c| c.is_ascii_digit()) {
                    return true;
                }

                // Handle signed decimals
                if before.len() > 1 {
                    let first_char = before.chars().next().unwrap();
                    if first_char == '-' || first_char == '+' {
                        let rest = &before[1..];
                        if rest.chars().all(|c| c.is_ascii_digit()) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // Check if it's a simple integer
    if s.chars().all(|c| c.is_ascii_digit()) {
        return true;
    }

    // Check for signed numbers
    if s.len() > 1 {
        let first_char = s.chars().next().unwrap();
        if first_char == '-' || first_char == '+' || first_char == ' ' {
            let rest = &s[1..];

            if rest.is_empty() {
                return false;
            }

            // Handle cases like "-123" or "+123"
            if rest.chars().all(|c| c.is_ascii_digit()) {
                return true;
            }

            // Handle cases like "-.123" or "+.123"
            if rest.starts_with('.') && rest.len() > 1 {
                let after_dot = &rest[1..];
                if after_dot.chars().all(|c| c.is_ascii_digit()) && !after_dot.is_empty() {
                    return true;
                }
            }

            // Handle cases like "-0.123" or "+0.123" or "-123.456"
            if rest.contains('.') {
                let parts: Vec<&str> = rest.split('.').collect();
                if parts.len() == 2 {
                    let before = parts[0];
                    let after = parts[1];
                    if !after.is_empty() && after.chars().all(|c| c.is_ascii_digit()) {
                        if !before.is_empty() && before.chars().all(|c| c.is_ascii_digit()) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    false
}

fn main() {
    println!("Testing '-.123': {}", is_number("-.123"));
    println!("Testing '+.456': {}", is_number("+.456"));
    println!("Testing '-0.123': {}", is_number("-0.123"));
    println!("Testing '+123.45': {}", is_number("+123.45"));
}
