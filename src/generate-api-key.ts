import * as crypto from 'crypto';

function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

const apiKey: string = generateApiKey();
console.log(`Generated API Key: ${apiKey}`);
