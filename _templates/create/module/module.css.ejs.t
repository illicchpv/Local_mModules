---
to: <%= absPath %>/<%= component_name %>.css
---

/* <%= component_name %>.css */
.<%= component_name %> {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24;
  padding: 10px;
  border: 1px solid lightslategray;
  background-color: white;
  color: black;
  max-width: 300px;
  background-image: url('./m_resurs/imgInCss.svg');
  background-repeat: no-repeat;
  background-position: top right;

  .instance {
    color: blue;
  }
  h3{
    margin: 0;
    margin-bottom: 10px;
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .box__row{
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .counter {
    color: crimson;
  }
}
