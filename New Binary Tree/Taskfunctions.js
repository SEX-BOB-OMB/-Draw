const MAX_INT = 100;

const treeDiv = document.getElementById("tree");
const formElement = document.getElementById('input');
const operationBlock = document.getElementById("operationBlock");
let treeNodes;

let formData;
let executableOperation;
let tree;
let direction;

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    formData = new FormData(formElement);

    selectedType = formData.get('type');
    keys = formData.get('keys');
    selectedOperation = formData.get('operation');
    selectedNodes = [];

    initializationList = initialize(
        treeType = selectedType,
        keys = keys,
        operationType = selectedOperation
    );

    tree = initializationList[0];
    executableOperation = initializationList[1];

    operationBlock.innerHTML = drawOperationBlock(executableOperation);
    treeDiv.innerHTML = tree.treePrinter();
    treeNodes = document.getElementById("selectedNodes");
});


const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element == b[index]);

function checkResults(userResult, subOperationResult, i) {
    let _userResult = userResult
    if (typeof userResult === 'string') {
        _userResult = [document.querySelector(userResult).value]
    }
    console.log(_userResult, subOperationResult)
    if (compareArrays(_userResult, subOperationResult)) {
        alert('Все верно!');
        suboperationDiv = document.getElementById('suboperationBlock')
        suboperationDiv.innerHTML = drawSuboperationBlock(executableOperation.subOperations, i + 1)
        
        treeNodes = document.getElementById("selectedNodes");
    } else {
        alert('Ошибка');
    }
}

function drawOperationBlock() {
    operationText = `Задание: ${executableOperation.text}`;
    suboperationBlock = `<div id='suboperationBlock'>${drawSuboperationBlock(executableOperation.subOperations, 0)}</div>`;
    
    return operationText + suboperationBlock;
}

function drawSuboperationBlock(suboperationList, i) {
    if (i >= suboperationList.length) {
        selectedNodes = [];

        if (executableOperation !== "bfs" || executableOperation !== "dfs") {
            initializationList = initialize(
                treeType = formData.get("type"),
                keys = executableOperation.outputData.keys,
                operationType = selectedOperation
            );

            tree = initializationList[0];
            executableOperation = initializationList[1];
        }

        // tree = getTree(treeType, executableOperation.outputData.keys)
        treeDiv.innerHTML = tree.treePrinter();
        operationBlock.innerHTML = drawOperationBlock(executableOperation);
        treeDiv.innerHTML = tree.treePrinter();
    } else {
        suboperation = suboperationList[i];
  
        if (formData.get('operation') === 'add' && i == 1) {
            addDirection = `['${suboperation.outputData.keys}']`
            suboperationText = `${i + 1}. ${suboperation.text}
                <div id="selectedNodes"></div>
                <label>
                    Слева
                    <input type='radio' name='direction' value='left' checked />
                </label>
                <label>
                    Справа
                    <input type='radio' name='direction' value='right' />
                </label>
                <input type="button" value="Проверить" onclick="checkResults('input[name=direction]:checked', ${addDirection}, ${i})">
            `;
            return suboperationText;
        } else if ((formData.get('operation') === 'add' || formData.get('operation') === 'del') && i % 2 == 1 && i > 2 ) {
            rotateDirection = `['${suboperation.outputData.keys}']`
            suboperationText = `${i + 1}. ${suboperation.text}
                <div id="selectedNodes"></div>
                <label>
                    Левый
                    <input type='radio' name='direction' value='left' checked />
                </label>
                <label>
                    Правый
                    <input type='radio' name='direction' value='right' />
                </label>
                <label>
                    Левый-правый
                    <input type='radio' name='direction' value='left-right' />
                </label>
                <label>
                    Правый-левый
                    <input type='radio' name='direction' value='right-left' />
                </label>
                <input type="button" value="Проверить" onclick="checkResults('input[name=direction]:checked', ${rotateDirection}, ${i})">
            `;
            return suboperationText;
        }


        if (suboperation.inputData.isTree) {
            selectedNodes = [];
            tree = getTree('bst', suboperation.inputData.keys)
            treeDiv.innerHTML = tree.treePrinter();
        }
        
        keysStr = `[${suboperation.outputData.keys.toString()}]`
        suboperationText = `${i + 1}. ${suboperation.text}
            <div id="selectedNodes"></div>
            <input type="button" value="Проверить" onclick="checkResults(selectedNodes, ${keysStr}, ${i})">
        `;
        return suboperationText;
    }
}

function getTree(selectedType, keys) {
    let tree;

    switch (selectedType) {
        case 'bst':
            tree = new BinarySearchTree();
            break;
        case 'avl':
            tree = new AVLTree();
            break;
    }

    if (typeof keys === "string")
        keysValues = keys.split(" ").map(x => parseInt(x))
    else
        keysValues = keys
    
    for (i in keysValues) {
        tree.insert(keysValues[i]);
    }

    return tree;
}

function initialize(treeType, keys, operationType) {
    tree = getTree(treeType, keys)
    operation = getOperation(operationType, tree)
    return [tree, operation];
}

function getOperation(selectedOperation, tree) {
    switch (selectedOperation) {
        case 'bfs':
            return new OperationBFS(tree);
        case 'dfs':
            return new OperationDFS(tree);
        case 'del':
            return new OperationDel(tree);
        case 'add':
            return new OperationAdd(tree);
    }
}
