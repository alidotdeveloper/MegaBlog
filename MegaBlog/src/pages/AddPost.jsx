import React from "react";
import {Container, postForm} from "../Components/index"


function AddPost() {
  return (
      <div className="py-8">
          <Container >
              <postForm/>
          </Container>
    </div>
  )
}

export default AddPost