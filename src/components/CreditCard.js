import React, { useState } from 'react'

export default function CreditCard() {
  const num1 = React.createRef();
  const num2 = React.createRef();
  const num3 = React.createRef();
  const num4 = React.createRef();

  const [cardNumber, setCardNumber] = useState([])

  function handleSubmit() {
    setCardNumber([...cardNumber, {
      n1: num1.current.value,
      n2: num2.current.value,
      n3: num3.current.value,
      n4: num4.current.value
    }]);
  }

  function handleDelete(ele) {
    setCardNumber(cardNumber.filter((_, i) => i !== cardNumber.length - 1))
  }

  function handlePaste() {
    navigator.clipboard.readText()
      .then(text => {

        let num = text
        let numLength = num.length
        let n = 4;
        let temp = 1;

        if (numLength !== 16) {
          alert("Invalid Card Number: Card number should be of 16 digit long")
        } else {
          for (let i = 0; i < numLength; i = i + n) {
            let part = num.substring(i, i + n);

            document.getElementById(`input${temp}`).value = part;
            temp++;
          }
        }
        document.getElementById("input4").focus();
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  function moveFocus(fromTxt, toTxt) {
    var fromValue = document.getElementById(fromTxt).value
    if (fromValue.length === 4) {
      document.getElementById(toTxt).focus();
    }
  }

  return (
    <div className='parent'>
      <div className='child'>
        <div className='inputContainer'>

          <label>Card Number* </label>
          <input type='text' required minLength="4" maxLength="4" ref={num1} onPaste={handlePaste} id='input1' onKeyUp={() => moveFocus('input1', 'input2')}></input>
          <input type='text' required minLength="4" maxLength="4" ref={num2} onPaste={handlePaste} id='input2' onKeyUp={() => moveFocus('input2', 'input3')}></input>
          <input type='text' required minLength="4" maxLength="4" ref={num3} onPaste={handlePaste} id='input3' onKeyUp={() => moveFocus('input3', 'input4')}></input>
          <input type='text' required minLength="4" maxLength="4" ref={num4} onPaste={handlePaste} id='input4'></input>
        </div>
        <div className='submitBtn'>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <table border="1">
          <tbody>
            <tr>
              <th>Card Number List</th>
            </tr>

            {cardNumber.map((ele, index) => (
              <tr key={index}>
                <td>{ele.n1} {ele.n2} {ele.n3} {ele.n4}</td>
                <td>
                  <button onClick={handleDelete}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div >
  )
}
