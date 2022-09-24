import { render } from "@testing-library/react";
import App from "./App";

describe(App, () =>{
  it("App renders correctly ", () => {
    const {getAllByDisplayValue} = render(<App />)
  })  
})