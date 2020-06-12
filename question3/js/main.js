const relationForm = document.getElementById('relation-form');

relationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputs = document.getElementById("relation-form").elements;
    let relation = [];
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName === "INPUT" && inputs[i].type === "text") {
          let inputValue = inputs[i].value.toLowerCase();
          inputValue = inputValue.replace(/\s/g, '');
          let arrInputValue = inputValue.split(',');
          relation.push(arrInputValue);
        }
    }
    let getAnswer = solution(relation);
    
    console.log("#relation: ", relation);
    console.log("#answer: ", getAnswer);
    alert (`relation: ${relation} \nanswer: ${getAnswer}`);

});

function solution(relation) {
    let answer = 0;
    let numTemp = [];
    let nameMajorTemp = [];

    for (i = 0; i < relation.length; i++) {
        let itemRelation = relation[i];
        numTemp.push(itemRelation[0]);
        nameMajorTemp.push(itemRelation[1] + itemRelation[2]);
    }

    let duplicateNum = numTemp.filter((e, i, a) => a.indexOf(e) !== i);
    if(duplicateNum.length === 0){
        answer = answer + 1;
    }

    let duplicateNameMajor = nameMajorTemp.filter((e, i, a) => a.indexOf(e) !== i);
    if(duplicateNameMajor.length === 0){
        answer = answer + 1;
    }

    return answer;
}
