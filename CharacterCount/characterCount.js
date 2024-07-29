const sentence="hello world"
const letterFreqLower = new Array(26).fill(0);
const letterFreqUpper = new Array(26).fill(0);
const baseLower = 'a'.charCodeAt(0);
const baseUpper = 'A'.charCodeAt(0);
let distinct = 0;
let output1 = '';
let output2 = '';

for (let ch of sentence) {
    if (ch >= 'a' && ch <= 'z') {
        letterFreqLower[ch.charCodeAt(0) - baseLower]++;
        if (letterFreqLower[ch.charCodeAt(0) - baseLower] === 1) {
            distinct++;
        }
    } else if (ch >= 'A' && ch <= 'Z') {
        letterFreqUpper[ch.charCodeAt(0) - baseUpper]++;
        if (letterFreqUpper[ch.charCodeAt(0) - baseUpper] === 1) {
            distinct++;
        }
    }
}
for(let i=0;i<sentence.length;i++)
{
const ch = sentence.charAt(i); 
if (ch >='a'  && ch<='z' && letterFreqLower[ch.charCodeAt(0)-baseLower] > 0) { 
output1 += `${letterFreqLower[ch.charCodeAt(0)-baseLower]} `;
output2 += `${ch}:${letterFreqLower[ch.charCodeAt(0)-baseLower]} `;
letterFreqLower[ch.charCodeAt(0)-baseLower] = 0;
}
else if (ch >='A'  && ch<='Z' && letterFreqUpper[ch.charCodeAt(0)-baseUpper] > 0) { 
output1 +=`${letterFreqUpper[ch.charCodeAt(0)-baseUpper]} `;
output2 +=`${ch}:${letterFreqUpper[ch.charCodeAt(0)-baseUpper]} `;
letterFreqUpper[ch.charCodeAt(0)-baseUpper] = 0;
}
}
console.log(distinct);
console.log(output1);
console.log(output2);