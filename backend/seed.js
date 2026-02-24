require('dotenv').config();
const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const Problem = require('./models/Problem');

const dsaData = [
    {
        title: 'Arrays',
        description: 'Master fundamental array operations: traversal, searching, sorting, and two-pointer techniques.',
        order: 1,
        problems: [
            { title: 'Two Sum', description: 'Find two numbers that add up to target.', youtubeLink: 'https://www.youtube.com/watch?v=KLlXCFG5TnA', codingLink: 'https://leetcode.com/problems/two-sum/', articleLink: 'https://www.geeksforgeeks.org/two-sum/', difficulty: 'Easy' },
            { title: 'Best Time to Buy and Sell Stock', description: 'Maximize profit from a single buy-sell transaction.', youtubeLink: 'https://www.youtube.com/watch?v=1pkOgXD63yU', codingLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', articleLink: 'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/', difficulty: 'Easy' },
            { title: 'Container With Most Water', description: 'Find container that holds maximum water using two pointers.', youtubeLink: 'https://www.youtube.com/watch?v=UuiTKBwPgAo', codingLink: 'https://leetcode.com/problems/container-with-most-water/', articleLink: 'https://www.geeksforgeeks.org/container-with-most-water/', difficulty: 'Medium' },
            { title: 'Product of Array Except Self', description: 'Return product of all elements except self without division.', youtubeLink: 'https://www.youtube.com/watch?v=bNvIQI2wAjk', codingLink: 'https://leetcode.com/problems/product-of-array-except-self/', articleLink: 'https://www.geeksforgeeks.org/product-of-array-except-self/', difficulty: 'Medium' },
            { title: 'Trapping Rain Water', description: 'Compute total water trapped after raining.', youtubeLink: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA', codingLink: 'https://leetcode.com/problems/trapping-rain-water/', articleLink: 'https://www.geeksforgeeks.org/trapping-rain-water/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Strings',
        description: 'String manipulation, pattern matching, sliding window, and character frequency problems.',
        order: 2,
        problems: [
            { title: 'Valid Anagram', description: 'Determine if two strings are anagrams of each other.', youtubeLink: 'https://www.youtube.com/watch?v=9UtInBqnCgA', codingLink: 'https://leetcode.com/problems/valid-anagram/', articleLink: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/', difficulty: 'Easy' },
            { title: 'Valid Palindrome', description: 'Check if a string is a palindrome (ignore non-alphanumeric).', youtubeLink: 'https://www.youtube.com/watch?v=jJXJ16kPFWg', codingLink: 'https://leetcode.com/problems/valid-palindrome/', articleLink: 'https://www.geeksforgeeks.org/check-if-a-string-is-palindrome/', difficulty: 'Easy' },
            { title: 'Longest Substring Without Repeating Characters', description: 'Find the longest substring with all unique characters.', youtubeLink: 'https://www.youtube.com/watch?v=wiGpQwVHdE0', codingLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', articleLink: 'https://www.geeksforgeeks.org/longest-non-repeating-character-substring/', difficulty: 'Medium' },
            { title: 'Group Anagrams', description: 'Group an array of strings into anagram buckets.', youtubeLink: 'https://www.youtube.com/watch?v=vzdNOK2oB2E', codingLink: 'https://leetcode.com/problems/group-anagrams/', articleLink: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/', difficulty: 'Medium' },
            { title: 'Minimum Window Substring', description: 'Find the smallest window containing all characters of pattern.', youtubeLink: 'https://www.youtube.com/watch?v=jSto0O4AJbM', codingLink: 'https://leetcode.com/problems/minimum-window-substring/', articleLink: 'https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Recursion',
        description: 'Build recursive thinking: base cases, call stacks, backtracking, and divide-and-conquer.',
        order: 3,
        problems: [
            { title: 'Fibonacci Number', description: 'Return the nth Fibonacci number using recursion.', youtubeLink: 'https://www.youtube.com/watch?v=eqp7tEZLPIA', codingLink: 'https://leetcode.com/problems/fibonacci-number/', articleLink: 'https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/', difficulty: 'Easy' },
            { title: 'Power of Two', description: 'Determine if a number is a power of two recursively.', youtubeLink: 'https://www.youtube.com/watch?v=NLRkv9mKeKE', codingLink: 'https://leetcode.com/problems/power-of-two/', articleLink: 'https://www.geeksforgeeks.org/program-to-find-whether-a-no-is-power-of-two/', difficulty: 'Easy' },
            { title: 'Subsets', description: 'Generate all subsets (power set) of a given array.', youtubeLink: 'https://www.youtube.com/watch?v=REOH22Xwdkk', codingLink: 'https://leetcode.com/problems/subsets/', articleLink: 'https://www.geeksforgeeks.org/power-set/', difficulty: 'Medium' },
            { title: 'Permutations', description: 'Return all possible permutations of a given array.', youtubeLink: 'https://www.youtube.com/watch?v=s7AvT7cGdSo', codingLink: 'https://leetcode.com/problems/permutations/', articleLink: 'https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/', difficulty: 'Medium' },
            { title: 'N-Queens', description: 'Place N queens on an N×N chessboard so no two threaten each other.', youtubeLink: 'https://www.youtube.com/watch?v=Ph95IHmRp5M', codingLink: 'https://leetcode.com/problems/n-queens/', articleLink: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Linked List',
        description: 'Singly and doubly linked list problems: traversal, reversal, cycle detection, and merging.',
        order: 4,
        problems: [
            { title: 'Reverse Linked List', description: 'Reverse a singly linked list iteratively and recursively.', youtubeLink: 'https://www.youtube.com/watch?v=D2vI2DNJGd8', codingLink: 'https://leetcode.com/problems/reverse-linked-list/', articleLink: 'https://www.geeksforgeeks.org/reverse-a-linked-list/', difficulty: 'Easy' },
            { title: 'Linked List Cycle', description: "Detect a cycle using Floyd's tortoise-and-hare algorithm.", youtubeLink: 'https://www.youtube.com/watch?v=gBTe7lFR3vc', codingLink: 'https://leetcode.com/problems/linked-list-cycle/', articleLink: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/', difficulty: 'Easy' },
            { title: 'Merge Two Sorted Lists', description: 'Merge two sorted linked lists into one sorted list.', youtubeLink: 'https://www.youtube.com/watch?v=XIdigk956u0', codingLink: 'https://leetcode.com/problems/merge-two-sorted-lists/', articleLink: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/', difficulty: 'Easy' },
            { title: 'Remove Nth Node From End', description: 'Remove the nth node from the end in one pass.', youtubeLink: 'https://www.youtube.com/watch?v=XVuQxVej6y8', codingLink: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', articleLink: 'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/', difficulty: 'Medium' },
            { title: 'LRU Cache', description: 'Design a data structure with O(1) get and put using LRU eviction.', youtubeLink: 'https://www.youtube.com/watch?v=7ABFKPK2hD4', codingLink: 'https://leetcode.com/problems/lru-cache/', articleLink: 'https://www.geeksforgeeks.org/lru-cache-implementation/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Stack & Queue',
        description: 'Problems leveraging LIFO/FIFO structures: monotonic stacks, BFS foundations, and expression parsing.',
        order: 5,
        problems: [
            { title: 'Valid Parentheses', description: 'Determine if bracket sequence is valid using a stack.', youtubeLink: 'https://www.youtube.com/watch?v=WTzjTskDFMg', codingLink: 'https://leetcode.com/problems/valid-parentheses/', articleLink: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/', difficulty: 'Easy' },
            { title: 'Min Stack', description: 'Design a stack that retrieves the minimum element in O(1).', youtubeLink: 'https://www.youtube.com/watch?v=qkLl7nAwDPo', codingLink: 'https://leetcode.com/problems/min-stack/', articleLink: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/', difficulty: 'Medium' },
            { title: 'Daily Temperatures', description: 'Find days until a warmer temperature using a monotonic stack.', youtubeLink: 'https://www.youtube.com/watch?v=cTBiBSnjO3c', codingLink: 'https://leetcode.com/problems/daily-temperatures/', articleLink: 'https://www.geeksforgeeks.org/daily-temperatures/', difficulty: 'Medium' },
            { title: 'Implement Queue using Stacks', description: 'Implement a FIFO queue using two LIFO stacks.', youtubeLink: 'https://www.youtube.com/watch?v=rW4vm0-DLYc', codingLink: 'https://leetcode.com/problems/implement-queue-using-stacks/', articleLink: 'https://www.geeksforgeeks.org/queue-using-stacks/', difficulty: 'Easy' },
            { title: 'Largest Rectangle in Histogram', description: 'Find the largest rectangle area in a histogram using stack.', youtubeLink: 'https://www.youtube.com/watch?v=zx5Sw9130L0', codingLink: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', articleLink: 'https://www.geeksforgeeks.org/largest-rectangle-in-histogram/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Trees',
        description: 'Binary trees, BSTs, traversals (DFS/BFS), height, diameter, and path problems.',
        order: 6,
        problems: [
            { title: 'Maximum Depth of Binary Tree', description: 'Find the maximum depth/height of a binary tree.', youtubeLink: 'https://www.youtube.com/watch?v=hTM3phVI6YQ', codingLink: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', articleLink: 'https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-of-a-tree/', difficulty: 'Easy' },
            { title: 'Invert Binary Tree', description: 'Mirror/invert a binary tree recursively or iteratively.', youtubeLink: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY', codingLink: 'https://leetcode.com/problems/invert-binary-tree/', articleLink: 'https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/', difficulty: 'Easy' },
            { title: 'Binary Tree Level Order Traversal', description: 'Return level-by-level node values using BFS.', youtubeLink: 'https://www.youtube.com/watch?v=6ZnyEApgFYg', codingLink: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', articleLink: 'https://www.geeksforgeeks.org/level-order-tree-traversal/', difficulty: 'Medium' },
            { title: 'Lowest Common Ancestor of BST', description: 'Find the LCA of two nodes in a Binary Search Tree.', youtubeLink: 'https://www.youtube.com/watch?v=gs2LMfuOR9k', codingLink: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', articleLink: 'https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/', difficulty: 'Medium' },
            { title: 'Serialize and Deserialize Binary Tree', description: 'Encode a tree to a string and decode it back.', youtubeLink: 'https://www.youtube.com/watch?v=u4JAi2JJhI8', codingLink: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', articleLink: 'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Graphs',
        description: 'Graph traversal (DFS/BFS), connected components, topological sort, and shortest path algorithms.',
        order: 7,
        problems: [
            { title: 'Number of Islands', description: 'Count islands in a 2D grid using DFS/BFS.', youtubeLink: 'https://www.youtube.com/watch?v=__98uL6we4U', codingLink: 'https://leetcode.com/problems/number-of-islands/', articleLink: 'https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/', difficulty: 'Medium' },
            { title: 'Clone Graph', description: 'Deep-copy an undirected graph using DFS and a hash map.', youtubeLink: 'https://www.youtube.com/watch?v=mQeF6bN8hMk', codingLink: 'https://leetcode.com/problems/clone-graph/', articleLink: 'https://www.geeksforgeeks.org/clone-an-undirected-graph/', difficulty: 'Medium' },
            { title: 'Course Schedule', description: 'Detect cycle in a directed graph to check if courses can be finished.', youtubeLink: 'https://www.youtube.com/watch?v=EgI5nU9etnU', codingLink: 'https://leetcode.com/problems/course-schedule/', articleLink: 'https://www.geeksforgeeks.org/detect-cycle-in-a-directed-graph/', difficulty: 'Medium' },
            { title: 'Pacific Atlantic Water Flow', description: 'Find cells that can flow to both Pacific and Atlantic oceans.', youtubeLink: 'https://www.youtube.com/watch?v=s-VIfNTDGnw', codingLink: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', articleLink: 'https://www.geeksforgeeks.org/pacific-atlantic-water-flow/', difficulty: 'Medium' },
            { title: "Dijkstra's Shortest Path", description: 'Find shortest distances from source to all vertices using a priority queue.', youtubeLink: 'https://www.youtube.com/watch?v=V6H1qAeB-l4', codingLink: 'https://leetcode.com/problems/network-delay-time/', articleLink: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/', difficulty: 'Hard' },
        ],
    },
    {
        title: 'Dynamic Programming',
        description: 'Memoization, tabulation, and classical DP patterns: knapsack, LCS, LIS, and interval DP.',
        order: 8,
        problems: [
            { title: 'Climbing Stairs', description: 'Count distinct ways to climb n stairs (1 or 2 steps at a time).', youtubeLink: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI', codingLink: 'https://leetcode.com/problems/climbing-stairs/', articleLink: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/', difficulty: 'Easy' },
            { title: 'House Robber', description: 'Maximize loot without robbing two adjacent houses.', youtubeLink: 'https://www.youtube.com/watch?v=73r3KWiEvyk', codingLink: 'https://leetcode.com/problems/house-robber/', articleLink: 'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/', difficulty: 'Medium' },
            { title: 'Coin Change', description: 'Find minimum coins needed to reach the target amount.', youtubeLink: 'https://www.youtube.com/watch?v=H9bfqozjoqs', codingLink: 'https://leetcode.com/problems/coin-change/', articleLink: 'https://www.geeksforgeeks.org/coin-change-dp-7/', difficulty: 'Medium' },
            { title: 'Longest Common Subsequence', description: 'Find the length of the longest common subsequence of two strings.', youtubeLink: 'https://www.youtube.com/watch?v=Ua0GhsJSlWM', codingLink: 'https://leetcode.com/problems/longest-common-subsequence/', articleLink: 'https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/', difficulty: 'Medium' },
            { title: 'Edit Distance', description: 'Find minimum operations (insert/delete/replace) to convert one string to another.', youtubeLink: 'https://www.youtube.com/watch?v=MiqoA-yF-0M', codingLink: 'https://leetcode.com/problems/edit-distance/', articleLink: 'https://www.geeksforgeeks.org/edit-distance-dp-5/', difficulty: 'Hard' },
        ],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected for seeding...');

        await Topic.deleteMany({});
        await Problem.deleteMany({});
        console.log('🗑️  Cleared existing topics and problems.\n');

        let totalProblems = 0;
        for (const topicData of dsaData) {
            const { problems, ...topicInfo } = topicData;
            const topic = await Topic.create(topicInfo);
            const problemDocs = problems.map((p) => ({ ...p, topicId: topic._id }));
            await Problem.insertMany(problemDocs);
            totalProblems += problems.length;
            console.log(`  ✔ ${topic.title.padEnd(22)} — ${problems.length} problems`);
        }

        console.log(`\n🎉 Seeded ${dsaData.length} topics and ${totalProblems} problems successfully!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedDB();
