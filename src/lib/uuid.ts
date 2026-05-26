const randomHex = (): string => Math.floor(Math.random() * 16).toString(16);

const fallbackRandomUuid = (): string => {
  const segments: number[] = [8, 4, 4, 4, 12];
  let uuid = '';

  for (let index = 0; index < segments.length; index += 1) {
    if (index > 0) {
      uuid += '-';
    }

    const segmentLength = segments[index];

    for (let position = 0; position < segmentLength; position += 1) {
      if (index === 2 && position === 0) {
        uuid += '4';
      } else if (index === 3 && position === 0) {
        const variant = (parseInt(randomHex(), 16) & 0x3) | 0x8;
        uuid += variant.toString(16);
      } else {
        uuid += randomHex();
      }
    }
  }

  return uuid;
};

export const generateUuid = (): string => {
  const cryptoObject = globalThis.crypto;

  if (cryptoObject && typeof cryptoObject.randomUUID === 'function') {
    return cryptoObject.randomUUID();
  }

  return fallbackRandomUuid();
};

export default generateUuid;
