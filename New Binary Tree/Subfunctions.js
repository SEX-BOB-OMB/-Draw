function height(root) {
    if (root === null) {
        return 0;
    }
    return Math.max(height(root.left), height(root.right)) + 1;
}
 
function getCol(h) {
    if (h === 1) {
        return 1;
    }
    return getCol(h - 1) + getCol(h - 1) + 1;
}
 
function printTree(M, root, col, row, height) {
    if (root === null) {
        return;
    }
    M[row][col] = root.data;
    printTree(M, root.left, col - Math.pow(2, height - 2), row + 1, height - 1);
    printTree(M, root.right, col + Math.pow(2, height - 2), row + 1, height - 1);
}


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

