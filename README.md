# string-extender.js

Javascript string extender class, for password salting, hashing.
This is a self-salting solution, where the original text (or password) determine the salt-algorithm. So, this self-salting technique provides complete protection against dictionary or brute-force attacks.

## Technique

0. Base64 encoding the original text  
1. First step is the conversion the characters of resulted text to ascii numbers ('A' is 65).
2. Then removing all digits in these numbers except the last digit. The numbers (0-9) define an algorithm (ex.: the 0. is the reverse string algorithm)
3. Execute the algorithms on original text (Base64 encoded in step 0.) in order.

ex.: 

original text is: "foo" 

step 0: Base64 encoding "foo" -> "Zm9v"

step 1: (string) "Zm9v" -> (ascii integers) 90, 109, 57, 118

step 2: 90, 109, 57, 118  -> 0, 9, 7, 8

step 3: (algorithm 0) String reverse on original text: "Zm9v" -> "v9mZ"

no other substep because missing the 9., 7., 8., algorithms yet.

the self-salted text is "v9mZ"

### Some result

"foo" -> "v9mZ" (4 possible step, 1 step with 3 algorithms)

"aligator" -> "ZdFewplMGBjYzkUP"  (12 possible step, 7 step)

"123123" -> "VFZSSmVrMVVTWG89"  (8 possible step, 2 step)

"password" -> "NHemNGYzR2bW1jUT"  (12 possible step, 7 step)

The actual steps can be increased by adding some algorithm, up to 10. (actually is 3)

## Warning

This is not a secure hash method, just applicable on a string before hashed to MD5 or sha256 or some similar hash method!   

**!!! If you change the algorithms order, or add/remove an algorithm, the result is changed too, on same text !!!** 

## Usage

### In Browser
````html
<script src="string-extender.js"></script>
<script src="base64.js"></script>
````

## Example

````javascript
StringExtender.extend('some string'); // FUxQlUHV3bihmVzw0YWVGVzEnQVVlV3JmUR1VMYNFc=o
````

## SEE ALSO

+ http://en.wikipedia.org/wiki/Salt_(cryptography)
+ http://en.wikipedia.org/wiki/Padding_(cryptography)