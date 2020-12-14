resource "aws_lex_bot" "multi_demo" {
  abort_statement {
    message {
      content_type = "PlainText"
      content      = "Sorry, I am not able to assist at this time"
    }
  }

  child_directed = false

  clarification_prompt {
    max_attempts = 2

    message {
      content_type = "PlainText"
      content      = "I didn't understand you, what would you like to do?"
    }
  }
  description                 = "Bot to perform all kinds of commands via a text interface"
  detect_sentiment            = false
  idle_session_ttl_in_seconds = 600

  intent {
    intent_name    = aws_lex_intent.check_weather.name
    intent_version = aws_lex_intent.check_weather.version
  }

  locale   = "en-US"
  name     = "MultiDemo"
  process_behavior = "BUILD"
  voice_id = "Salli"
}
