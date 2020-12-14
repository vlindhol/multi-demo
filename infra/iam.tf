resource "aws_iam_service_linked_role" "aws_service_role_for_lex_bots" {
  aws_service_name = "lex.amazonaws.com"
}
