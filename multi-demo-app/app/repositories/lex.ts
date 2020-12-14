import aws from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const lexRuntime = new aws.LexRuntime({ apiVersion: '2016-11-28' });

interface LexResponse {
  intentName?: string | null;
  dialogState?: string;
  slots?: Record<string, string>;
  message?: string;
}

export const parseQuery = async (inputText: string): Promise<LexResponse> => {
  const params = {
    botAlias: 'MultiDemoDev',
    botName: 'MultiDemo',
    userId: uuid(),
    inputText,
  };
  return new Promise((resolve, reject) => lexRuntime.postText(params, (err, data) => {
    if (err) return reject(err);
    resolve(data);
  }));
}