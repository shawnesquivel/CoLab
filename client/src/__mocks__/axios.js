// src/__mocks__/axios.ts
// stackoverflow: https://stackoverflow.com/questions/51393952/mock-inner-axios-create

const mockAxios = jest.genMockFromModule("axios");

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
