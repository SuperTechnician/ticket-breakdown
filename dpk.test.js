const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns hashed value when input is > 256 in length", () => {
    const event = {
      partitionKey: "abcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsflabcdabcdabcdabcdbandsmnansanmsamdnmandjvnsddklsfnsfl"
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBe(128);
  });
  it("Returns same partition Key when the length of the key is < 256", () => {
    const event = {
      partitionKey: "Clipbox"
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("Clipbox");
  })
  it("Returns sha3-512 hash of object with no partition key", () => {
    const hashRegexp = /[0-9a-f]{64}/i
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey.match(hashRegexp)).toBeTruthy();
  })

  it("Returns a stringified partition key if its an object", () => {
    const object = {
      partitionKey: { value: 1 }
    };
    const trivialKey = deterministicPartitionKey(object);

    expect(trivialKey).toEqual(JSON.stringify(object.partitionKey));
  })

  it('Returns the partition key if its string', () => {
    const object = {
      partitionKey: "sample key"
    };
    const trivialKey = deterministicPartitionKey(object);
    expect(trivialKey).toEqual(object.partitionKey);
  })

  it("Returns the same key given the same input", () => {
    const object = {
      value: "sample object",
    }
    const firstKey = deterministicPartitionKey(object);
    const secondKey = deterministicPartitionKey(object);
    expect(firstKey).toEqual(secondKey);
  })
});
