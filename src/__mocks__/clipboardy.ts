export const read = jest
  .fn()
  .mockImplementationOnce(async () => 'tag')
  .mockImplementationOnce(async () => '')
  .mockImplementationOnce(async () => 'first tag,second tag')
  .mockImplementationOnce(async () => 'alpha,gamma,beta')
  .mockImplementationOnce(async () => 'alpha,gamma,beta,gamma')

export const write = jest.fn()
