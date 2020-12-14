provider "aws" {
  region = "us-east-1"
}

output "bot_arn" {
  value = aws_lex_bot.multi_demo.arn
}
