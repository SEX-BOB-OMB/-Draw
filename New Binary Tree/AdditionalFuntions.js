let selectedNodes = []

function showSelectedNodes(block, nodes) {
    let str = "";
    nodes.forEach(element => {
        str += element + " ";
    });

    if (block) {
        block.innerText = str;
    } else {
        console.log(str);
    }
}

function selectNode(elem) {

    if (elem.isSelected) {
        elem.classList.remove("selected");
        selectedNodes.splice(selectedNodes.indexOf(elem.innerText), 1);
    } else {
        elem.classList.add("selected");
        selectedNodes.push(elem.innerText);
    }
    showSelectedNodes(treeNodes, selectedNodes);
    elem.isSelected = !elem.isSelected;
    
    return elem;
}

function selectNode(elem) {

    if (elem.isSelected) {
        elem.classList.remove("selected");
        selectedNodes.splice(selectedNodes.indexOf(elem.innerText), 1);
    } else {
        elem.classList.add("selected");
        selectedNodes.push(elem.innerText);
    }
    showSelectedNodes(treeNodes, selectedNodes);
    elem.isSelected = !elem.isSelected;
    
    return elem;
}


function findPlaceToAdd(node, newNode) {
    if (newNode < node.data) {
        if (node.left === null) {
            return node;
        } else {
            return this.findPlaceToAdd(node.left, newNode);
        }
    } else {
        if (node.right === null) {
            return node;
        } else {
            return this.findPlaceToAdd(node.right, newNode);
        }
    }
}

function findChangeNode(node) {
    let resNode = null;

    if (node==null) {
        return resNode
    }

    if (node.left != null && node.right != null) {
        let minRight = node.right;
        while (minRight.left != null) {
            minRight = minRight.left;
        }
        resNode = minRight;
    } else if (node.left === null) {
        resNode = node.right;
    } else {
        resNode = node.left;
    }

    return resNode;
}


