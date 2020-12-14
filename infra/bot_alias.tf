resource "aws_lex_bot_alias" "multi_demo_bot_dev" {
  bot_name    = aws_lex_bot.multi_demo_bot.name
  bot_version = aws_lex_bot.multi_demo_bot.version
  description = "Development version of multi-demo bot"
  name        = "MultiDemoDev"
}
