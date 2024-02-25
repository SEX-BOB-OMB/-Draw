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