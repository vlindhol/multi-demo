resource "aws_lex_intent" "check_weather" {
  description = "Intent to check the weather in some (European) city"

  fulfillment_activity {
    type = "ReturnIntent"
  }

  name = "CheckWeather"

  sample_utterances = [
    "What's the weather like in {Location}",
    "I would like to know the weather in {Location}",
  ]

  slot {
    description = "The location to check the weather for"
    name        = "Location"
    priority    = 1

    sample_utterances = [
      "What's the weather like in {Location}",
    ]

    slot_constraint   = "Required"
    slot_type         = "AMAZON.EUROPE_CITY"

    value_elicitation_prompt {
      max_attempts = 2

      message {
        content      = "What city would you like to check the weather for?"
        content_type = "PlainText"
      }
    }
  }
}
