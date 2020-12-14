
import { APIGatewayProxyHandler } from 'aws-lambda';
import controllersFactory, { Controllers } from './controllers';
import servicesFactory from './services';
import repos from './repositories';

const textQueryFactory = (controllers: Controllers): APIGatewayProxyHandler =>
  async (event) => {
    try {
      const result = await controllers.textQuery.post(event.body);

      return {
        statusCode: 200,
        body: JSON.stringify({ textResponse: result}),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          textResponse: "I'm sorry, something went wrong. Shit happens 💩",
          error: err.message
        }),
      }
    }
  };

const controllers = controllersFactory(servicesFactory(repos));
export const textQuery = textQueryFactory(controllers);
