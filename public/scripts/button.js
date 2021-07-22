const submit = document.querySelector(".submit-btn")
const textarea = document.querySelector("textarea")

function toggleButton(){
    if(textarea.value !== ""){
      submit.disabled = false
    }else{
      submit.disabled =true
    }
}

