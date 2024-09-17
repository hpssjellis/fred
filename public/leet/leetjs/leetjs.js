
/*

Sorting


Helper









*/



// Utility Functions

        // Merge Sort
        function myMergeSort(arr) {
            if (arr.length <= 1) return arr;
            const mid = Math.floor(arr.length / 2);
            const left = myMergeSort(arr.slice(0, mid));
            const right = myMergeSort(arr.slice(mid));
            return merge(left, right);
        }

        function merge(left, right) {
            let result = [], i = 0, j = 0;
            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) result.push(left[i++]);
                else result.push(right[j++]);
            }
            return result.concat(left.slice(i)).concat(right.slice(j));
        }

        // Binary Search
        function myBinarySearch(arr, target) {
            let left = 0, right = arr.length - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (arr[mid] === target) return mid;
                else if (arr[mid] < target) left = mid + 1;
                else right = mid - 1;
            }
            return -1; // Target not found
        }

        // Quick Select (Find k-th smallest element)
        function myQuickSelect(arr, k) {
            const pos = partition(arr, 0, arr.length - 1);
            if (pos === k - 1) return arr[pos];
            else if (pos > k - 1) return myQuickSelect(arr.slice(0, pos), k);
            else return myQuickSelect(arr.slice(pos + 1), k - pos - 1);
        }

        function partition(arr, left, right) {
            const pivot = arr[right];
            let i = left;
            for (let j = left; j < right; j++) {
                if (arr[j] <= pivot) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    i++;
                }
            }
            [arr[i], arr[right]] = [arr[right], arr[i]];
            return i;
        }

        // UI Handlers

        function runMergeSort() {
            const input = document.getElementById("myMergeSortInput").value;
            const arr = input.split(",").map(Number);
            const sortedArray = myMergeSort(arr);
            document.getElementById("myMergeSortResult").textContent = sortedArray.join(", ");
        }

        function runBinarySearch() {
            const arrayInput = document.getElementById("myBinarySearchArray").value;
            const target = parseInt(document.getElementById("myBinarySearchTarget").value);
            const arr = arrayInput.split(",").map(Number);
            const result = myBinarySearch(arr, target);
            document.getElementById("myBinarySearchResult").textContent = result;
        }

        function runQuickSelect() {
            const arrayInput = document.getElementById("myQuickSelectArray").value;
            const k = parseInt(document.getElementById("myQuickSelectK").value);
            const arr = arrayInput.split(",").map(Number);
            const result = myQuickSelect(arr, k);
            document.getElementById("myQuickSelectResult").textContent = result;
        }





// HLEPER FUNCITONS

// Deep Clone Function
function myDeepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Longest Common Subsequence Length
function myLCSLength(str1, str2) {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// Balanced Binary Search Tree Check
function myIsBalancedBST(root) {
    function height(node) {
        if (!node) return 0;
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;
        return Math.max(leftHeight, rightHeight) + 1;
    }

    return height(root) !== -1;
}

// K-th Largest Element (Quick Select)
function myKthLargest(arr, k) {
    function partition(arr, left, right) {
        const pivot = arr[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] >= pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }

    function quickSelect(arr, left, right, k) {
        if (left <= right) {
            const pivotIndex = partition(arr, left, right);
            if (pivotIndex === k) return arr[pivotIndex];
            else if (pivotIndex < k) return quickSelect(arr, pivotIndex + 1, right, k);
            else return quickSelect(arr, left, pivotIndex - 1, k);
        }
        return null;
    }

    return quickSelect(arr, 0, arr.length - 1, k - 1);
}

// UI Functions
function runDeepClone() {
    const input = JSON.parse(document.getElementById("myDeepCloneInput").value);
    const clonedObj = myDeepClone(input);
    document.getElementById("myDeepCloneResult").textContent = JSON.stringify(clonedObj);
}

function runLCSLength() {
    const str1 = document.getElementById("myLCSLengthStr1").value;
    const str2 = document.getElementById("myLCSLengthStr2").value;
    const result = myLCSLength(str1, str2);
    document.getElementById("myLCSLengthResult").textContent = result;
}

function runIsBalancedBST() {
    const input = JSON.parse(document.getElementById("myIsBalancedBSTInput").value);
    const result = myIsBalancedBST(input);
    document.getElementById("myIsBalancedBSTResult").textContent = result;
}

function runKthLargest() {
    const arr = document.getElementById("myKthLargestArray").value.split(",").map(Number);
    const k = parseInt(document.getElementById("myKthLargestK").value);
    const result = myKthLargest(arr, k);
    document.getElementById("myKthLargestResult").textContent = result;
}

