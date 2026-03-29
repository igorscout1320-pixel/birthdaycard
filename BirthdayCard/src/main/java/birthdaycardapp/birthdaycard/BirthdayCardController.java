package birthdaycardapp.birthdaycard;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BirthdayCardController {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("MMMM d");

    @GetMapping("/api/card")
    public BirthdayCardResponse card(
            @RequestParam(defaultValue = "Birthday Star") String name,
            @RequestParam(defaultValue = "Someone who cares about you") String from) {

        String trimmedName = name.trim().isEmpty() ? "Birthday Star" : name.trim();
        String trimmedFrom = from.trim().isEmpty() ? "Someone who cares about you" : from.trim();

        return new BirthdayCardResponse(
                "Happy Birthday, " + trimmedName + "!",
                "Wishing you a day filled with music, laughter, cake, and the kind of memories that stay bright all year.",
                "Celebrating you on " + LocalDate.now().format(DATE_FORMAT),
                trimmedFrom,
                List.of("Make a wish", "Save room for cake", "Dance like the confetti is falling just for you"));
    }

    public record BirthdayCardResponse(
            String title,
            String message,
            String occasion,
            String signedBy,
            List<String> wishes) {
    }
}
