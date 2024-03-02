---
to: <%= absPath %>/<%= module_name %>.css
---

/* <%= module_name %>.css */
.<%= module_name %> {
  position: relative;
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

  &[disabled]{
    pointer-events: none;
  }
  &[disabled]::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(154, 154, 154, 0.2);
  }
}
