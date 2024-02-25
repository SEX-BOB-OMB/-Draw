const MAX_INT = 100;

const formElement = document.getElementById('input');
const operationBlock = document.getElementById("operationBlock");
let treeNodes;

let formData;
let executableOperation;
let tree;

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
    if (compareArrays(userResult, subOperationResult)) {
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

        operationBlock.innerHTML = drawOperationBlock(executableOperation);
        treeDiv.innerHTML = tree.treePrinter();
    } else {
        suboperation = suboperationList[i];
        
        if (formData.get('operation') === 'add' && i === 1) {
            result = confirm("Добавить в левое поддерево?");
            suboperationDiv = document.getElementById('suboperationBlock')
            
            if (suboperation.outputData.keys == result) {
                alert('Все верно!')
                suboperationDiv.innerHTML = drawSuboperationBlock(executableOperation.subOperations, 2)
            } else {
                alert('Ошибка')
                suboperationDiv.innerHTML = drawSuboperationBlock(executableOperation.subOperations, 1)
            }
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
            treeKeys = tree.preorderTraversal(tree.root);
            return new Operation(
                "Выполните обход в ширину",
                [
                    new SubOperation("Тык-тык по узлам", new inputData(treeKeys), new outputData(tree.bfs())),
                ],
                new inputData(treeKeys, true),
                new outputData(tree.bfs(), false)
            );
        case 'dfs':
            treeKeys = tree.preorderTraversal(tree.root);
            return new Operation(
                "Выполните обход в глубину",
                [
                    new SubOperation("Тык-тык по узлам", new inputData(treeKeys), new outputData(treeKeys)),
                ],
                new inputData(treeKeys, true),
                new outputData(treeKeys, false)
            );
        case 'del':
            treeKeys = tree.preorderTraversal(tree.root);
            
            delValue = treeKeys[Math.floor(Math.random() * treeKeys.length)];
            delNode = tree.search(delValue);
            
            resTree = getTree(formData.get("type"), treeKeys);
            resTree.remove(delValue);

            сhangeNode = findChangeNode(delNode);
            
            if (!сhangeNode)
                сhangeNode = ""
            else
                сhangeNode = сhangeNode.data

            return new Operation(
                `Удалить узел ${delValue}`,
                [
                    new SubOperation("Найдите удаляемый узел", new inputData(treeKeys), new outputData(delValue)),
                    new SubOperation("Найдите замену узла, если это необходимо", new inputData(treeKeys), new outputData(сhangeNode))
                ],
                new inputData(treeKeys, true),
                new outputData(resTree.preorderTraversal(resTree.root), true)
            )
        case 'add':
            treeKeys = tree.preorderTraversal(tree.root);

            addValue = Math.floor(Math.random() * MAX_INT);
            addNode = findPlaceToAdd(tree.root, addValue);

            isLeft = (addNode.data > addValue) ? true : false;
            
            resTree = getTree(formData.get("type"), treeKeys);
            resTree.insert(addValue);

            return new Operation(
                `Добавить узел ${addValue}`,
                [
                    new SubOperation("Найдите место вставки", new inputData(treeKeys), new outputData(addNode.data)),
                    new SubOperation("Вставить в левое или в правое поддерево", new inputData(treeKeys), new outputData(isLeft))
                ],
                new inputData(treeKeys, true),
                new outputData(resTree.preorderTraversal(resTree.root), true)
            )
    }
}
