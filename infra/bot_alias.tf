resource "aws_lex_bot_alias" "multi_demo_dev" {
  bot_name    = aws_lex_bot.multi_demo.name
  bot_version = aws_lex_bot.multi_demo.version
  description = "Development version of multi-demo bot"
  name        = "MultiDemoDev"
}
