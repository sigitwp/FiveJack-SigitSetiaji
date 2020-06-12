const stageForm = document.getElementById('stage-form');

stageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let N = parseInt(e.target.elements.numberPlayer.value);
    let users = (e.target.elements.users.value).trim();
        users = users.replace(/\s/g, '');
    let arrUsers = users.split(',').map(Number);
    solution(N, arrUsers);
});

function solution(N, users) {
    let answer = [];
    let answerTemp = [];
    let clearRate = N + 1;
    let getFailureTemp = 0;
    for (let i=1; i <= N; i++){
        let numberStage = i;
        let getFailure = searchStage(numberStage, users);

        console.log(`Stage ${numberStage} failure rate: ${getFailure}/${(users.length - getFailureTemp)}`);
        
        let newStage = {
            userNum: numberStage,
            failRate: getFailure / (users.length - getFailureTemp)
        }
        answerTemp.push(newStage);
        getFailureTemp = getFailureTemp + getFailure;
    }
    let sortAnswerTemp = answerTemp.sort((a, b) => (a.failRate > b.failRate) ? -1 : 1);
    answer = getUserNum(sortAnswerTemp);
    
    //alert to show: Answer Sort Failure rate of Stage
    alert (`N: ${N} \nusers: ${users} \nanswer: ${answer}`);

    return answer;
}

function searchStage(numberStage, users) {
    let results = [];
        users.forEach(x => {
            if (x === numberStage){
                results.push(x);
            }   
        });
    return results.length;
}

function getUserNum(sortAnswer) {
    let userNum = [];
    for (let i=0; i < sortAnswer.length; i++) {
        userNum.push(sortAnswer[i].userNum);
    }
    return userNum;
}