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
