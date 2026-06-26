-- Fix LEIGHTON (leighton-2) price from 0.00 to 3000.00
UPDATE products SET price = '3000.00' WHERE handle = 'leighton-2';
