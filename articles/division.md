There's a simple trick for figuring out if a number is divisible by 3: if the number you get when you add up all of the digits is divisible by 3, then the original number was as well. For example, take the number 171. Its digits are 1, 7, and 1; add them up and you get 9, which is divisible by 3. According to this rule, that means 171 should also be divisible by 3, and you can easily verify that that is true using a calculator or long division. On the other hand, there's 136, whose digits add up to 10, meaning it isn't divisible by 3. But why does this happen?

- Step 1: Split the number up by its digits.

    <div id="animation-1" style="width: 640px;"></div>
  Since the trick has to do with a number's digits, we'll probably want to work with them in some way. We can think of 3 digit numbers as having blocks of consisting of hundreds, tens, and ones. {abc} is a 3 digit number, so we can write it as {a} * 100 + {b} * 10 + {c}. {a} is in the hundreds place, so {abc} has {a} blocks of size 100. Similarly, it has {b} blocks of size 10 and {c} blocks of size 1.

- Step 2: Set aside 1 square from each block.

    <div id="animation-2" style="width: 640px;"></div>
  The trick involves adding up the digits of the number, and since each block of hundreds, tens, and ones represents ___, counting the blocks will allow us to do that. Instead of counting the blocks directly, we'll take one individual square from each block as a "representative". By counting the number of representatives, we're adding up the digits. This leaves the hundreds blocks with 99 squares, the tens blocks with 9, and the ones blocks with none. 

- Step 3: Divide the remaining squares into groups of 3

  After removing the representative squares, any ones blocks are eliminated, and we're left with blocks of size 99 and 9. We can divide these squares evenly since each block is divisible by 3.

- Step 4: Divide the representative squares into groups of 3

  Unlike the previous step, we're not guaranteed to be able to divide the representative squares evenly. Remember that the number of representative squares is equal to the sum of the digits of the number, so if we can evenly divide them into groups of 3, that means the sum is also divisible by 3. The opposite is also true: if we can't divide these squares into groups of 3, the sum is not divisible by 3.

- Step 5: Do some thinking

  Recall what we're trying to show: if the sum of the digits of a number is divisible by 3, then so is the number itself. We've split the number into two groups: the first group represents the sum of the digits of the number, and the second is the rest of the number. We've shown that the second group is always divisible by 3. If we can divide the first group by 3 as well, then the whole number will be divisible by 3 as well. On the other hand, if we can't divide the first group by 3, then the number can't be divided by 3 either.

Are we done? Well, we have shown that it's true for {abc}, and if you refresh the page, we'll show it for a new 3-digit number. But we haven't shown that it's always true, especially not for numbers that don't have 3 digits. 

## What is a digit? 

Our strategy last time was to take 1 square from each block (where a block represented a digit). After removing those squares, the squares that were left over could always be divided into three equal groups. Why is that? 

When we talk about numbers in terms of their digits, we're considering them base 10. That means that going from right to left, each digit rep

This trick also works for numbers in base 16, and any other base whose remainder is 1 when divided by 3.
If a base is already divisible by 3, then all we need to do is look at the last digit.
If a base has remainder 2 when divided by 3, look at the alternating sum (since the base is congruent to -1 and so the powers will flip)

