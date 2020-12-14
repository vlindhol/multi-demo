# Alexa-like service demo for Multi

This codebase creates an Alexa-like text interface where the caller can
ask questions and receive answers, in human-readable form. The service uses
AWS Lex as the language processing backend and calls out to OpenWeather for
weather data.

## Prerequisites

* Node v12
* Terraform 0.14.2
* An AWS account
* An OpenWeather account (and API key)

## Getting started

Make sure that your AWS credentials are defined in ~/.aws/credentials under an appropriate profile name:

```
[multi-demo]
region=us-east-1
aws_access_key_id=XXX
aws_secret_access_key=XXX
```

Since AWS Lex only works in the `us-east-1` region, we currently require you to colocate your infrastructure there for ease of access.

### Building 
Run
```
# multi-demo is the AWS profile name mentioned above
./deploy.sh multi-demo
```

to set up the Lex bot using Terraform, and the AWS Lambda function (and other assorted resources) using the Serverless Framework.

### Trying out the service

At the end of the build output there should be a reference to an HTTP endpoint you can call, you can test it with

```
curl --location --request POST 'https://YOUR_API_ENDPOINT' \
--header 'Content-Type: application/json' \
--data-raw '{ "query": "What'\''s the weather like in Oslo today?" }'
```

### Running tests

```
cd multi-demo-app
npm run test
npm run coverage # coverage is generated as HTML in ./coverage/lcov-report/index.html
```

### Removing the resources

```
# again, replace multi-demo with whatever your AWS profile name is
./undeploy.sh multi-demo
```

## Design

The main idea of the code is to facilitate easy additions of new features to our "Alexa". This is achieved using the Command pattern, where each "feature" of our bot is associated with one command. Currently there is only one command implemented, the `CheckCityWeather` command, which gives a short weather report for a city (mainly European cities).

All logic is contained within a single Lambda function, i.e. the same function calls out to Lex for query parsing, and OpenWeather for getting the weather data. This is not extremely cost-optimal, and Lex does support triggering other Lambdas as a result of a successful "match" to one of the so-called intents defined for the bot. However, this makes things harder to test and debug, so I tend to prefer using Lambdas in a "monolithic" way whenever possible.

The requests are handled with a standard `controller - service - repository` pattern.

Testability should be fairly good, with lots of dependency inversion all over the place. There is no DI framework in use, since it's such as small service.

## What could be improved

* Authentication and proper rate limiting etc is missing
* One could set up e.g. Redis for caching
* The sophistication of the language parsing is naturally bounded by whatever Lex can handle. The models can be tweaked to infinity I'm sure
* If we start getting thousands of requests we have to consider putting the requests into a queue, using e.g. Amazon SQS
* `./deploy.sh` and especially `./undeploy.sh` are not 100% reliable, sometimes they fail due to AWS resource race conditions
* CI/CD in general is missing
* i18n is not given a single thought, although Lex only supports English for now, sooooo....
* Test coverage of the repositories is not very good, but didn't want to fiddle any more with the code
* I like using a very strict linter like Prettier, but didn't want to waste time on setting it up
* The infrastructure is only set up to produce a "dev build", both Terraform and Serverless know nothing about production, versioning etc
* The OpenWeather API key is hardcoded. This isn't the end of the world since it isn't connected to a billed service and there are rate limits in place

## Adding a new "skill" to the bot

* Go to `./infra/intents.tf` and add an appropriate intent, name it e.g. `Foo`.
* Go to `./app/services/commands` and create a new `Command`, name it e.g. `FooCommand`. You will probably need to add a new repository or repository method that the command will call in its `run` method.
* Go to `./app/services/queryParsing.ts` and add `Foo` to the switch statement, returning a `FooCommand`.
* Add tests! :)