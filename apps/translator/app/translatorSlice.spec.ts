import reducer, {
    IError,
    initialState,
    setDiff,
    setError,
    setLanguage,
    setModified,
    setOriginal,
    selectDiff,
    selectError,
    selectLanguage,
    selectModified,
    selectOriginal,
  } from "./translatorSlice"
  
  describe("translatorSlice", () => {
    it("should have correct initial state", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(reducer(undefined, {})).toEqual(initialState)
    })
  
    it("should correctly set language in state", () => {
      const nextState = reducer(initialState, setLanguage("test"))
      expect(selectLanguage({ translator: nextState })).toEqual("test")
    })
  
    it("should correctly set modified in state", () => {
      const nextState = reducer(
        initialState,
        setModified("cy.get('.this-class')")
      )
      expect(selectModified({ translator: nextState })).toEqual(
        "cy.get('.this-class')"
      )
    })
  
    it("should correctly set original in state", () => {
      const nextState = reducer(
        initialState,
        setOriginal("by.className('this-class')")
      )
      expect(selectOriginal({ translator: nextState })).toEqual(
        "by.className('this-class')"
      )
    })
  
    it("should correctly set diff in state", () => {
      const diffArray = [
        {
          original: "by.className('this-class')",
          modified: "cy.get('.this-class')",
          api: [
            {
              command: "get",
              url: "https://on.cypress.io/get",
            },
          ],
        },
      ]
      const nextState = reducer(initialState, setDiff(diffArray))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
    })
  
    it("should correctly set error in state", () => {
      const error: IError = {
        message: "This is an error.",
        level: "info",
      }
  
      const nextState = reducer(initialState, setError(error))
      expect(selectError({ translator: nextState })).toEqual(error)
    })
  })