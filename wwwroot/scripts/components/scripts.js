export function showPrompt(message) {
    return prompt(message, 'Type anything here');
}

export function showAlert(comment) {
    alert(comment);
}

export function StartJS() {
    const TextChange = document.getElementById(id)
    TextChange.innerText = "자바스크립트에서 넣는 데이터";
}