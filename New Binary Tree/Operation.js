class inputData {
    constructor(keys=[], isTree=false) {
        this.keys = keys;
        this.isTree = isTree;
    }
}

class outputData {
    constructor(keys=[], isTree=false) {
        this.keys = keys;
        this.isTree = isTree;
    }
}

class SubOperation {
    constructor(text, inputData=null, outputData=null) {
        this.text = text;
        this.inputData = inputData;
        this.outputData = outputData;
    }
}

class Operation {
    constructor(text, subOperations, inputData=null, outputData=null) {
        this.text = text;
        this.subOperations = subOperations;
        this.inputData = inputData;
        this.outputData = outputData;

        if (subOperations[0].inputData === null)
            subOperations[0].inputData = this.inputData;
        
        for (let i = 1; i < this.subOperations.length; i++) {
            if (this.subOperations[i].inputData === null)
                this.subOperations[i].inputData = this.subOperations[i - 1].outputData;
        }

        if (subOperations[this.subOperations.length - 1].outputData === null)
            subOperations[this.subOperations.length - 1].outputData = this.outputData;
    }
}

class OperationBFS extends Operation {
    constructor(tree) {
        let treeKeys = tree.preorderTraversal(tree.root);
        super(
            "Выполните обход в ширину", 
            [
                new SubOperation("Тык-тык по узлам", new inputData(treeKeys), new outputData(tree.bfs())),
            ],
            new inputData(treeKeys, true),
            new outputData(tree.bfs(), false)
        )
    }
}

class OperationDFS extends Operation {
    constructor(tree) {
        let treeKeys = tree.preorderTraversal(tree.root);
        super(
            "Выполните обход в глубину", 
            [
                new SubOperation("Тык-тык по узлам", new inputData(treeKeys), new outputData(treeKeys)),
            ],
            new inputData(treeKeys, true),
            new outputData(treeKeys, false)
        );
    }
}

class OperationDel extends Operation {
    constructor(tree) {
        let treeKeys = tree.bfs(tree.root);
        let delValue = 3//treeKeys[Math.floor(Math.random() * treeKeys.length)];
        let delNode = tree.search(delValue);
        
        let rotateList = []
        let resTree = _.cloneDeep(tree)
        resTree.remove(delValue, rotateList);
        
        console.log(rotateList)

        let сhangeNode = findChangeNode(delNode);
        
        if (!сhangeNode)
            сhangeNode = ""
        else
            сhangeNode = сhangeNode.data
        
        let temp = getTree("bst", treeKeys)
        temp.remove(delValue)
        let treeKeysBeforeBalancing = temp.bfs(temp.root)

        let balancingSuboperations = []
        for (let index in rotateList) {
            let inputdata = null
            
            if (index > 0) {
                inputdata = new inputData(rotateList[index-1].treeNodes, true)
            } else {
                inputdata = new inputData(treeKeysBeforeBalancing, true)
            }
            
            let outputdata = new outputData(rotateList[index].balancingNodes)
            balancingSuboperations.push(new SubOperation("Укажите узлы участвующие в балансировке, если она необходима", inputdata, outputdata))
            balancingSuboperations.push(new SubOperation("Укажите тип поворота", inputdata, new outputData(rotateList[index].rotate)))
        }

        super(
            `Удалить узел ${delValue}`,
            [
                new SubOperation("Найдите удаляемый узел", new inputData(treeKeys), new outputData(delValue)),
                new SubOperation("Найдите замену узла, если это необходимо (Замена на минимальный справа)", new inputData(treeKeys), new outputData(сhangeNode)),
                ...balancingSuboperations,
            ],
            new inputData(treeKeys, true),
            new outputData(resTree.bfs(resTree.root), true)
        );
    }
}

class OperationAdd extends Operation {
    constructor(tree) {
        let treeKeys = tree.bfs(tree.root);

        let addValue = Math.floor(Math.random() * MAX_INT);
        let addNode = findPlaceToAdd(tree.root, addValue);

        let isLeft = (addNode.data > addValue) ? 'left' : 'right';
        
        let rotateList = []
        let resTree = _.cloneDeep(tree)
        resTree.insert(addValue, rotateList);
        
        console.log(rotateList)

        let temp = getTree("bst", treeKeys)
        temp.insert(addValue)
        let treeKeysBeforeBalancing = temp.bfs(temp.root)

        let balancingSuboperations = []
        for (let index in rotateList) {
            let inputdata = null
            
            if (index > 0) {
                inputdata = new inputData(rotateList[index-1].treeNodes, true)
            } else {
                inputdata = new inputData(treeKeysBeforeBalancing, true)
            }
            
            let outputdata = new outputData(rotateList[index].balancingNodes)
            balancingSuboperations.push(new SubOperation("Укажите узлы участвующие в балансировке, если она необходима", inputdata, outputdata))
            balancingSuboperations.push(new SubOperation("Укажите тип поворота", inputdata, new outputData(rotateList[index].rotate)))
        }


        super(
            `Добавить узел ${addValue}`,
            [
                new SubOperation("Найдите место вставки", new inputData(treeKeys), new outputData(addNode.data)),
                new SubOperation("Вставить в левое или в правое поддерево", new inputData(treeKeys), new outputData(isLeft)),
                ...balancingSuboperations,
            ],
            new inputData(treeKeys, true),
            new outputData(resTree.bfs(resTree.root), true)
        );
    }
}
