const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const record = [];

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //Get message text
    let msg = (e.target.elements.msg.value).trim();
    if(msg){
        //split message string
        let msgText = msg.split(" ");
        let msgCode = msgText ? msgText[0] : "";
        let msgId = msgText ? msgText[1] : "";
        let msgName = msgText ? msgText[2] : "";
        
        //output message
        if(msg && msgCode === 'Enter'){
            record.push(`Enter ${msgId ? msgId : ""} ${msgName ? msgName : ""}`);
        }else if(msg && msgCode === 'Leave'){
            let isEnter = searchRecord(msgId, record);
            if(isEnter){
                record.push(`Leave ${msgId ? msgId : ""}`);
            }else{
                alert("You are not entered yet!");
            }
        }else if(msg && msgCode === 'Change'){
            let isEnter = searchRecord(msgId, record);
            if(isEnter){
                record.push(`Change ${msgId ? msgId : ""} ${msgName ? msgName : ""}`);
            }else{
                alert("You are not entered yet!");
            }
        }else{
            record.push(msg);
        }

        let result = solution(record);
        console.log("#record: ", record);
        console.log("#result: ", result);

        //alert to show record & answer
        alert (`record:\n ${record} \n\n answer:\n ${result}`);
        answerResult(result);

        //Clear input
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    }

    
});

//Function solution to get Answer
function solution(record) {
    let answer = [];
    if(record.length > 0){
        let msgOutput = "";
        for (let i=0; i < record.length; i++) {
            let strRecord = record[i].split(" ");
            let msgCode = strRecord ? strRecord[0] : "";
            let msgId = strRecord ? strRecord[1] : "";
            let msgNickName = strRecord ? strRecord[2] : "";
            if(strRecord && msgCode === 'Enter'){
                msgOutput = `${msgNickName ? msgNickName : ""} came in.`;
                answer.push(msgOutput);
            }else if(strRecord && msgCode === 'Leave'){
                let enterNickName = searchEnterRecord(`Enter ${msgId}`, record);
                msgOutput = `${enterNickName ? enterNickName : ""} has left.`;
                answer.push(msgOutput);
            }else if(msg && msgCode === 'Change'){
                msgOutput = `${msgNickName ? msgNickName : ""} come in.`;
                answer.push(msgOutput);
            }else{
                answer.push(record);
            }
        }
    }
    return answer;
}

//Function to search record by id
function searchRecord(id, rec){
    if(rec.length > 0){
        for (let i=0; i < rec.length; i++) {
            let searchId = rec[i].search(id);
            if(searchId != -1)
                return true;
        }
    }else{
        return false;
    }
}

//Function to search record by Enter & id
function searchEnterRecord(enterId, rec){
    if(rec.length > 0){
        for (let i=0; i < rec.length; i++) {
            let searchEnterId = rec[i].search(enterId);
            if(searchEnterId === -1){
                return "";
            }else{
                let nickName = rec[i].replace(`${enterId} `, "");
                return nickName;
            }
        }
    }else{
        return false;
    }
}

//Output answer message from DOM
function answerResult(result) {
    const div = document.createElement('div');
    for(var i=0; i < result.length; i++)
        div.innerHTML = `
        <p>${result[i]} </p>
        `;
    document.querySelector('.chat-messages').appendChild(div);
}