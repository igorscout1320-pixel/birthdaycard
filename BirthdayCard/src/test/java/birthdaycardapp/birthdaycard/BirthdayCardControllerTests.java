package birthdaycardapp.birthdaycard;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BirthdayCardController.class)
class BirthdayCardControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void cardEndpointReturnsPersonalizedData() throws Exception {
        mockMvc.perform(get("/api/card")
                        .param("name", "Mina")
                        .param("from", "Alex"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Happy Birthday, Mina!"))
                .andExpect(jsonPath("$.signedBy").value("Alex"))
                .andExpect(jsonPath("$.wishes[0]").value("Make a wish"));
    }
}
