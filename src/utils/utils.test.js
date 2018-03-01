import { generateId } from "./index"

describe("generate Id function tests", () => {
  const id = generateId()

  it("should return number", () => {
    expect(typeof id).toBe("number")
  })

  it("should be length of 13", () => {
    expect(id.toString().length).toBe(13)
  })
})
