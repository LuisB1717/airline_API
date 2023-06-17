export class HttpError extends Error {
  constructor(message, data, code = 400) {
    super(message)
    this.data = data
    this.code = code
  }
}