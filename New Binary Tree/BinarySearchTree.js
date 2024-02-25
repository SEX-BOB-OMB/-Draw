class Node{
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        let newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        };
    };

    insertNode(node, newNode) {
        if (newNode.data < node.data){
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            };
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right,newNode);
            };
        };
    };

    search(data) {
        if (this.root === null) {
            return null;
        } else {
            return this.searchNode(this.root, data);
        };
    }

    searchNode(node, data) {
        if (data === node.data) {
            return node;
        } else if (data < node.data){
            if (node.left === null) {
                return null;
            } else {
                return this.searchNode(node.left, data);
            };
        } else {
            if (node.right === null) {
                return null;
            } else {
                return this.searchNode(node.right, data);
            };
        }
    }

    minNode(node) {
        if (node.left === null)
            return node;
        else
            return this.minNode(node.left);
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }
    removeNode(node, data) {
        if (node === null) {
            return null;
      
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;

        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data);
            return node;
      
        } else {
           
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                return node;
            } else if(node.right === null) {
                node = node.left;
                return node;
            }
            
            let newNode = this.minNode(node.right);
            node.data = newNode.data;
            node.right = this.removeNode(node.right, newNode.data);
            return node;
        }
    }

    preorderTraversal(root, list = []) {
        if (!root) {
            return list;
        }
    
        list.push(root.data);
        this.preorderTraversal(root.left, list);
        this.preorderTraversal(root.right, list);
        return list;
    };
    
    treePrinter() {
        let res = "";
    
        const h = height(this.root);
        const col = getCol(h);
        const M = new Array(h).fill().map(() => new Array(col).fill(null));
        printTree(M, this.root, Math.floor(col / 2), 0, h);
    
        for (let i = 0; i < M.length; i++) { 
            let row='<div class="flex">';
            for (let j = 0; j < M[i].length; j++) {
                if (M[i][j] === null) {
                    row = row +"<div></div>";
                } else {
                    row= row + `<div class="node" id=${M[i][j]} onclick="selectNode(this)">${M[i][j]}</div>`;
                }
            }
            row += "</div>";
            res += row;
        }
    
        return res
    };

    bfs() {
        let queue = [this.root];
        let result = [];
      
        while (queue.length > 0) {
          let currentNode = queue.shift();
          result.push(currentNode.data);
      
          if (currentNode.left) {
            queue.push(currentNode.left);
          }
          if (currentNode.right) {
            queue.push(currentNode.right);
          }
        }
      
        return result;
    };

};

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

