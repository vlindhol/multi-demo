
import { APIGatewayProxyHandler } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import controllersFactory, { Controllers } from './controllers';
import services from './services';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const textQueryFactory = (controllers: Controllers): APIGatewayProxyHandler =>
  async (event) => {
    try {
      const result = await controllers.textQuery.parseAndRun(event.body);

      return {
        statusCode: 200,
        body: `result is '${result}'`,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: err.message,
      }
    }
  };

const controllers = controllersFactory(services);
export const textQuery = textQueryFactory(controllers);
