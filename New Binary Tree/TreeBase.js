class TreeBase {
    constructor() {
        this.root = null;
    }

    insert(data) {
        console.log("Need to override")
    }

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
        console.log("Need to override")
    }

    preorderTraversal(root, list = []) {
        if (!root) {
            return list;
        }
    
        list.push(root.data);
        this.preorderTraversal(root.left, list);
        this.preorderTraversal(root.right, list);
        
        return list;
    }

    treePrinter() {
        let res = "";
    
        const h = this.height(this.root);
        const col = this.getCol(h);
        const M = new Array(h).fill().map(() => new Array(col).fill(null));
        this.printTree(M, this.root, Math.floor(col / 2), 0, h);
    
        for (let i = 0; i < M.length; i++) { 
            let row='<div class="flex">';
            for (let j = 0; j < M[i].length; j++) {
                if (M[i][j] === null) {
                    row = row + `<div class='size'></div>`;
                } else {
                    row= row + `<div class="size node" id=${M[i][j]} onclick="selectNode(this)">${M[i][j]}</div>`;
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
    }

    height(root) {
        if (root === null) {
            return 0;
        }
        return Math.max(this.height(root.left), this.height(root.right)) + 1;
    }
     
    getCol(h) {
        if (h === 1) {
            return 1;
        }
        return this.getCol(h - 1) + this.getCol(h - 1) + 1;
    }
     
    printTree(M, root, col, row, height) {
        if (root === null) {
            return;
        }
        M[row][col] = root.data;
        this.printTree(M, root.left, col - Math.pow(2, height - 2), row + 1, height - 1);
        this.printTree(M, root.right, col + Math.pow(2, height - 2), row + 1, height - 1);
    }
};