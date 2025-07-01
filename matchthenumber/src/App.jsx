import React from "react";

export default function App(){
    const updateButton = React.useRef(null)
    const buttonRef = React.useRef([])
    const [firstClickedValueIndex, setFirstClickedValueIndex] = React.useState(-1)

    const [arrNum, setArrNum] = React.useState([
        Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6),
        Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6)
    ])

    // ref كل واحد رح ياشر ع حالو
    const array = arrNum.map((x, index) => {
        return <button key={index} onClick={()=> handleClick(index)} ref={(el) => buttonRef.current[index] = el}>
            {x}
        </button>
    })

    let currentClickedValue, firstClickedValue

    // باختصار هاد الفنكشن مشان لما نصغط اول مرة ع بوتون : يتلون الباكجراوند و لون الخط
    // اما اذا ضغطنا ع بوتون و كان من قبلها بوتون مضغوط عليها ، ف رح يقارنها بالقيمة اللي انضغط عليها قبل
    // مشان انا بدي كل البوتونز يتلونو اخضر ويكون الهن نفس الفاليو كلهن
    function handleClick(key){
        // check if there is no clicked button before
        if(firstClickedValueIndex == -1){
            buttonRef.current[key].style.backgroundColor = "green"
            buttonRef.current[key].style.color = "white"
            setFirstClickedValueIndex(key)
        }else{
            currentClickedValue = arrNum[key]
            firstClickedValue = arrNum[firstClickedValueIndex]
            // i want to compare value of pressed button with first value i was clicked
            // if first value was clicked == current value has clicked then i will make another style
            if(firstClickedValue == currentClickedValue){
                buttonRef.current[key].style.backgroundColor = "green"
                buttonRef.current[key].style.color = "white"
            }  
        }
        // check if all buttons are green(clicked) then the content button will be Restart Game
        if(buttonRef.current.find(x => x.style.backgroundColor != 'green') == undefined) setInnerButton('Restart Game')
    }

    const [innerButton, setInnerButton] = React.useState("Update")

    function updateValues(){
        if(innerButton == 'Restart Game'){
            buttonRef.current.forEach(x => {
                x.style.backgroundColor = 'white'
                x.style.color = 'black'
            })
            setArrNum(old => old.map(x => Math.floor(Math.random()*6))) //reset all values to a new random value
            setInnerButton('Update')

        }else if(innerButton == 'Update'){
            setArrNum(old => {
                return old.map((x, index) => {
                    if(buttonRef.current[index].style.backgroundColor != 'green') return Math.floor(Math.random()*6)
                    return x
                })
            })
        }
    }

    return(
        <div>
            <h1>Let's play together !</h1>
            <h2>Click for any number</h2>
            <div className="buttons">{array}</div>
            <button ref={updateButton} onClick={()=> updateValues()}>{innerButton}</button>
        </div>
    )
}