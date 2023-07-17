const nameValidator = (text: string) =>
  /^[a-zA-Z]{3,10}$/.test(text)
    ? ""
    : "Name should be one word, 3 to 10 Latin letters."

const emailValidator = (text: string) =>
  new RegExp(
    /^(?:[\w-])*/.source // inbox name
    + /(?:\+[\w-])?/.source // plus identifier
    + /@(?:[a-zA-Z-]+\.)+/.source // domain name (gmail. or mail.google.)
    + /[a-zA-Z]{2,}$/.source // TDD
  ).test(text)
    ? ""
    : "Email should be between 10 and 30 characters long"
      + " and contain alphanumeric characters, underscores, hyphens or plus signs"
      + " followed by @ and a correct domain name."

const phoneValidator = (text: string) =>
  /^[0-9]{7,13}$/.test(text)
    ? ""
    :"Phone should be 7 to 13 digits."

export { nameValidator, emailValidator, phoneValidator }
